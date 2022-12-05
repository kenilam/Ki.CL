import { Express } from 'express';
import type { UserConfig } from 'vite';

import Seed, { PATH as SEED_PATH } from './seed';

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

const modules = {
  [SEED_PATH]: Seed,
};

const Fixtures: {
  [path: string]: {
    headers: typeof headers;
    middleware: (app: Express) => void;
    path: string;
    proxy: Exclude<UserConfig['server'], undefined>['proxy'];
  };
} = {};

Object.keys(modules).forEach((path) => {
  const module = modules[path];

  // Middleware only serve on production mode
  const middleware = (app: Express) => {
    app.get(path, (request, responses, next) => {
      const result = module(request, responses);

      responses
        .status(200)
        .setHeader('Content-Type', headers['Content-Type'])
        .send(JSON.stringify(result));

      next();
    });
  };

  // Proxy only serve on development mode
  const proxy: Exclude<UserConfig['server'], undefined>['proxy'] = {
    [path]: {
      target: `http://localhost:3001/fixtures`,
      configure(proxy) {
        proxy.on('proxyReq', (proxyReq, proxyRep, responses) => {
          const result = module(proxyReq, proxyRep);

          proxyReq.setHeader('Content-Type', headers['Content-Type']);
          responses.writeHead(200, headers);
          responses.write(JSON.stringify(result));
          responses.end();
        });
      },
    },
  };

  Fixtures[path] = {
    headers,
    middleware,
    path,
    proxy,
  };
});

export default Fixtures;
