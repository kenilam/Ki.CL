import * as dotenv from 'dotenv';

import appRoot from 'app-root-path';

import hpp from 'hpp';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import isImage from 'is-image';
import isVideo from 'is-video';

import colors from 'colors';
import NodeLogger from 'simple-node-logger';

import config from '../app.config.json' assert { type: 'json' };

import Env from '../Env';

import nodePath from 'path';

dotenv.config({ path: `${appRoot.path}/.env` });

const Logger = NodeLogger.createSimpleLogger();

const middlewares = Object.values({ ...Env });

async function Server() {
  if (!Number.isInteger(Number(process.env.PORT))) {
    throw new Error('Server Error: invalid port');
  }

  try {
    const baseurl = [appRoot.path, 'App', 'build'].filter(Boolean).join('/');

    const app = express();

    app.use(
      express.static(baseurl, {
        etag: true,
        lastModified: true,
        maxAge: 8.64e7, // a day
      })
    );

    const middlewarePaths = middlewares?.map(({ path }) => path);

    app.get('/health', (_, responses) => {
      responses.status(200).send('ok');
    });

    app.get('*', (request, responses, next) => {
      Logger.info('Origin:', request.url);

      let url = request.url;

      if (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
      }

      if (request.url === '/health') {
        Logger.info('healthCheck:', url);

        next();

        return;
      }

      if (middlewarePaths?.includes(url)) {
        Logger.info('middleware:', url);

        next();

        return;
      }

      let path = `${baseurl}${url.replace(config.base, '')}`;

      if (!fs.existsSync(path) || path === baseurl) {
        path = `${baseurl}/index.html`;
      }

      const extname = nodePath.extname(path);

      responses.type(extname);

      if (isImage(path)) {
        responses.sendFile(path, (error) => {
          if (error) {
            next(error);
            return;
          }

          Logger.info('Sent:', path);
        });

        return;
      }

      if (isVideo(path)) {
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = request.headers.range;

        if (range) {
          Logger.info('Sending video range:', range);

          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          Logger.info(parts);

          const chunksize = end - start + 1;
          const file = fs.createReadStream(path, { start, end });

          responses.status(206);
          responses.setHeader(
            'Content-Range',
            `bytes ${start}-${end}/${fileSize}`
          );
          responses.setHeader('Accept-Ranges', 'bytes');
          responses.setHeader('Content-Length', chunksize);

          file.pipe(responses);
        } else {
          Logger.info('no range', range);

          responses.status(200);
          responses.setHeader('Content-Length', fileSize);

          fs.createReadStream(path).pipe(responses);
        }

        Logger.info('Sent:', path);

        return;
      }

      try {
        const data = fs.readFileSync(path, 'utf8');

        responses.send(data);

        Logger.info('Sent:', path);
      } catch (error) {
        responses.status(503).send('503: Service is temporary unavailable');

        Logger.error(error);
      }

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

    const port = process.env.PORT;

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

Server();

export { middlewares };
export default Server;
