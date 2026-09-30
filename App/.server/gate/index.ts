import { timingSafeEqual } from 'node:crypto';

import type { Express } from 'express';

import { page } from './page';

/**
 * Asks for a password on every request when `KICL_GATE_PASSWORD` is set, so a
 * dev deployment is not public. The browser shows its own prompt and resends
 * the credentials for every same-origin request after that. Any username is
 * accepted. Unset in production, where this does nothing.
 */
export function applyGate(app: Express): void {
  const password = process.env.KICL_GATE_PASSWORD;

  if (!password) {
    return;
  }

  const expected = Buffer.from(password);

  app.use((request, response, next) => {
    // Cloud Run's health check has no credentials.
    if (request.path === '/health') {
      next();

      return;
    }

    const [scheme, encoded] = request.get('authorization')?.split(' ') ?? [];
    const given = Buffer.from(
      scheme === 'Basic' && encoded
        ? Buffer.from(encoded, 'base64').toString().split(':').slice(1).join(':')
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
