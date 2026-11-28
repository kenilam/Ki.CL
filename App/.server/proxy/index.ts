import type { ClientRequest } from 'node:http';

import type { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import * as experiments from '@/.server/proxy/experiments';
import * as idToken from '@/.server/proxy/id-token';
import { AUDIENCES, ROUTES } from '@/.server/proxy/targets';
import * as upgrade from '@/.server/proxy/upgrade';

// The services are private on Cloud Run, so the browser reaches them through here, with this server's identity token.

const authorize = (audience: string) => (proxyRequest: ClientRequest) => {
  const token = idToken.current(audience);

  if (token) {
    proxyRequest.setHeader('Authorization', `Bearer ${token}`);
  }
};

export async function warm(): Promise<void> {
  await idToken.warm(AUDIENCES);
}

export function apply(app: Express): void {
  // Fetched before the proxy, whose hooks can't await.
  app.use(async (_request: Request, _response: Response, next: NextFunction) => {
    await Promise.all(AUDIENCES.map(idToken.get));
    next();
  });

  app.use(experiments.proxy());

  ROUTES.forEach(({ path, rewrite, target, ws }) => {
    // `pathFilter`, not a mount path: mounting strips the prefix before a rewrite can see it.
    const middleware = createProxyMiddleware({
      pathFilter: `${path}/**`,
      target,
      changeOrigin: true,
      ws: ws ?? false,
      ...(rewrite ? { pathRewrite: rewrite } : {}),
      on: { proxyReq: authorize(target), proxyReqWs: authorize(target) },
    });

    if (ws) {
      upgrade.use(middleware);
    }

    app.use(middleware);
  });
}

export { BACKEND_URL } from '@/.server/proxy/targets';
