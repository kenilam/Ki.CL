// Context
import type { Job } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Joints } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Partials
import { spots } from './buffer';
import { type Bodies, blocked, highest, onPallet, solidsOf } from './cell';
import { heading, top } from './pad';
import { belt, type Destination, lift, plan, type Step } from './plan';
import type { Carried } from './route/body';
import { straight } from './route/check';
import { ahead } from './route/plan-ahead';

/** How many buffer places are tried, of each kind, before a job counts as blocked. */
const TRIES = 4;

/**
 * A job's moves, checked end to end; or what was in the way when no
 * destination works; or nothing when the job can't be done at all, because
 * its case has gone, left the pallets, or has something on top of it.
 */
type Outcome = { steps: Step[] } | { across: string[] } | null;

/**
 * Where a job's case may go, best first. A case in the way tries the best few
 * clear places on the buffer, then on the incoming pallet, then places that
 * would bury a queued case; it never goes to the belt. The case that was
 * clicked goes to the belt.
 *
 * Each pallet's places are only worked out once the ones before them have
 * all failed: the incoming pallet holds most of the cases, so searching it
 * is slow, and it's rarely needed.
 */
function* destinations(
  job: Job,
  bodies: Bodies,
  queue: Job[]
): Generator<Destination> {
  const entry = bodies.get(job.id);

  if (!entry) {
    return;
  }

  if (job.to === 'belt') {
    yield* belt(entry.box.size);
    return;
  }

  const upcoming = queue
    .slice(1)
    .filter((later) => later.to === 'buffer')
    .flatMap((later) => bodies.get(later.id)?.box ?? []);

  // Cases still to be picked up: better not to bury them.
  const reserved = queue.slice(1).map(({ id }) => id);

  // The case itself isn't part of the buffer's load, even in the air over it.
  const others: Bodies = new Map([...bodies].filter(([id]) => id !== job.id));

  /*
   * The cases still to come are played forward on the buffer only. They go
   * there first too, so looking ahead on the incoming pallet would cost a lot
   * and change little.
   */
  const buffer = spots(entry.box, others, upcoming, reserved, 'buffer');
  let pallet: typeof buffer | undefined;
  const incoming = () =>
    (pallet ??= spots(entry.box, others, [], reserved, 'pallet'));

  const pick = (rooms: typeof buffer, burying: boolean): Destination[] =>
    rooms
      .filter(({ buries }) => buries.length > 0 === burying)
      .slice(0, TRIES)
      .map(({ facing, point }) => ({ facing, point, wait: false }));

  /*
   * A case moved out of the way never goes to the belt: only a case queued
   * for the belt does. It goes to a clear place on the buffer, or on the
   * incoming pallet once that has room; places that bury a queued case come
   * last, for when there is no other room.
   */
  yield* pick(buffer, false);
  yield* pick(incoming(), false);
  yield* pick(buffer, true);
  yield* pick(incoming(), true);
}

/**
 * Plans the job for each destination in turn from where the arm is, and keeps
 * the first whose every move is clear of the obstacles the arm knows about.
 * `from` is how many of the planned moves are already done: at the pick, the
 * approach is behind the arm and the case is about to be on the pad.
 */
const choose = (
  job: Job,
  bodies: Bodies,
  queue: Job[],
  solids: Solid[],
  joints: Joints,
  from: number
): Outcome => {
  // The other cases, as solids for the free moves; this one travels with the pad.
  const cases = solidsOf(bodies, [job.id]);

  const entry = bodies.get(job.id);

  // Before the pick it must still be on a pallet with nothing on it; after,
  // it's on the pad.
  if (
    !entry ||
    (from < 3 && (!onPallet(job.id, bodies) || blocked(job.id, bodies)))
  ) {
    return null;
  }

  const [, height] = entry.box.size;
  const carried: Carried = {
    size: entry.box.size,
    yaw: 0,
    offset: { x: 0, y: -height / 2, z: 0 },
  };
  const across = new Set<string>();

  for (const destination of destinations(job, bodies, queue)) {
    const whole = plan(
      top(entry.body, entry.box),
      heading(entry.body.rotation()),
      entry.box.size,
      highest(bodies),
      destination
    );
    const [, , , over, down, up] = whole;

    /*
     * Setting down and leaving are straight moves with no way round, so a
     * place where either is blocked is passed over before the costly search
     * for the way there. What blocks it is named, as the search would.
     */
    const settles = (among: Solid[]) =>
      straight(over.target, down.target, down.facing, carried, among) &&
      straight(down.target, up.target, up.facing, undefined, among);

    if (!settles(solids)) {
      solids
        .filter((solid) => !settles([solid]))
        .forEach(({ id }) => across.add(id));

      continue;
    }

    const steps = whole.slice(from);
    const checked = ahead(steps, joints, carried, solids, from > 1, cases);

    if ('steps' in checked) {
      return checked;
    }

    checked.across.forEach((id) => across.add(id));
  }

  return { across: [...across] };
};

