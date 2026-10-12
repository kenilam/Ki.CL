import { timingSafeEqual } from 'node:crypto';

import type { RequestHandler } from 'express';

import { page } from './page';
import type { ServerTexts } from '../texts';

/** Pages with their own sign-in, which the dev prompt leaves alone. */
const OPEN = /^\/portfolio(\/|$)/;

/**
 * Asks for a password before the shell is sent when `KICL_GATE_PASSWORD` is
 * set, so a dev deployment is not public. The browser shows its own prompt and
 * resends the credentials after that. Any username is accepted. Unset in
 * production, where this does nothing.
 *
 * It guards the shell and nothing else. A portfolio page has its own sign-in
 * and is not asked, so its scripts, remotes and API calls have to get through
 * without the password, which leaves those paths as open as they are in
 * production. The check used to tell a page load from those by
 * `Sec-Fetch-Mode`, a header any client can set.
 */
export function createGate(texts: ServerTexts): RequestHandler {
  const password = process.env.KICL_GATE_PASSWORD;

  if (!password) {
    return (_request, _response, next) => next();
  }

  const expected = Buffer.from(password);

  return (request, response, next) => {
    // A client with a valid token (see `client-token`) has already been let in.
    if (response.locals.client || OPEN.test(request.path)) {
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
      .send(texts.fill(page));
  };
}
