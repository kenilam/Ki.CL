import { path as appRoot } from 'app-root-path';
import hpp from 'hpp';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import colors from 'colors';
import NodeLogger from 'simple-node-logger';

import { port } from '../app.config.json';

import Fixtures from '../Fixtures';

import Env from './Env';

const Logger = NodeLogger.createSimpleLogger();

const middlewares = Object.values({ ...Fixtures });

type Props = {
  middlewares?: typeof middlewares;
  port: typeof port;
  root?: string;
};

const DEFAULT: Props = {
  port: port || Number(Env.PORT),
};

async function Server({
  middlewares,
  port = DEFAULT.port,
  root,
}: Props = DEFAULT) {
  if (!Number.isInteger(port)) {
    throw new Error('Server Error: invalid port');
  }

  try {
    const baseurl = [appRoot, 'App', root, 'build'].filter(Boolean).join('/');

    const app = express();

    app.use(
      express.static(baseurl, {
        etag: true,
        lastModified: true,
        maxAge: 8.64e7, // a day
      })
    );

    const middlewarePaths = middlewares?.map(({ path }) => path);

    app.get('*', (request, responses, next) => {
      if (middlewarePaths?.includes(request.path)) {
        next();
        return;
      }

      const data = fs.readFileSync(`${baseurl}/index.html`, 'utf8');
      responses.send(data);

      next();
    });

    if (middlewares) {
      middlewares.forEach(({ middleware }) => {
        middleware(app);
      });
    }

    app.use(compression());
    app.use(express.json());
    app.use(hpp());

    app.listen(port, () => {
      Logger.info('Server running on port: ', colors.green(String(port)));
    });
  } catch (error) {
    Logger.error(
      colors.red('An error occurred when attempting to start application'),
      error
    );
  }
}

export { middlewares };
export default Server;
