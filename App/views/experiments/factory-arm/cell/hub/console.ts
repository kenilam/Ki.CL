// Partials
import type { Inbound, Outbound } from './worker';

/**
 * The hub running in a worker, as the page sees it: send it what the
 * operator does, listen for what the stations report.
 */
const open = () => {
  const worker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  });
  const handlers = new Set<(message: Outbound) => void>();

  worker.onmessage = ({ data }: MessageEvent<Outbound[]>) =>
    data.forEach((message) => handlers.forEach((handler) => handler(message)));

  return {
    send: (message: Inbound) => worker.postMessage(message),
    listen: (handler: (message: Outbound) => void) => {
      handlers.add(handler);

      return () => handlers.delete(handler);
    },
    close: () => {
      handlers.clear();
      worker.terminate();
    },
  };
};

type Console = ReturnType<typeof open>;

export { open };
export type { Console };
