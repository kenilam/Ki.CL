// Kinematics
import {
  ceiling,
  type Point,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/scene/constants';

/** Height the carried case's underside keeps above anything it passes over. */
const CLEARANCE = 0.25;

/**
 * `pick` and `place` happen on arrival. `clear` holds the arm where it is
 * until the drop point on the belt is free of the last case. `recover` plans
 * the rest of the job again after the carried case struck something.
 */
type Action = 'pick' | 'place' | 'clear' | 'recover';

/**
 * A waypoint. With `ease`, the pad travels to it in a straight line; without,
 * each joint turns straight to its goal, which is faster but lets the pad
 * swing wide on the way. `arrive` slows down into contact; `leave` starts
 * slow out of it; `via` is a waypoint on a way round an obstacle, taken at a
 * steady speed. `facing` is the pad's heading there, reached before the
 * waypoint counts as arrived.
 */
type Step = {
  target: Point;
  facing: number;
  action?: Action;
  ease?: 'arrive' | 'leave' | 'via';
};

/**
 * Straight-line speeds in metres per second, and the distance from contact
 * over which the pad eases between them. `via` is the speed round obstacles.
 */
const LINE = { fast: 0.5, near: 0.12, slow: 0.06, via: 0.6 };

const DROP = { x: CONVEYOR.x, y: CONVEYOR.height, z: CONVEYOR.drop };

/**
 * Where a case is set down: the surface point under its centre, the heading to
 * set it at, and whether to wait for the spot to clear first.
 */
type Destination = { point: Point; facing: number; wait: boolean };

/**
 * The moves for one case: over it, down to pick, up, across to where it goes,
 * down to place, and up again.
 *
 * Down and up are straight lines, so the case leaves the stack vertically
 * through the column `blocked` has already checked is clear, and doesn't
 * swing into its neighbours. Only the moves at travel height turn joints
 * freely: there, the case hangs above the tallest thing in the cell.
 *
 * The pad squares up to the case on the way over, so it is aligned before it
 * goes down, and turns the case on the way across to the heading it is set
 * down at.
 */
const plan = (
  top: Point,
  heading: number,
  size: [number, number, number],
  highest: number,
  destination: Destination
): Step[] => {
  const height = size[1];
  const { point, facing, wait } = destination;
  const travel = lift(Math.max(highest, point.y), height, [top, point]);

  return [
    { target: { ...top, y: travel }, facing: heading },
    { target: top, facing: heading, action: 'pick', ease: 'arrive' },
    { target: { ...top, y: travel }, facing: heading, ease: 'leave' },
    {
      target: { ...point, y: travel },
      facing,
      action: wait ? 'clear' : undefined,
    },
    {
      target: { ...point, y: point.y + height },
      facing,
      action: 'place',
      ease: 'arrive',
    },
    { target: { ...point, y: travel }, facing, ease: 'leave' },
  ];
};

/**
 * The belt as a destination: its drop point, the case's long side along the
 * belt, and a wait until the last case has moved on.
 */
const belt = (size: [number, number, number]): Destination => ({
  point: DROP,
  facing: size[0] >= size[2] ? Math.PI / 2 : 0,
  wait: true,
});

/** Room kept under the arm's reach ceiling, in metres. */
const HEADROOM = 0.02;

/**
 * The height the pad travels at with a case of `height` hanging under it:
 * clear of `highest`, but no higher than the arm can reach above each of
 * `over`, so a lift at the edge of its reach still goes straight up.
 */
const lift = (highest: number, height: number, over: Point[]) =>
  Math.min(
    highest + height + CLEARANCE,
    ...over.map((spot) => ceiling(spot) - HEADROOM)
  );

/**
 * How fast to move along a straight line, given how far the pad has come and
 * how far there is to go. Contact is at the end when arriving and at the
 * start when leaving; within `LINE.near` of it the speed eases down to
 * `LINE.slow`, so the pad meets a case gently and lifts it out gently.
 */
const speed = (ease: Step['ease'], travelled: number, remaining: number) => {
  if (ease === 'via') {
    return LINE.via;
  }

  const gap = ease === 'arrive' ? remaining : travelled;
  const share = Math.min(1, Math.max(0, gap / LINE.near));
  const smooth = share * share * (3 - 2 * share);

  return LINE.slow + (LINE.fast - LINE.slow) * smooth;
};

/** The point `distance` along the line from `from` to `to`, stopping at `to`. */
const along = (from: Point, to: Point, distance: number): Point => {
  const length = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z);
  const share = length ? Math.min(1, distance / length) : 1;

  return {
    x: from.x + (to.x - from.x) * share,
    y: from.y + (to.y - from.y) * share,
    z: from.z + (to.z - from.z) * share,
  };
};

export { CLEARANCE, DROP, along, belt, lift, plan, speed };
export type { Destination, Step };
