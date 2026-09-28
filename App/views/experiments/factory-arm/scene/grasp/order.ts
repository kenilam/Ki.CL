// Context
import type { Job } from '@/views/experiments/factory-arm/context';

// Kinematics
import { solve } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Cell
import { type Bodies, blockers, onPallet, solidsOf } from './cell';
import { heading, top } from './pad';
import { grazes } from './route/body';

/** Heights above a case's top, in metres, where the reach down to it is checked. */
const REACH = [0, 0.3, 0.6];

/**
 * The cases the arm's links would pass through reaching down to pick `id`:
 * reaching over a taller neighbour to a lower case, the forearm slopes
 * down through it. They're in the way as much as a case on top is.
 */
const overreached = (id: string, bodies: Bodies, held?: string) => {
  const entry = bodies.get(id);

  if (!entry) {
    return [];
  }

  const at = top(entry.body, entry.box);
  const facing = heading(entry.body.rotation());
  const others = solidsOf(
    bodies,
    [id, held].filter((each) => each !== undefined)
  );

  return [
    ...new Set(
      REACH.flatMap((up) =>
        grazes(solve({ ...at, y: at.y + up }, 0, facing), others)
      ).map((solid) => solid.id)
    ),
  ];
};

/**
 * The cases to move, in order, so that `id` can be lifted: everything in its
 * way first, and everything in their way before that, then `id` itself. In
 * the way means on top of it, or where the arm's links reach over to it.
 *
 * Returns nothing when a case in the chain is off the pallets, since the arm
 * only works the pallets. A case already being visited is passed over, so
 * two cases each in the other's reach can't loop.
 */
const order = (id: string, bodies: Bodies, held?: string): string[] => {
  const chain: string[] = [];
  const visiting = new Set<string>();

  const visit = (current: string): boolean => {
    if (chain.includes(current) || visiting.has(current)) {
      return true;
    }

    visiting.add(current);

    if (!onPallet(current, bodies)) {
      return false;
    }

    // Highest first, so each case is clear by the time its turn comes.
    const above = [
      ...new Set([
        ...blockers(current, bodies, held),
        ...overreached(current, bodies, held),
      ]),
    ].sort(
      (a, b) =>
        (bodies.get(b)?.body.translation().y ?? 0) -
        (bodies.get(a)?.body.translation().y ?? 0)
    );

    if (!above.every(visit)) {
      return false;
    }

    chain.push(current);

    return true;
  };

  return visit(id) ? chain : [];
};

/**
 * The moves a click on `id` asks for: the cases in its way go to the buffer
 * pallet, where they stay, then `id` goes to the belt. Cases already queued
 * keep their place and their moves.
 */
const jobs = (
  id: string,
  bodies: Bodies,
  queue: Job[],
  held?: string
): Job[] => {
  const queued = (other: string) => queue.some((job) => job.id === other);

  if (queued(id)) {
    return [];
  }

  const chain = order(id, bodies, held);

  if (!chain.length) {
    return [];
  }

  return [
    ...chain
      .slice(0, -1)
      .filter((other) => !queued(other))
      .map((other): Job => ({ id: other, to: 'buffer', chain: id })),
    { id, to: 'belt', chain: id },
  ];
};

export { jobs, order };
