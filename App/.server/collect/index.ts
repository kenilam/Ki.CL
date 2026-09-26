import type { IncomingMessage, ServerResponse } from 'node:http';

import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { BODY_LIMIT_BYTES, COLLECT_PATH, record } from './record';
import { visitorAddress } from './visitor-address';

/**
 * Receives the browser's analytics batches. Mounted ahead of the static files,
 * whose catch-all would otherwise answer with index.html.
 */
export function applyCollect(app: Express): void {
  app.post(
    COLLECT_PATH,
    express.json({
      limit: BODY_LIMIT_BYTES,
      // `sendBeacon` with a string body sends text/plain.
      type: ['application/json', 'text/plain'],
    }),
    (request, response) => {
      record(request.body, {
        address: visitorAddress(request),
        userAgent: request.get('user-agent'),
      });

      response.status(204).end();
    },
    /*
     * Malformed or oversized bodies are anyone's to send, so they get a status
     * and no stack trace in the logs.
     */
    (
      error: { status?: number },
      _request: Request,
      response: Response,
      _next: NextFunction
    ) => {
      response.status(error.status ?? 400).end();
    }
  );
}

/**
 * The same endpoint for `vite` and `vite preview`, which have no Express. The
 * body is read by hand because Connect does not parse it.
 */
export function collectMiddleware(
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void
): void {
  if (request.method !== 'POST' || request.url !== COLLECT_PATH) {
    next();

    return;
  }

  let body = '';

  request.on('data', (chunk: Buffer) => {
    body += chunk;

    if (body.length > BODY_LIMIT_BYTES) {
      request.destroy();
    }
  });

  request.on('end', () => {
    try {
      record(JSON.parse(body), {
        address: visitorAddress(request),
        userAgent: request.headers['user-agent'],
      });
    } catch {
      // A malformed batch is dropped, the same as an invalid event.
    }

    response.statusCode = 204;
    response.end();
  });
}
