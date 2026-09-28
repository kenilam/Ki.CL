// Kinematics
import {
  forward,
  solve,
  step,
  type Joints,
  type Point,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Body
import { type Carried, collides, grazes } from './body';

/** Spacing of the poses tested along a straight move, in metres. */
const SAMPLE = 0.05;

/** Time step for playing a joint move forward, in seconds. */
const TICK = 1 / 30;

/** Grid the free-pose results are remembered on, in metres. */
const MEMO = 0.005;

/**
 * Checks for one facing, load and set of obstacles. Poses are remembered to
 * the nearest 5 mm, since a search tests the same ones many times over.
 */
const checker = (
  facing: number,
  carried: Carried | undefined,
  solids: Solid[]
) => {
  const memo = new Map<string, boolean>();

  /** Whether the pad can be at `point`, facing `facing`, clear of `solids`. */
  const free = (point: Point) => {
    const key = [point.x, point.y, point.z]
      .map((value) => Math.round(value / MEMO))
      .join(',');

    if (!memo.has(key)) {
      const joints = solve(point, 0, facing);
      const reached = forward(joints);

      // An out-of-reach point is solved to the nearest one the arm can reach.
      memo.set(
        key,
        Math.hypot(
          reached.x - point.x,
          reached.y - point.y,
          reached.z - point.z
        ) < 0.01 && !collides(joints, carried, solids)
      );
    }

    return memo.get(key) ?? false;
  };

  /** Whether a straight move of the pad is clear all the way. */
  const straight = (from: Point, to: Point) => {
    const length = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z);
    const count = Math.max(1, Math.ceil(length / SAMPLE));

    for (let index = 1; index <= count; index++) {
      const share = index / count;

      if (
        !free({
          x: from.x + (to.x - from.x) * share,
          y: from.y + (to.y - from.y) * share,
          z: from.z + (to.z - from.z) * share,
        })
      ) {
        return false;
      }
    }

    return true;
  };

  return { free, straight };
};

/** Whether a straight move of the pad is clear all the way. */
const straight = (
  from: Point,
  to: Point,
  facing: number,
  carried: Carried | undefined,
  solids: Solid[]
) => checker(facing, carried, solids).straight(from, to);

/**
 * Whether a joint move is clear all the way. The move is played forward with
 * the arm's own motion model, so the poses tested are the ones it will pass
 * through, not a straight line it won't follow.
 */
const swept = (
  joints: Joints,
  goal: Joints,
  carried: Carried | undefined,
  solids: Solid[]
) => {
  let current = joints;

  for (let index = 0; index < 600; index++) {
    current = step(current, goal, TICK);

    if (collides(current, carried, solids)) {
      return false;
    }

    // Headings a whole turn apart are the same, so the yaw is compared as an angle.
    const settled = (
      ['yaw', 'shoulder', 'elbow', 'wrist', 'roll'] as const
    ).every((joint) => {
      const gap = current[joint] - goal[joint];

      return Math.abs(Math.atan2(Math.sin(gap), Math.cos(gap))) < 1e-6;
    });

    if (settled) {
      return true;
    }
  }

  return true;
};

/**
 * Whether the arm's links stay clear of `solids` all along a straight move
 * of the pad, the gripper and what it carries aside.
 */
const overhead = (from: Point, to: Point, facing: number, solids: Solid[]) => {
  const length = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z);
  const count = Math.max(1, Math.ceil(length / SAMPLE));

  for (let index = 0; index <= count; index++) {
    const share = index / count;
    const joints = solve(
      {
        x: from.x + (to.x - from.x) * share,
        y: from.y + (to.y - from.y) * share,
        z: from.z + (to.z - from.z) * share,
      },
      0,
      facing
    );

    if (grazes(joints, solids).length) {
      return false;
    }
  }

  return true;
};

export { checker, overhead, straight, swept };
