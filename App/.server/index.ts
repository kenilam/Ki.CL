import * as dotenv from 'dotenv';

import appRoot from 'app-root-path';

import hpp from 'hpp';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import isImage from 'is-image';
import isVideo from 'is-video';

import colors from 'colors';

import config from '../app.config.json' with { type: 'json' };

import { Env } from '../env';

import { applyClientToken } from './client-token';
import { applyCollect } from './collect';
import { applyGate } from './gate';
import { precompressed } from './precompressed';
import { applyProxy, attachUpgrade, warmIdToken } from './proxy';

import nodePath from 'path';

dotenv.config({ path: `${appRoot.path}/.env` });

const middlewares = Object.values({ ...Env });

/** Where the build puts its content-hashed files. */
const ASSETS = '/assets/';

/**
 * The shell names the current build's files, so it is checked on every visit:
 * one kept for a day pointed at files a release had already replaced. The
 * hashed files never change under their name. The rest, images and icons kept
 * under a fixed name, stay a day.
 */
function cacheControl(file: string): string {
  // A precompressed copy is cached like the file it stands in for.
  const path = file.replace(/\.(br|gz)$/, '');

  if (path.endsWith('.html')) {
    return 'no-cache';
  }

  if (path.includes(ASSETS)) {
    return 'public, max-age=31536000, immutable';
  }

  return 'public, max-age=86400';
}

async function Server() {
  if (!Number.isInteger(Number(process.env.PORT))) {
    throw new Error('Server Error: invalid port');
  }

  try {
    const baseurl = [appRoot.path, 'App', 'build'].filter(Boolean).join('/');

    const app = express();

    /*
     * First, for what is not a built file: the shell and the API's answers
     * through the proxy. Built files arrive compressed and pass through.
     */
    app.use(compression());

    // Before the gate, which lets a verified client through.
    applyClientToken(app);

    applyGate(app);

    /*
     * Ahead of everything that serves files. The API's paths are not on disk,
     * and the catch-all below answers anything it cannot find with index.html -
     * so a proxied route mounted after it would return the SPA shell instead of
     * the remote entry, and module federation would fail on a 200.
     */
    applyProxy(app);

    applyCollect(app);

    app.use(
      precompressed(baseurl),
      express.static(baseurl, {
        etag: true,
        lastModified: true,
        setHeaders(response, path) {
          response.setHeader('Cache-Control', cacheControl(path));
        },
      })
    );

    const middlewarePaths = middlewares?.map(({ path }) => path);

    app.get('/health', (_, responses) => {
      responses.status(200).send('ok');
    });

    app.get(/(.*)/, (request, responses, next) => {
      console.info('Origin:', request.url);

      let url = request.url;

      if (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
      }

      if (request.url === '/health') {
        console.info('healthCheck:', url);

        next();

        return;
      }

      if (middlewarePaths?.includes(url)) {
        console.info('middleware:', url);

        next();

        return;
      }

      let path = `${baseurl}${url.replace(config.base, '')}`;

      if (!fs.existsSync(path) || path === baseurl) {
        /*
         * A built file that is gone, asked for by a page from an earlier
         * release. Answering with the shell would hand the browser HTML where
         * it expects a script.
         */
        if (request.path.startsWith(ASSETS)) {
          responses.status(404).send('404: Not found');

          return;
        }

        path = `${baseurl}/index.html`;
      }

      responses.setHeader('Cache-Control', cacheControl(path));

      const extname = nodePath.extname(path);

      responses.type(extname);

      if (isImage(path)) {
        responses.sendFile(path, (error) => {
          if (error) {
            next(error);
            return;
          }

          console.info('Sent:', path);
        });

        return;
      }

      if (isVideo(path)) {
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = request.headers.range;

        if (range) {
          console.info('Sending video range:', range);

          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          console.info(parts);

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
          console.info('no range', range);

          responses.status(200);
          responses.setHeader('Content-Length', fileSize);

          fs.createReadStream(path).pipe(responses);
        }

        console.info('Sent:', path);

        return;
      }

      try {
        const data = fs.readFileSync(path, 'utf8');

        responses.send(data);

        console.info('Sent:', path);
      } catch (error) {
        responses.status(503).send('503: Service is temporary unavailable');

        console.error(error);
      }

      next();
    });

    if (middlewares) {
      middlewares.forEach(({ middleware }) => {
        middleware(app);
      });
    }

    app.use(express.json());
    app.use(hpp());

    const port = process.env.PORT;

    const server = app.listen(port, () => {
      console.info('Server running on port: ', colors.green(String(port)));
    });

    /*
     * Fetched once at boot so the first proxied request does not pay for it,
     * and so a misconfigured identity is visible in the startup log rather than
     * as a puzzling 403 later.
     */
    void warmIdToken();

    attachUpgrade(server);
  } catch (error) {
    console.error(
      colors.red('An error occurred when attempting to start application'),
      error
    );
  }
}

Server();

export { middlewares, Server };