/**
 * Queued cases worth delivering before this job, to save burying them.
 *
 * When the buffer has no clear place for a case in the way, its best place
 * would bury queued cases. If every one of those is headed for the belt and
 * free to lift now, sending them first clears that place: nothing is buried,
 * and they had to go anyway. Otherwise nothing is worth moving ahead.
 */
const firstInLine = (job: Job, bodies: Bodies, queue: Job[]): Job[] => {
  const entry = bodies.get(job.id);

  if (job.to !== 'buffer' || !entry) {
    return [];
  }

  const reserved = queue.slice(1).map(({ id }) => id);
  const others: Bodies = new Map([...bodies].filter(([id]) => id !== job.id));
  const rooms = spots(entry.box, others, [], reserved, 'buffer');

  if (!rooms.length || rooms.some(({ buries }) => !buries.length)) {
    return [];
  }

  const [{ buries }] = rooms;
  const ahead = queue.filter(({ id }) => buries.includes(id));
  const ready = ahead.every(
    ({ id, to }) =>
      to === 'belt' && onPallet(id, bodies) && !blocked(id, bodies)
  );

  return ready && ahead.length === buries.length ? ahead : [];
};

/**
 * The obstacles in the way of lifting a case straight out, if any. Every other
 * move can go round an obstacle; this one can't, so a case with its lift
 * blocked can't be moved at all, and neither can a case waiting on it.
 */
const unliftable = (id: string, bodies: Bodies, solids: Solid[]) => {
  const entry = bodies.get(id);

  if (!entry || !solids.length) {
    return [];
  }

  const [, height] = entry.box.size;
  const from = top(entry.body, entry.box);
  const above = { ...from, y: lift(highest(bodies), height, [from]) };
  const facing = heading(entry.body.rotation());
  const carried: Carried = {
    size: entry.box.size,
    yaw: 0,
    offset: { x: 0, y: -height / 2, z: 0 },
  };

  const clear = (among: Solid[]) =>
    straight(above, from, facing, undefined, among) &&
    straight(from, above, facing, carried, among);

  // Out of the arm's reach is no obstacle's doing; the job's own check says so.
  if (!clear([])) {
    return [];
  }

  return solids
    .filter((solid) => !clear([solid]))
    .map(({ id: solid }) => solid);
};

/**
 * The obstacles in the way of any lift in a chain of jobs. A chain with any
 * shouldn't start: moving the first cases would be for nothing.
 */
const hopeless = (chain: Job[], bodies: Bodies, solids: Solid[]) => [
  ...new Set(chain.flatMap(({ id }) => unliftable(id, bodies, solids))),
];

/** The job's moves from the start, before the arm goes for the case. */
const start = (
  job: Job,
  bodies: Bodies,
  queue: Job[],
  solids: Solid[],
  joints: Joints
) => choose(job, bodies, queue, solids, joints, 0);

/**
 * The job's moves from the pick on, checked again as the pad reaches the
 * case: the sensors may have found something on the way over.
 */
const onward = (
  job: Job,
  bodies: Bodies,
  queue: Job[],
  solids: Solid[],
  joints: Joints
) => choose(job, bodies, queue, solids, joints, 2);

/**
 * The job's moves from after the lift, for a held case: planned again from
 * where the arm is after it struck something, with the cases where they are
 * now.
 */
const resume = (
  job: Job,
  bodies: Bodies,
  queue: Job[],
  solids: Solid[],
  joints: Joints
) => choose(job, bodies, queue, solids, joints, 3);

export { firstInLine, hopeless, onward, resume, start };
export type { Outcome };
