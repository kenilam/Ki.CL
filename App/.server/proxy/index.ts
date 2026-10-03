import type { ClientRequest, Server } from 'node:http';

import type { Express, NextFunction, Request, Response } from 'express';
import {
  createProxyMiddleware,
  type RequestHandler,
} from 'http-proxy-middleware';
import { GoogleAuth } from 'google-auth-library';

/**
 * Reverse proxy to the API and the design system, neither of which is reachable
 * from the internet.
 *
 * The API runs on Cloud Run with no public invoker, so every request to it has
 * to carry a Google-signed identity token or Google rejects it at the edge -
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

/** Where the design system remote lives. Same arrangement as the API. */
const DESIGN_URL = process.env.KICL_DESIGN_URL || 'http://localhost:3200';

/**
 * Identity tokens last an hour. Refreshed well inside that, and kept in memory
 * so the value can be read synchronously - a WebSocket upgrade is not an
 * ordinary request and gives no opportunity to await anything.
 */
const TOKEN_TTL_MS = 45 * 60 * 1000;

type CachedToken = {
  value: string;
  expiresAtMs: number;
};

/** One token per service: Google checks that the audience is the URL called. */
const cached = new Map<string, CachedToken>();
let auth: GoogleAuth | null = null;

async function mintIdToken(audience: string): Promise<string | null> {
  try {
    auth ??= new GoogleAuth();

    const client = await auth.getIdTokenClient(audience);
    const token = await client.idTokenProvider.fetchIdToken(audience);

    cached.set(audience, {
      value: token,
      expiresAtMs: Date.now() + TOKEN_TTL_MS,
    });

    return token;
  } catch (error) {
    /*
     * Expected off Google infrastructure - a developer running this server on
     * their machine has no metadata server to ask. The local services accept
     * unauthenticated calls, so the proxy still works; it is only in front of a
     * private service that a missing token matters, and there it surfaces as a
     * 403 from Google rather than as silence here.
     */
    console.warn(
      `Proxy: no identity token for ${audience} -`,
      error instanceof Error ? error.message : String(error)
    );

    return null;
  }
}

/** The current token, refreshed in the background once it ages out. */
function currentIdToken(audience: string): string | null {
  const token = cached.get(audience);

  if (!token) {
    return null;
  }

  if (Date.now() >= token.expiresAtMs) {
    void mintIdToken(audience);
  }

  return token.value;
}

/**
 * The API identifies visitors by their session cookie alone, so nothing about
 * the visitor is added here: only this server's own identity.
 */
const authorize =
  (audience: string) =>
  (proxyRequest: ClientRequest): void => {
    const token = currentIdToken(audience);

    if (token) {
      proxyRequest.setHeader('Authorization', `Bearer ${token}`);
    }
  };

/**
 * Paths that belong to the API rather than to the built site.
 *
 * `/api/client` is listed first and rewritten: the API serves the federation
 * remote at `/client`, and exposing it here under `/api` keeps everything the
 * API owns beneath one prefix. Order matters - `/api` would otherwise swallow
 * it and forward `/api/client/remoteEntry.js` unchanged, which the API does not
 * serve.
 *
 * The image routes are narrowed to their own segments, not all of `/assets`.
 * The built client emits its own bundles there - `/assets/mf-entry-*.js` - so
 * forwarding the whole prefix sent the application's own JavaScript to an API
 * that has never heard of it, and the site served a blank page with a 404 for
 * its bootstrap. The API only serves images beneath `/assets/{segment}/`,
 * which is what these match.
 *
 * `taxon-visual` is the pipeline's output; `static` is the site's own imagery,
 * kept in a bucket rather than in git. Both are URL segments the API maps to a
 * bucket, not bucket names - see the API's `Storage/bucket.ts`.
 *
 * The prefix keeps its name on purpose: image URLs are stored in the database
 * as `/assets/taxon-visual/*`, so moving it would orphan every record already
 * written.
 */
const ASSET_SEGMENTS = ['taxon-visual', 'static'];
const ROUTES: Array<{
  path: string;
  rewrite?: Record<string, string>;
  target: string;
  ws?: boolean;
}> = [
  {
    path: '/api/client',
    rewrite: { '^/api/client': '/client' },
    target: BACKEND_URL,
  },
  { path: '/api', target: BACKEND_URL, ws: true },
  ...ASSET_SEGMENTS.map((segment) => ({
    path: `/assets/${segment}`,
    target: BACKEND_URL,
  })),
  // The design system's remote, at the same path it is served from.
  { path: '/design', target: DESIGN_URL },
];

const AUDIENCES = [BACKEND_URL, DESIGN_URL];

export async function warmIdToken(): Promise<void> {
  await Promise.all(AUDIENCES.map(mintIdToken));
}

/**
 * The one route that carries WebSockets, kept so its upgrade handler can be
 * attached to the server.
 */
let subscriptions: RequestHandler | null = null;

/**
 * A WebSocket upgrade never enters the Express router, so the proxy has to be
 * handed it directly. Without this, GraphQL subscriptions never connect -
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
    const missing = AUDIENCES.filter((audience) => !cached.has(audience));

    if (missing.length) {
      void Promise.all(missing.map(mintIdToken)).finally(() => next());

      return;
    }

    next();
  });

  ROUTES.forEach(({ path, rewrite, target, ws }) => {
    const middleware = createProxyMiddleware({
      /*
       * Selected by `pathFilter` rather than by mounting on a path. Mounting
       * makes Express strip the prefix before the proxy sees the request, so
       * `/api/client/remoteEntry.js` arrived as `/remoteEntry.js`: the rewrite
       * below had nothing left to match, and the stripped path fell through to
       * the API's GraphQL handler, which answered a request for a script with a
       * 400 and a JSON error body.
       */
      pathFilter: `${path}/**`,
      target,
      changeOrigin: true,
      ws: ws ?? false,
      ...(rewrite ? { pathRewrite: rewrite } : {}),
      on: {
        proxyReq: authorize(target),
        proxyReqWs: authorize(target),
      },
    });

    if (ws) {
      subscriptions = middleware;
    }

    app.use(middleware);
  });
}

export { BACKEND_URL, DESIGN_URL };
