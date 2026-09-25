// Context
import type { Job } from '@/views/experiments/factory-arm/context';

// Partials
import { spot } from './buffer';
import { type Bodies, blocked, highest, onPallet } from './cell';
import { heading, top } from './pad';
import { belt, plan, type Step } from './plan';

/**
 * The moves for the job at the head of the queue, or nothing when it can't
 * start: its case has gone, left the pallets, or something has landed on it
 * since the click. A full buffer sends the case straight to the belt instead.
 */
const start = (next: Job, bodies: Bodies, queue: Job[]): Step[] | null => {
  const entry = bodies.get(next.id);

  if (!entry || !onPallet(next.id, bodies) || blocked(next.id, bodies)) {
    return null;
  }

  const upcoming = queue
    .slice(1)
    .filter((later) => later.to === 'buffer')
    .flatMap((later) => bodies.get(later.id)?.box ?? []);
  const room = next.to === 'buffer' && spot(entry.box, bodies, upcoming);

  return plan(
    top(entry.body, entry.box),
    heading(entry.body.rotation()),
    entry.box.size,
    highest(bodies),
    room ? { ...room, wait: false } : belt(entry.box.size)
  );
};

export { start };
