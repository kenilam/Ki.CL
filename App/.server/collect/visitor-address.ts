import type { IncomingMessage } from 'node:http';

/**
 * Cloud Run's front end appends the address it received the connection from,
 * so the last entry is the visitor. Earlier entries are whatever the browser
 * sent and cannot be trusted.
 *
 * Only the analytics use this, for a daily hash. The API is never told the
 * visitor's address.
 */
export function visitorAddress(request: IncomingMessage): string | undefined {
  const forwarded = request.headers['x-forwarded-for'];
  const last = (Array.isArray(forwarded) ? forwarded.join(',') : forwarded)
    ?.split(',')
    .at(-1)
    ?.trim();

  return last || request.socket.remoteAddress;
}
