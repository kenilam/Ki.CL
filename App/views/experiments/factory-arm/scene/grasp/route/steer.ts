// Kinematics
import {
  forward,
  solve,
  type Joints,
  type Point,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Plan
import type { Step } from '@/views/experiments/factory-arm/scene/grasp/plan';

// Partials
import type { Carried } from './body';
import { straight, swept } from './check';
import { route } from './search';

/** How far below the lower end of a move a way round may dip, in metres. */
const DIP = 0.02;

/**
 * What to do about the next move, given what the arm knows is in the way:
 * `go` as planned, go round by the waypoints in `steps`, or `stuck` when there
 * is no way through.
 */
type Verdict =
  { kind: 'go' } | { kind: 'round'; steps: Step[] } | { kind: 'stuck' };

/** Waypoints on a way round, taken straight at steady speed, then the move itself. */
const around = (points: Point[], step: Step): Step[] => [
  ...points
    .slice(0, -1)
    .map((target): Step => ({ target, facing: step.facing, ease: 'via' })),
  { ...step, ease: 'via' },
];

/**
 * Checks the move from where the arm is to `step`, and finds a way round when
 * it's blocked. Moves into and out of contact with a case can't go round:
 * they must be straight up and down, so a blocked one is stuck.
 */
const verify = (
  step: Step,
  joints: Joints,
  carried: Carried | undefined,
  solids: Solid[]
): Verdict => {
  const pad = forward(joints);
  const clear = step.ease
    ? straight(pad, step.target, step.facing, carried, solids)
    : swept(
        joints,
        solve(step.target, joints.grip, step.facing),
        carried,
        solids
      );

  if (clear) {
    return { kind: 'go' };
  }

  if (step.ease === 'arrive' || step.ease === 'leave') {
    return { kind: 'stuck' };
  }

  const points = route(
    pad,
    step.target,
    step.facing,
    carried,
    solids,
    Math.min(pad.y, step.target.y) - DIP
  );

  return points
    ? { kind: 'round', steps: around(points, step) }
    : { kind: 'stuck' };
};

/** Where a held case was picked up, to take it back there if it can't go on. */
type Origin = { top: Point; facing: number; lift: number };

/**
 * The moves that take a held case back to where it was picked up and set it
 * down there: round anything in the way to above it, down, let go, and up;
 * or, if it's still right above that spot, straight back down. Nothing when
 * that way is blocked too.
 */
const retreat = (
  joints: Joints,
  origin: Origin,
  carried: Carried | undefined,
  solids: Solid[]
): Step[] | null => {
  const pad = forward(joints);

  // Still over where it came from: set it straight back down.
  if (
    Math.hypot(pad.x - origin.top.x, pad.z - origin.top.z) < 0.01 &&
    straight(pad, origin.top, origin.facing, carried, solids)
  ) {
    return [
      {
        target: origin.top,
        facing: origin.facing,
        action: 'place',
        ease: 'arrive',
      },
    ];
  }

  const above = {
    ...origin.top,
    y: Math.max(pad.y, origin.top.y + origin.lift),
  };
  const points = route(
    pad,
    above,
    origin.facing,
    carried,
    solids,
    Math.min(pad.y, above.y) - DIP
  );

  if (!points || !straight(above, origin.top, origin.facing, carried, solids)) {
    return null;
  }

  return [
    ...around(points, { target: above, facing: origin.facing }),
    {
      target: origin.top,
      facing: origin.facing,
      action: 'place',
      ease: 'arrive',
    },
    { target: above, facing: origin.facing, ease: 'leave' },
  ];
};

export { retreat, verify };
export type { Origin, Verdict };
