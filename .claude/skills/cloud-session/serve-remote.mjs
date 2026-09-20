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

const TYPES = {
  '.css': 'text/css',
  '.d.ts': 'text/plain',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.mjs': 'text/javascript',
  '.zip': 'application/zip',
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
});
