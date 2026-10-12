import * as dotenv from 'dotenv';

import appRoot from 'app-root-path';

import hpp from 'hpp';
import fs from 'fs';
import express, { type RequestHandler } from 'express';
import compression from 'compression';

import colors from 'colors';

import { Env } from '../env';

import { applyClientToken } from './client-token';
import { applyCollect } from './collect';
import { createGate } from './gate';
import { applyHeaders } from './headers';
import { precompressed } from './precompressed';
import {
  applyProxy,
  attachUpgrade,
  BACKEND_URL,
  currentIdToken,
  warmIdToken,
} from './proxy';
import { createTexts, escapeJson } from './texts';

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

    applyHeaders(app);

    // Before the gate, which lets a verified client through.
    applyClientToken(app);

    const texts = createTexts(() => currentIdToken(BACKEND_URL));

    /*
     * Ahead of everything that serves files. The API's paths are not on disk,
     * and the catch-all below answers anything it cannot find with index.html -
     * so a proxied route mounted after it would return the SPA shell instead of
     * the remote entry, and module federation would fail on a 200.
     */
    applyProxy(app);

    applyCollect(app);

    /*
     * Ahead of the built files: the shell and the manifest ask for their words
     * by `{{key}}`, so neither is sent as the file it is on disk.
     */
    const shell: RequestHandler[] = [
      createGate(texts),
      (_, responses) => {
        const file = `${baseurl}/index.html`;

        responses
          .setHeader('Cache-Control', cacheControl(file))
          .type('html')
          .send(texts.fill(fs.readFileSync(file, 'utf8')));
      },
    ];

    app.get(['/', '/index.html'], ...shell);

    app.get('/site.webmanifest', (_, responses) => {
      responses
        .type('application/manifest+json')
        .send(
          texts.fill(
            fs.readFileSync(`${baseurl}/site.webmanifest`, 'utf8'),
            escapeJson
          )
        );
    });

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

    const middlewarePaths = middlewares.map(({ path }) => path);

    app.get('/health', (_, responses) => {
      responses.status(200).send('ok');
    });

    /*
     * Whatever is left is a route of the site, so it gets the shell. Files are
     * sent by `express.static` above and never from here: this used to read the
     * path in the URL off disk itself, and `/../../.env` left the build folder.
     */
    app.get(
      /(.*)/,
      (request, responses, next) => {
        if (middlewarePaths.includes(request.path.replace(/\/$/, ''))) {
          next('route');

          return;
        }

        /*
         * A built file that is gone, asked for by a page from an earlier
         * release. Answering with the shell would hand the browser HTML where
         * it expects a script.
         */
        if (request.path.startsWith(ASSETS)) {
          responses.status(404).send(texts.text('error_not_found'));

          return;
        }

        next();
      },
      ...shell
    );

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
