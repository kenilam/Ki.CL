// Partials
import type { Planner } from './conductor';
import { type Plan, plan } from './planner';

/** Plans on the spot, on this thread. */
const now: Planner = {
  plan: ({ pad, target, world, ...options }, done) =>
    done(plan(world, target, pad, options)),
};

/**
 * Plans in a worker, off the page's thread: the answer comes a frame or so
 * later, and a slow one never holds up the frames. The worker starts on the
 * first plan asked for, and again after `stop`.
 */
const later = () => {
  let worker: Worker | null = null;
  let count = 0;
  const waiting = new Map<number, (plan: Plan) => void>();

  const start = () => {
    const made = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module',
    });

    made.onmessage = ({ data }: MessageEvent<{ id: number; plan: Plan }>) => {
      waiting.get(data.id)?.(data.plan);
      waiting.delete(data.id);
    };

    return made;
  };

  const planner: Planner = {
    plan: (request, done) => {
      count += 1;
      waiting.set(count, done);
      worker ??= start();
      worker.postMessage({ id: count, request });
    },
  };

  const stop = () => {
    worker?.terminate();
    worker = null;
    waiting.clear();
  };

  return { ...planner, stop };
};

export { later, now };
