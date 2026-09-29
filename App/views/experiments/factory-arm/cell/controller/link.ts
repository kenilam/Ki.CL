// Protocol
import type { Box, Link, Report } from '../protocol';

/**
 * An arm's controller running in a worker on this page, as the hub sees it.
 * `feed` is the simulation's side door: it hands the worker the boxes its
 * sensors would meet, which a real arm gets from the world itself.
 */
const connect = (arm: string): Link & { feed: (boxes: Box[]) => void } => {
  const worker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  });
  const handlers = new Set<(report: Report) => void>();

  worker.onmessage = ({ data }: MessageEvent<Report[]>) =>
    data.forEach((report) => handlers.forEach((handler) => handler(report)));
  worker.postMessage({ type: 'boot', arm });

  return {
    arm,
    send: (command) => worker.postMessage(command),
    feed: (boxes) => worker.postMessage({ type: 'scene', boxes }),
    listen: (handler) => {
      handlers.add(handler);

      return () => handlers.delete(handler);
    },
    close: () => {
      handlers.clear();
      worker.terminate();
    },
  };
};

export { connect };
