import { timingSafeEqual } from 'node:crypto';

import type { Express, Request } from 'express';

import { page } from './page';

/** Pages with their own sign-in, which the dev prompt leaves alone. */
const OPEN = /^\/portfolio(\/|$)/;

/**
 * Whether the request opens a page, rather than being one a page makes. A
 * browser says so in `Sec-Fetch-Mode`; for anything else, a GET that takes
 * HTML counts.
 */
const isPageLoad = (request: Request) => {
  const mode = request.get('sec-fetch-mode');

  return mode
    ? mode === 'navigate'
    : request.method === 'GET' && Boolean(request.accepts('html'));
};

/**
 * Asks for a password when `KICL_GATE_PASSWORD` is set, so a dev deployment is
 * not public. The browser shows its own prompt and resends the credentials for
 * every same-origin request after that. Any username is accepted. Unset in
 * production, where this does nothing.
 *
 * Only page loads are asked, and not the portfolio's, which have their own
 * sign-in: one prompt in front of another was one too many. So a portfolio
 * page's scripts, remotes and API calls get through without the password,
 * which also leaves those paths as open as they are in production.
 */
export function applyGate(app: Express): void {
  const password = process.env.KICL_GATE_PASSWORD;

  if (!password) {
    return;
  }

  const expected = Buffer.from(password);

  app.use((request, response, next) => {
    /*
     * Cloud Run's health check has no credentials, and a client with a valid
     * token (see `client-token`) has already been let in.
     */
    if (
      request.path === '/health' ||
      response.locals.client ||
      !isPageLoad(request) ||
      OPEN.test(request.path)
    ) {
      next();

      return;
    }

    const [scheme, encoded] = request.get('authorization')?.split(' ') ?? [];
    const given = Buffer.from(
      scheme === 'Basic' && encoded
        ? Buffer.from(encoded, 'base64')
            .toString()
            .split(':')
            .slice(1)
            .join(':')
        : ''
    );

    if (given.length === expected.length && timingSafeEqual(given, expected)) {
      next();

      return;
    }

    response
      .status(401)
      .set('WWW-Authenticate', 'Basic realm="dev", charset="UTF-8"')
      .set('Cache-Control', 'no-store')
      .type('html')
      .send(page);
  });
}
