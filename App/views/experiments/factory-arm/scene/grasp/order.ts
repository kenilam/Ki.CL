// Context
import type { Job } from '@/views/experiments/factory-arm/context';

// Cell
import { type Bodies, blockers, onPallet } from './cell';

/**
 * The cases to move, in order, so that `id` can be lifted: everything in its
 * way first, and everything in their way before that, then `id` itself.
 *
 * A case in the way is always taller than the one it blocks, so following
 * them only ever climbs and can't loop back. Returns nothing when a case in
 * the chain is off the pallets, since the arm only works the pallets.
 */
const order = (id: string, bodies: Bodies, held?: string): string[] => {
  const chain: string[] = [];

  const visit = (current: string): boolean => {
    if (chain.includes(current)) {
      return true;
    }

    if (!onPallet(current, bodies)) {
      return false;
    }

    // Highest first, so each case is clear by the time its turn comes.
    const above = blockers(current, bodies, held).sort(
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
