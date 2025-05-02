import appRoot from 'app-root-path';

import { Express } from 'express';
import type { UserConfig } from 'vite';

import * as dotenv from 'dotenv';

import get, { PATH } from './get';

dotenv.config({ path: `${appRoot.path}/.env` });

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

const modules = {
  [PATH]: get,
};

const Env: {
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
      target: `http://localhost:${process.env.PORT}${PATH}`,
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

  Env[path] = {
    headers,
    middleware,
    path,
    proxy,
  };
});

export default Env;
