import type { Server } from 'node:http';

import type { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { GoogleAuth } from 'google-auth-library';

/**
 * Reverse proxy to the API, which is not reachable from the internet.
 *
 * The API runs on Cloud Run with no public invoker, so every request to it has
 * to carry a Google-signed identity token or Google rejects it at the edge —
 * before it reaches the container. That token can only be minted by something
 * holding the right service-account credentials, which is this server and not
 * the browser. So the browser talks to this origin, and this server is the only
 * thing that talks to the API.
 *
 * It also removes the cross-origin problem that used to sit on the module
 * federation remote: the remote entry is fetched as an ES module, and an
 * HTTPS page pulling a module from another host needs CORS to agree. Served
 * through here it is same-origin, and there is nothing to agree about.
 */

/** Where the API actually lives. Absent locally, where the default is fine. */
const BACKEND_URL = process.env.KICL_BACKEND_URL || 'http://localhost:3100';

/**
 * Identity tokens last an hour. Refreshed well inside that, and kept in memory
 * so the value can be read synchronously — a WebSocket upgrade is not an
 * ordinary request and gives no opportunity to await anything.
 */
const TOKEN_TTL_MS = 45 * 60 * 1000;

type CachedToken = {
  value: string;
  expiresAtMs: number;
};

let cached: CachedToken | null = null;
let auth: GoogleAuth | null = null;

async function mintIdToken(): Promise<string | null> {
  try {
    auth ??= new GoogleAuth();

    const client = await auth.getIdTokenClient(BACKEND_URL);
    const token = await client.idTokenProvider.fetchIdToken(BACKEND_URL);

    cached = { value: token, expiresAtMs: Date.now() + TOKEN_TTL_MS };

    return token;
  } catch (error) {
    /*
     * Expected off Google infrastructure — a developer running this server on
     * their machine has no metadata server to ask. The local API accepts
     * unauthenticated calls, so the proxy still works; it is only in front of a
     * private service that a missing token matters, and there it surfaces as a
     * 403 from Google rather than as silence here.
     */
    console.warn(
      'Proxy: no identity token for the API —',
      error instanceof Error ? error.message : String(error)
    );

    return null;
  }
}

/** The current token, refreshed in the background once it ages out. */
function currentIdToken(): string | null {
  if (!cached) {
    return null;
  }

  if (Date.now() >= cached.expiresAtMs) {
    void mintIdToken();
  }

  return cached.value;
}

function applyAuthorization(headers: {
  setHeader: (name: string, value: string) => void;
}): void {
  const token = currentIdToken();

  if (token) {
    headers.setHeader('Authorization', `Bearer ${token}`);
  }
}

/**
 * Paths that belong to the API rather than to the built site.
 *
 * `/api/client` is listed first and rewritten: the API serves the federation
 * remote at `/client`, and exposing it here under `/api` keeps everything the
 * API owns beneath one prefix. Order matters — `/api` would otherwise swallow
 * it and forward `/api/client/remoteEntry.js` unchanged, which the API does not
 * serve.
 *
 * The image route is narrowed to the bucket segment, not all of `/assets`.
 * The built client emits its own bundles there — `/assets/mf-entry-*.js` — so
 * forwarding the whole prefix sent the application's own JavaScript to an API
 * that has never heard of it, and the site served a blank page with a 404 for
 * its bootstrap. The API only ever serves images beneath `/assets/{bucket}/`,
 * which is what this matches.
 *
 * The prefix keeps its name on purpose: image URLs are stored in the database
 * as `/assets/taxon-visual/*`, so moving it would orphan every record already
 * written.
 */
const ASSET_BUCKET = process.env.KICL_STORAGE_BUCKET_ID || 'taxon-visual';
const ROUTES: Array<{
  path: string;
  rewrite?: Record<string, string>;
  ws?: boolean;
}> = [
  { path: '/api/client', rewrite: { '^/api/client': '/client' } },
  { path: '/api', ws: true },
  { path: `/assets/${ASSET_BUCKET}` },
];

export async function warmIdToken(): Promise<void> {
  await mintIdToken();
}

/**
 * The one route that carries WebSockets, kept so its upgrade handler can be
 * attached to the server.
 */
type UpgradeCapable = ReturnType<typeof createProxyMiddleware> & {
  upgrade?: (
    request: Parameters<Parameters<Server['on']>[1]>[0],
    socket: never,
    head: never
  ) => void;
};

let subscriptions: UpgradeCapable | null = null;

/**
 * A WebSocket upgrade never enters the Express router, so the proxy has to be
 * handed it directly. Without this, GraphQL subscriptions never connect —
 * ordinary requests would work and only live updates would be missing, which is
 * the sort of gap that gets noticed late.
 */
export function attachUpgrade(server: Server): void {
  const upgrade = subscriptions?.upgrade;

  if (upgrade) {
    server.on('upgrade', upgrade);
  }
}

export function applyProxy(app: Express): void {
  /*
   * The token is fetched here rather than inside the proxy hooks, which are
   * synchronous. By the time a request reaches the hook the value is in memory.
   */
  app.use((_request: Request, _response: Response, next: NextFunction) => {
    if (!cached) {
      void mintIdToken().finally(() => next());

      return;
    }

    next();
  });

  ROUTES.forEach(({ path, rewrite, ws }) => {
    const middleware: UpgradeCapable = createProxyMiddleware({
      /*
       * Selected by `pathFilter` rather than by mounting on a path. Mounting
       * makes Express strip the prefix before the proxy sees the request, so
       * `/api/client/remoteEntry.js` arrived as `/remoteEntry.js`: the rewrite
       * below had nothing left to match, and the stripped path fell through to
       * the API's GraphQL handler, which answered a request for a script with a
       * 400 and a JSON error body.
       */
      pathFilter: `${path}/**`,
      target: BACKEND_URL,
      changeOrigin: true,
      ws: ws ?? false,
      ...(rewrite ? { pathRewrite: rewrite } : {}),
      on: {
        proxyReq: applyAuthorization,
        proxyReqWs: applyAuthorization,
      },
    });

    if (ws) {
      subscriptions = middleware;
    }

    app.use(middleware);
  });
}

export { BACKEND_URL };
