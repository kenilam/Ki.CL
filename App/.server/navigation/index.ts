import type { RequestHandler } from 'express';

import { page } from '../gate/page';
import type { ServerTexts } from '../texts';

/** Files a page loads and nobody opens: scripts, styles and their maps. */
const PARTS = /\.(css|js|map|mjs)$/;

/** What `Sec-Fetch-Dest` says when the file is to be shown, not loaded. */
const SHOWN = new Set(['document', 'embed', 'frame', 'iframe', 'object']);

/**
 * Answers a browser that opens a script or a style on its own, such as
 * `/design/remoteEntry.js` typed into the address bar, with a 403 and the
 * gate's page.
 *
 * This keeps people off those files. It does not protect them: the site needs
 * them to run, and any client can send the header a page sends. A browser too
 * old to send `Sec-Fetch-Dest` gets the file.
 */
export function createNavigation(
  texts: Pick<ServerTexts, 'fill'>
): RequestHandler {
  return (request, response, next) => {
    if (!PARTS.test(request.path)) {
      next();

      return;
    }

    if (SHOWN.has(request.get('sec-fetch-dest') ?? '')) {
      response
        .status(403)
        .set('Cache-Control', 'no-store')
        .type('html')
        .send(texts.fill(page(403)));

      return;
    }

    /*
     * Without `Vary` the browser answers a tab from the copy the page already
     * loaded and never asks here. Added as the headers go out, because the
     * proxy replaces the ones set before it with the service's own.
     */
    const { writeHead } = response;

    response.writeHead = function (
      this: typeof response,
      ...parameters: Parameters<typeof writeHead>
    ) {
      response.vary('Sec-Fetch-Dest');

      return writeHead.apply(this, parameters);
    } as typeof writeHead;

    next();
  };
}
