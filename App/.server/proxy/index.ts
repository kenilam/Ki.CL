import type { Express, NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, type Options } from 'http-proxy-middleware';

import * as experiments from '@/.server/proxy/experiments';
import * as idToken from '@/.server/proxy/id-token';
import { AUDIENCES, ROUTES } from '@/.server/proxy/targets';
import * as upgrade from '@/.server/proxy/upgrade';

// The services are private on Cloud Run, so the browser reaches them through here, with this server's identity token.

type ProxyRequest = Parameters<NonNullable<NonNullable<Options['on']>['proxyReq']>>[0];

const authorize = ({ target }: (typeof ROUTES)[number]) => (proxyRequest: ProxyRequest) => {
  const token = idToken.current(target);

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

  ROUTES.forEach((route) => {
    const { path, rewrite, target, ws } = route;

    // `pathFilter`, not a mount path: mounting strips the prefix before a rewrite can see it.
    const middleware = createProxyMiddleware({
      pathFilter: `${path}/**`,
      target,
      changeOrigin: true,
      ws: ws ?? false,
      ...(rewrite ? { pathRewrite: rewrite } : {}),
      on: { proxyReq: authorize(route), proxyReqWs: authorize(route) },
    });

    if (ws) {
      upgrade.use(middleware);
    }

    app.use(middleware);
  });
}

export { BACKEND_URL } from '@/.server/proxy/targets';
