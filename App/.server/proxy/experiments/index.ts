import type { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import * as registry from '@/.server/proxy/experiments/registry';
import * as idToken from '@/.server/proxy/id-token';

// Each registry record that mounts an experiment gets its `client/` and `files/` forwarded to its service.
const PATH = /^\/(experiments\/[a-z0-9]+(?:-[a-z0-9]+)*)\/(?:client|files)(?:\/|$)/;

const targetOf = (path: string) => registry.serviceOf(PATH.exec(path)?.[1] ?? '');

export function proxy() {
  registry.watch();

  const forward = createProxyMiddleware<Request, Response>({
    changeOrigin: true,
    router: (request) => targetOf(request.path) as string,
    on: {
      proxyReq: (proxyRequest, request) => {
        const token = idToken.current(targetOf(request.path) ?? '');

        if (token) {
          proxyRequest.setHeader('Authorization', `Bearer ${token}`);
        }
      },
    },
  });

  return async (request: Request, response: Response, next: NextFunction) => {
    if (!PATH.test(request.path)) {
      next();
      return;
    }

    const target = targetOf(request.path);

    if (!target) {
      response.status(404).end();
      return;
    }

    await idToken.get(target);
    await forward(request, response, next);
  };
}
