import { LINK, REACH, REST, SPEED } from './constants';

type Point = { x: number; y: number; z: number };

/**
 * Joint angles in radians. `shoulder` is pitch up from level, `elbow` is the
 * bend down from straight, `wrist` is relative to the forearm, and `roll`
 * turns the gripper about its own vertical axis. `grip` is the vacuum, from 0
 * (off) to 1 (holding).
 */
type Joints = {
  yaw: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  roll: number;
  grip: number;
};

/**
 * The pad is a rectangle, so it lines up the same turned half a turn either
 * way. This picks the roll within a quarter turn of straight.
 */
const quarter = (angle: number) =>
  angle - Math.PI * Math.round(angle / Math.PI);

/** The pad's heading on the floor plan, the way `rotation.y` turns. */
const bearing = ({ yaw, roll }: Joints) => yaw + roll;

/**
 * Joint angles that put the suction pad on `target` with the hand pointing
 * straight down, elbow up, and the pad turned to `facing` when one is given.
 * A target out of reach is pulled back onto the edge of the workspace, so the
 * arm always has an answer.
 */
const solve = (target: Point, grip: number, facing?: number): Joints => {
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
    roll: facing === undefined ? 0 : quarter(facing - yaw),
    grip,
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

const approach = (from: number, to: number, limit: number) =>
  from + Math.min(limit, Math.max(-limit, to - from));

/** Shortest signed turn from one heading to another, in `[-π, π]`. */
const shortest = (from: number, to: number) =>
  Math.atan2(Math.sin(to - from), Math.cos(to - from));

/** Turns a point about the vertical axis the way `rotation.y` does. */
const turn = ({ x, y, z }: Point, angle: number): Point => ({
  x: x * Math.cos(angle) + z * Math.sin(angle),
  y,
  z: -x * Math.sin(angle) + z * Math.cos(angle),
});

/**
 * Moves each joint toward `goal` by no more than its speed allows in `delta`
 * seconds. The lag this gives is what a motor does, and it is what the twin
 * will have to predict.
 *
 * The shoulder, elbow and wrist move together, each the same share of the
 * way, so the pad stays on its path. Moved apart, near full reach the elbow
 * has far more to turn than the shoulder, and the pad sags until it catches up.
 */
const step = (current: Joints, goal: Joints, delta: number): Joints => {
  const limb = (['shoulder', 'elbow', 'wrist'] as const).map(
    (joint) => goal[joint] - current[joint]
  );
  const share = Math.min(
    1,
    (SPEED.joint * delta) / Math.max(...limb.map(Math.abs), 1e-9)
  );

  return {
    yaw: approach(
      current.yaw,
      current.yaw + shortest(current.yaw, goal.yaw),
      SPEED.yaw * delta
    ),
    shoulder: current.shoulder + limb[0] * share,
    elbow: current.elbow + limb[1] * share,
    wrist: current.wrist + limb[2] * share,
    roll: approach(current.roll, goal.roll, SPEED.joint * delta),
    grip: approach(current.grip, goal.grip, SPEED.grip * delta),
  };
};

/**
 * Where the arm rests: the pad up and in front of the base, clear of the
 * pallets, the belt and the obstacles, with room to move off in any direction.
 */
const HOME = solve(REST, 0, 0);

export { HOME, bearing, ceiling, forward, solve, step, turn };
export type { Joints, Point };
