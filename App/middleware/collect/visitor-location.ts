import type { IncomingMessage } from 'node:http';

/**
 * The load balancer sets both from the visitor's address and replaces any the
 * browser sent. Only the region code and the city are kept, never the address.
 */
export function visitorLocation(request: IncomingMessage) {
  const read = (name: string) => {
    const value = request.headers[name];

    return (Array.isArray(value) ? value[0] : value)?.trim() || undefined;
  };

  return { city: read('x-client-city'), region: read('x-client-region') };
}
