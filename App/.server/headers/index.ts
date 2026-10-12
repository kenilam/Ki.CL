import type { Express } from 'express';

/**
 * Sent with every response. A proxied service that sets one of these itself
 * keeps its own value.
 *
 * The policy names no script or style sources yet. The remotes, Turnstile and
 * the WebAssembly the experiments load each need listing and checking in a
 * browser first.
 */
const HEADERS = {
  'Content-Security-Policy':
    "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  // For browsers that do not read `frame-ancestors`.
  'X-Frame-Options': 'DENY',
};

export function applyHeaders(app: Express): void {
  app.disable('x-powered-by');

  app.use((_request, response, next) => {
    response.set(HEADERS);

    next();
  });
}
