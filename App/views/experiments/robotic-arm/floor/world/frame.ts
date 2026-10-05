import { toPoint } from 'arm/grid';
import { forward, type Vector } from 'arm/robot';

import type { Arm } from './types';

/*
 * Between the floor and an arm's own frame: the arm's origin is its cell's
 * centre on the floor, turned by the arm's heading about y, the same turn
 * the scene graph gives it.
 */

const toArm = (arm: Arm, { x, y, z }: Vector): Vector => {
  const origin = toPoint(arm.cell);
  const dx = x - origin.x;
  const dz = z - origin.z;
  const cos = Math.cos(arm.heading);
  const sin = Math.sin(arm.heading);

  return { x: dx * cos - dz * sin, y, z: dx * sin + dz * cos };
};

const toFloor = (arm: Arm, { x, y, z }: Vector): Vector => {
  const origin = toPoint(arm.cell);
  const cos = Math.cos(arm.heading);
  const sin = Math.sin(arm.heading);

  return {
    x: origin.x + x * cos + z * sin,
    y,
    z: origin.z - x * sin + z * cos,
  };
};

/** The pad's face on the floor, and its yaw there. */
const padOf = (arm: Arm) => {
  const { at, yaw } = forward(arm.pose);

  return { at: toFloor(arm, at), yaw: yaw + arm.heading };
};

export { padOf, toArm, toFloor };
