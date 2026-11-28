import type { Server } from 'node:http';

import type { RequestHandler } from 'http-proxy-middleware';

import * as clientToken from '@/.server/client-token';

let subscriptions: RequestHandler | null = null;

/** The one route that carries WebSockets. */
export function use(middleware: RequestHandler): void {
  subscriptions = middleware;
}

// An upgrade skips Express, so the socket route is handed it here, after the same client-token check.
export function attach(server: Server): void {
  const upgrade = subscriptions?.upgrade;

  if (!upgrade) {
    return;
  }

  server.on('upgrade', (request, socket, head) => {
    if (clientToken.check(request) === null) {
      socket.destroy();
      return;
    }

    upgrade(request, socket, head);
  });
}
