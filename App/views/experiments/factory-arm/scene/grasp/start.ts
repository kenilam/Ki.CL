// Context
import type { Job } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Joints } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Partials
import { spots } from './buffer';
import { type Bodies, blocked, highest, onPallet } from './cell';
import { heading, top } from './pad';
import { belt, type Destination, lift, plan, type Step } from './plan';
import type { Carried } from './route/body';
import { straight } from './route/check';
import { ahead } from './route/plan-ahead';

/** How many buffer places are tried before a case in the way goes to the belt. */
const TRIES = 4;

/**
 * A job's moves, checked end to end; or what was in the way when no
 * destination works; or nothing when the job can't be done at all, because
 * its case has gone, left the pallets, or has something on top of it.
 */
type Outcome = { steps: Step[] } | { across: string[] } | null;

/**
 * Where a job's case may go, best first. A case in the way tries the best few
 * places on the buffer, then the belt; the case that was clicked goes to the
 * belt.
 */
const destinations = (
  job: Job,
  bodies: Bodies,
  queue: Job[]
): Destination[] => {
  const entry = bodies.get(job.id);

  if (!entry) {
    return [];
  }

  if (job.to === 'belt') {
    return [belt(entry.box.size)];
  }

  const upcoming = queue
    .slice(1)
    .filter((later) => later.to === 'buffer')
    .flatMap((later) => bodies.get(later.id)?.box ?? []);

  return [
    ...spots(entry.box, bodies, upcoming)
      .slice(0, TRIES)
      .map((room) => ({ ...room, wait: false })),
    belt(entry.box.size),
  ];
};

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
  const entry = bodies.get(job.id);

  if (!entry || !onPallet(job.id, bodies) || blocked(job.id, bodies)) {
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
    const steps = plan(
      top(entry.body, entry.box),
      heading(entry.body.rotation()),
      entry.box.size,
      highest(bodies),
      destination
    ).slice(from);
    const checked = ahead(steps, joints, carried, solids, from > 1);

    if ('steps' in checked) {
      return checked;
    }

    checked.across.forEach((id) => across.add(id));
  }

  return { across: [...across] };
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

export { hopeless, onward, start };
export type { Outcome };
