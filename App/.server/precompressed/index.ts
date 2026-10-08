import fs from 'node:fs';
import nodePath from 'node:path';

import type { RequestHandler } from 'express';

/** In the order they are preferred: Brotli is the smaller of the two. */
const ENCODINGS = [
  { name: 'br', extension: '.br' },
  { name: 'gzip', extension: '.gz' },
];

/**
 * Sends the `.br` or `.gz` the build wrote beside a file, when the browser
 * takes one. It only points the request at that file: `express.static`, mounted
 * after it on the same folder, does the sending.
 */
function precompressed(root: string): RequestHandler {
  return (request, response, next) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      next();

      return;
    }

    const accepted = request.acceptsEncodings();
    const file = nodePath.join(root, request.path);

    const encoding = ENCODINGS.find(
      ({ name, extension }) =>
        accepted.includes(name) && fs.existsSync(`${file}${extension}`)
    );

    // `join` has resolved any `..`, so a path that left the folder shows here.
    if (!encoding || !file.startsWith(root)) {
      next();

      return;
    }

    response.setHeader('Content-Encoding', encoding.name);
    response.vary('Accept-Encoding');
    // Set here: the file now ends in `.br`, which says nothing about its type.
    response.type(nodePath.extname(request.path));

    request.url = request.url.replace(
      request.path,
      `${request.path}${encoding.extension}`
    );

    next();
  };
}

export { precompressed };
