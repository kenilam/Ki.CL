// Protocol
import type { Joints, Point } from '../protocol';

// Constants
import { LINK, REACH, REST } from './constants';

/**
 * The pad is a rectangle, so it lines up the same turned half a turn either
 * way. This picks the roll within a quarter turn of straight.
 */
const quarter = (angle: number) =>
  angle - Math.PI * Math.round(angle / Math.PI);

/** The pad's heading on the floor plan, the way `rotation.y` turns. */
const bearing = ({ yaw, roll }: Joints) => yaw + roll;

/** Shortest signed turn from one heading to another, in `[-π, π]`. */
const shortest = (from: number, to: number) =>
  Math.atan2(Math.sin(to - from), Math.cos(to - from));

/** Shortest turn of the pad from one roll to another, in `[-π/2, π/2]`: half a turn round lines it up the same. */
const nearest = (from: number, to: number) => shortest(2 * from, 2 * to) / 2;

/**
 * Joint angles that put the suction pad on `target` with the hand pointing
 * straight down, elbow up, and the pad turned to `facing`. A target out of
 * reach is pulled back onto the edge of the workspace, so the arm always has
 * an answer.
 */
const solve = (target: Point, grip: number, facing: number): Joints => {
  const yaw = Math.atan2(target.x, target.z);

  // The hand points down, so the wrist sits one hand length above the target.
  let radius = Math.max(Math.hypot(target.x, target.z), REACH.min);
  let height = Math.max(target.y, REACH.floor) + LINK.hand - LINK.base;

  const distance = Math.hypot(radius, height);
  const reach = LINK.upper + LINK.fore - REACH.slack;

  if (distance > reach) {
    radius *= reach / distance;
    height *= reach / distance;
  }

  const cosine =
    (radius ** 2 + height ** 2 - LINK.upper ** 2 - LINK.fore ** 2) /
    (2 * LINK.upper * LINK.fore);
  const elbow = Math.acos(Math.min(1, Math.max(-1, cosine)));
  const shoulder =
    Math.atan2(height, radius) +
    Math.atan2(
      LINK.fore * Math.sin(elbow),
      LINK.upper + LINK.fore * Math.cos(elbow)
    );

  return {
    yaw,
    shoulder,
    elbow,
    wrist: -Math.PI / 2 - shoulder + elbow,
    roll: quarter(facing - yaw),
    grip,
  };
};

/** Where the suction pad is for a set of joint angles. */
const forward = ({ yaw, shoulder, elbow, wrist }: Joints): Point => {
  const fore = shoulder - elbow;
  const hand = fore + wrist;
  const radius =
    LINK.upper * Math.cos(shoulder) +
    LINK.fore * Math.cos(fore) +
    LINK.hand * Math.cos(hand);

  return {
    x: radius * Math.sin(yaw),
    y:
      LINK.base +
      LINK.upper * Math.sin(shoulder) +
      LINK.fore * Math.sin(fore) +
      LINK.hand * Math.sin(hand),
    z: radius * Math.cos(yaw),
  };
};

/**
 * The highest the pad can reach, hand down, above a spot on the floor plan;
 * minus infinity where it can't reach at all.
 */
const ceiling = ({ x, z }: Pick<Point, 'x' | 'z'>) => {
  const radius = Math.max(Math.hypot(x, z), REACH.min);
  const reach = LINK.upper + LINK.fore - REACH.slack;

  return radius >= reach
    ? -Infinity
    : LINK.base - LINK.hand + Math.sqrt(reach ** 2 - radius ** 2);
};

/** Turns a point about the vertical axis the way `rotation.y` does. */
const turn = ({ x, y, z }: Point, angle: number): Point => ({
  x: x * Math.cos(angle) + z * Math.sin(angle),
  y,
  z: -x * Math.sin(angle) + z * Math.cos(angle),
});

/**
 * `point` pulled just inside the workspace: out from the turret, down from
 * the reach ceiling, up off the floor. A plan from where the pad is starts
 * here, since the pad can sit a hair outside after a fast move.
 */
const inside = (point: Point, margin = 0.02): Point => {
  const radius = Math.hypot(point.x, point.z);
  const least = REACH.min + margin;
  const scaled =
    radius < least
      ? {
          x: (point.x / (radius || 1)) * least,
          z: (point.z / (radius || 1)) * least,
        }
      : { x: point.x, z: point.z };
  const top = ceiling(scaled) - margin;

  return {
    ...scaled,
    y: Math.min(
      Number.isFinite(top) ? top : point.y,
      Math.max(REACH.floor + margin, point.y)
    ),
  };
};

/** Where the arm rests: the pad up and in front of the base. */
const HOME = solve(REST, 0, 0);

export {
  HOME,
  bearing,
  ceiling,
  forward,
  inside,
  nearest,
  shortest,
  solve,
  turn,
};
