// Kinematics
import type { Joints, Point } from './kinematics';

// Constants
import { LINK } from './constants';

/** A link's origin and its x, y and z directions, in world space. */
type Frame = { origin: Point; x: Point; y: Point; z: Point };

const add = (a: Point, b: Point, scale = 1): Point => ({
  x: a.x + b.x * scale,
  y: a.y + b.y * scale,
  z: a.z + b.z * scale,
});

/** A frame pitched by `angle` about its x, the way `rotation.x = -angle` does. */
const pitched = (
  origin: Point,
  across: Point,
  out: Point,
  angle: number
): Frame => ({
  origin,
  x: across,
  y: add({ x: 0, y: Math.cos(angle), z: 0 }, out, -Math.sin(angle)),
  z: add({ x: 0, y: Math.sin(angle), z: 0 }, out, Math.cos(angle)),
});

/**
 * Every link's frame for a set of joint angles, matching the groups in
 * `arm/index.tsx`. Collision checks and the sensors read these rather than
 * the scene, so a pose can be tested before the arm is ever sent there.
 */
const frames = (joints: Joints) => {
  const out = { x: Math.sin(joints.yaw), y: 0, z: Math.cos(joints.yaw) };
  const across = { x: Math.cos(joints.yaw), y: 0, z: -Math.sin(joints.yaw) };
  const turret: Frame = {
    origin: { x: 0, y: 0, z: 0 },
    x: across,
    y: { x: 0, y: 1, z: 0 },
    z: out,
  };

  const upper = pitched(
    { x: 0, y: LINK.base, z: 0 },
    across,
    out,
    joints.shoulder
  );
  const fore = pitched(
    add(upper.origin, upper.z, LINK.upper),
    across,
    out,
    joints.shoulder - joints.elbow
  );
  const wrist = pitched(
    add(fore.origin, fore.z, LINK.fore),
    across,
    out,
    joints.shoulder - joints.elbow + joints.wrist
  );

  // The gripper turns about the wrist's z by `-roll`, as `gripper.tsx` does.
  const cos = Math.cos(-joints.roll);
  const sin = Math.sin(-joints.roll);
  const gripper: Frame = {
    origin: wrist.origin,
    x: add(
      { x: wrist.x.x * cos, y: wrist.x.y * cos, z: wrist.x.z * cos },
      wrist.y,
      sin
    ),
    y: add(
      { x: wrist.y.x * cos, y: wrist.y.y * cos, z: wrist.y.z * cos },
      wrist.x,
      -sin
    ),
    z: wrist.z,
  };

  return { fore, gripper, turret, upper, wrist };
};

/** A point given in a frame's own axes, in world space. */
const place = (frame: Frame, [x, y, z]: [number, number, number]): Point =>
  add(add(add(frame.origin, frame.x, x), frame.y, y), frame.z, z);

/** A direction given in a frame's own axes, in world space. */
const aim = (frame: Frame, [x, y, z]: [number, number, number]): Point =>
  add(
    add({ x: frame.x.x * x, y: frame.x.y * x, z: frame.x.z * x }, frame.y, y),
    frame.z,
    z
  );

export { add, aim, frames, place };
export type { Frame };
