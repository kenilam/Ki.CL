// Context
import type { Job } from '@/views/experiments/factory-arm/context';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Partials
import { type Option, spot } from './buffer';
import { type Bodies, blocked, highest, onPallet } from './cell';
import { heading, top } from './pad';
import { CLEARANCE, belt, plan, type Step } from './plan';
import { straight } from './route/check';

/**
 * The moves for the job at the head of the queue, or nothing when it can't
 * start: its case has gone, left the pallets, or something has landed on it
 * since the click. A buffer with no room the arm can reach, past the
 * obstacles it knows about, sends the case straight to the belt instead.
 */
const start = (
  next: Job,
  bodies: Bodies,
  queue: Job[],
  solids: Solid[]
): Step[] | null => {
  const entry = bodies.get(next.id);

  if (!entry || !onPallet(next.id, bodies) || blocked(next.id, bodies)) {
    return null;
  }

  const upcoming = queue
    .slice(1)
    .filter((later) => later.to === 'buffer')
    .flatMap((later) => bodies.get(later.id)?.box ?? []);
  const [, height] = entry.box.size;
  const travel = highest(bodies) + height + CLEARANCE;
  const carried = {
    size: entry.box.size,
    yaw: 0,
    offset: { x: 0, y: -height / 2, z: 0 },
  };

  // A place only counts if the case can go straight down onto it.
  const reachable = ({ slab, facing }: Option) => {
    const down = {
      x: (slab.x[0] + slab.x[1]) / 2,
      y: slab.bottom + height,
      z: (slab.z[0] + slab.z[1]) / 2,
    };

    return straight(
      { ...down, y: Math.max(travel, down.y) },
      down,
      facing,
      carried,
      solids
    );
  };

  const room =
    next.to === 'buffer' &&
    spot(entry.box, bodies, upcoming, solids.length ? reachable : undefined);

  return plan(
    top(entry.body, entry.box),
    heading(entry.body.rotation()),
    entry.box.size,
    highest(bodies),
    room ? { ...room, wait: false } : belt(entry.box.size)
  );
};

export { start };
