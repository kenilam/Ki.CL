import { Router, type RequestHandler } from 'express';

/** Files a page loads and nobody opens: scripts, styles and their maps. */
const PARTS = /\.(css|js|map|mjs)$/;

/** What `Sec-Fetch-Dest` says when the file is to be shown, not loaded. */
const SHOWN = new Set(['document', 'embed', 'frame', 'iframe', 'object']);

/**
 * Answers a browser that opens a script or a style on its own, such as
 * `/design/remoteEntry.js` typed into the address bar, with the shell and a
 * 404. The site has no route for the path, so it shows its not-found page.
 *
 * This keeps people off those files. It does not protect them: the site needs
 * them to run, and any client can send the header a page sends. A browser too
 * old to send `Sec-Fetch-Dest` gets the file.
 *
 * @param shell What sends the shell, the dev gate included.
 */
export function createNavigation(shell: RequestHandler[]): Router {
  const router = Router();

  router.get(
    PARTS,
    (request, response, next) => {
      if (SHOWN.has(request.get('sec-fetch-dest') ?? '')) {
        response.status(404);

        next();

        return;
      }

      /*
       * Without `Vary` the browser answers a tab from the copy the page
       * already loaded and never asks here. Added as the headers go out,
       * because the proxy replaces the ones set before it with the service's
       * own.
       */
      const { writeHead } = response;

      response.writeHead = function (
        this: typeof response,
        ...parameters: Parameters<typeof writeHead>
      ) {
        response.vary('Sec-Fetch-Dest');

        return writeHead.apply(this, parameters);
      } as typeof writeHead;

      next('route');
    },
    ...shell
  );

  return router;
}
