import { CATALOGUE, MAX_CASES, sku } from './catalogue';
import { BELT_TOP } from './layout';
import type { Belt, Case, World } from './types';

/*
 * Belts feed cases in at their start and carry them to the end, where they
 * queue nose to tail. The first in the queue waits at the end until an arm
 * takes it, and a belt stops feeding while its queue reaches back to the start.
 */

/** Space between cases queued on a belt, in metres. */
const GAP = 0.15;

/** How close to its stop a case must be to count as waiting there. */
const WAITING = 0.005;

const spawn = (world: World, belt: Belt) => {
  const { kind, size, weight, friction } = sku(world.made);

  world.cases.push({
    id: `case-${world.made}`,
    kind,
    size,
    weight,
    friction,
    holder: { kind: 'belt', belt: belt.id, along: 0 },
    position: { x: belt.start.x, y: BELT_TOP + size[1] / 2, z: belt.start.z },
    heading: belt.heading,
  });
  world.made += 1;
};

type Queue = {
  item: Case;
  holder: Extract<Case['holder'], { kind: 'belt' }>;
}[];

/** Every belt's cases, front of the queue first, found in one pass over the floor. */
const queues = (world: World) => {
  const found = new Map<string, Queue>();

  world.cases.forEach((item) => {
    if (item.holder.kind === 'belt') {
      const queue = found.get(item.holder.belt) ?? [];

      queue.push({ item, holder: item.holder });
      found.set(item.holder.belt, queue);
    }
  });
  found.forEach((queue) =>
    queue.sort((a, b) => b.holder.along - a.holder.along)
  );

  return found;
};

/**
 * How far along the belt the next case may come: up to a case still being
 * lifted off it, as an escapement holds the line until the pick zone is clear.
 * A case on a pad counts while its underside is lower than the tallest case
 * could reach and it is over the belt.
 */
const clearTo = (lifted: Case[], belt: Belt) => {
  const dx = Math.sin(belt.heading);
  const dz = Math.cos(belt.heading);
  const tallest = Math.max(...CATALOGUE.map(({ size }) => size[1]));

  return lifted.reduce((limit, { heading, position, size }) => {
    if (position.y - size[1] / 2 > BELT_TOP + tallest) {
      return limit;
    }

    const x = position.x - belt.start.x;
    const z = position.z - belt.start.z;
    const along = x * dx + z * dz;
    const across = Math.abs(x * dz - z * dx);
    // Half the case's length along the belt, however it is turned on the pad.
    const turn = heading - belt.heading;
    const reach =
      (Math.abs(Math.cos(turn)) * size[2] +
        Math.abs(Math.sin(turn)) * size[0]) /
      2;
    const side =
      (Math.abs(Math.sin(turn)) * size[2] +
        Math.abs(Math.cos(turn)) * size[0]) /
      2;

    if (
      along + reach < 0 ||
      along - reach > belt.length ||
      across > belt.width / 2 + side
    ) {
      return limit;
    }

    return Math.min(limit, along - reach - GAP);
  }, belt.length);
};

const runBelt = (
  world: World,
  belt: Belt,
  dt: number,
  queue: Queue = [],
  lifted: Case[] = []
) => {
  let limit = clearTo(lifted, belt);

  queue.forEach(({ holder, item }) => {
    const half = item.size[2] / 2;

    // A blocked line stops where it is; a case never runs backwards.
    holder.along = Math.max(
      holder.along,
      Math.min(holder.along + belt.speed * dt, limit - half)
    );
    limit = holder.along - half - GAP;
    item.position.x = belt.start.x + Math.sin(belt.heading) * holder.along;
    item.position.z = belt.start.z + Math.cos(belt.heading) * holder.along;
  });

  belt.due -= dt;

  if (belt.due <= 0 && limit > 1 && world.cases.length < MAX_CASES) {
    spawn(world, belt);
    belt.due = belt.every;
  }
};

/** The case at the head of a belt's queue, once it has stopped at the end. */
const waitingOn = (belt: Belt, queue: Queue = []) => {
  const [head] = queue;

  return head &&
    head.holder.along >= belt.length - head.item.size[2] / 2 - WAITING
    ? head.item
    : null;
};

export { queues, runBelt, waitingOn, type Queue };
