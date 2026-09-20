#!/usr/bin/env node
/*
 * A stand-in for the backend when it cannot boot.
 *
 * The host's Module Federation runtime blocks all rendering if the remote
 * entry at `/client/remoteEntry.js` fails, and the backend refuses to start
 * without a Mongo URI, which is never in a cloud clone. This serves the
 * backend's built Client package at `/client` the way the real server does,
 * so the site renders; anything that needs the API answers 503.
 *
 *   node serve-remote.mjs [path-to-Ki.CL-back/Client/dist] [port]
 *
 * Defaults: the sibling clone's dist, port 3100 - the host's KICL_BACKEND_URL
 * default - so no env change is needed.
 *
 * With KICL_STATIC_DIR set, `/assets/static/…` is served from that directory
 * the way the real server serves the static bucket, with byte ranges, so
 * the Music Visualiser's catalogue can be tried before it is uploaded: lay
 * the files out as they will sit in the bucket (`music/open-lofi/…`).
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , distArgument, portArgument] = process.argv;

// Relative to this file, not the shell, so it works from any directory.
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

const DIST = resolve(distArgument ?? join(REPO, '../Ki.CL-back/Client/dist'));
const PORT = Number(portArgument ?? 3100);
const STATIC = process.env.KICL_STATIC_DIR
  ? resolve(process.env.KICL_STATIC_DIR)
  : null;

const TYPES = {
  '.css': 'text/css',
  '.d.ts': 'text/plain',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.mjs': 'text/javascript',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.webp': 'image/webp',
  '.zip': 'application/zip',
};

/** Send a file whole, or the byte range a media element asks for. */
const sendFile = (request, response, file) => {
  const size = statSync(file).size;
  const type = TYPES[extname(file)] ?? 'application/octet-stream';
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range ?? '');

  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;

    response.writeHead(206, {
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Type': type,
    });
    createReadStream(file, { end, start }).pipe(response);

    return;
  }

  response.writeHead(200, {
    'Accept-Ranges': 'bytes',
    'Content-Length': size,
    'Content-Type': type,
  });
  createReadStream(file).pipe(response);
};

if (!existsSync(DIST)) {
  console.error(`No Client dist at ${DIST}; build it first:`);
  console.error('  yarn codegen && yarn workspace @ki-cl/client run build');
  process.exit(1);
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  let path = url.pathname;

  response.setHeader('Access-Control-Allow-Origin', '*');

  if (path.startsWith('/api')) {
    response.writeHead(503, { 'Content-Type': 'text/plain' });
    response.end('Backend not available in this session');

    return;
  }

  if (STATIC && path.startsWith('/assets/static/')) {
    const file = join(STATIC, normalize(path.slice('/assets/static/'.length)));

    if (
      !file.startsWith(STATIC) ||
      !existsSync(file) ||
      !statSync(file).isFile()
    ) {
      response.writeHead(404);
      response.end();

      return;
    }

    sendFile(request, response, file);

    return;
  }

  if (!path.startsWith('/client/')) {
    response.writeHead(404);
    response.end();

    return;
  }

  // The federation host asks for `@mf-types.zip`; the build writes `types.zip`.
  if (path === '/client/@mf-types.zip') {
    path = '/client/types.zip';
  }

  const file = join(DIST, normalize(path.slice('/client'.length)));

  if (!file.startsWith(DIST) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404);
    response.end();

    return;
  }

  const type = file.endsWith('.d.ts')
    ? TYPES['.d.ts']
    : (TYPES[extname(file)] ?? 'application/octet-stream');

  response.writeHead(200, { 'Content-Type': type });
  createReadStream(file).pipe(response);
});

server.listen(PORT, () => {
  console.log(`Serving ${DIST} at http://localhost:${PORT}/client`);

  if (STATIC) {
    console.log(`Serving ${STATIC} at http://localhost:${PORT}/assets/static`);
  }
});
