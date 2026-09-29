// Protocol
import type { Joints } from '../protocol';

// Model
import { nearest, shortest } from '../model/kinematics';

// Constants
import { ACCEL, SETTLED, SPEED } from './constants';

/** The motors' state: where each joint is, how fast it turns, and the last goal it was given. */
type Drive = { joints: Joints; velocity: Joints; goal: Joints | null };

const NAMES = ['yaw', 'shoulder', 'elbow', 'wrist', 'roll', 'grip'] as const;

const ZERO: Joints = {
  yaw: 0,
  shoulder: 0,
  elbow: 0,
  wrist: 0,
  roll: 0,
  grip: 0,
};

/** Each joint's speed and acceleration caps. The vacuum has no inertia. */
const limits = (name: keyof Joints) =>
  name === 'yaw'
    ? { speed: SPEED.yaw, accel: ACCEL.yaw }
    : name === 'grip'
      ? { speed: SPEED.grip, accel: Infinity }
      : { speed: SPEED.joint, accel: ACCEL.joint };

const clamp = (value: number, limit: number) =>
  Math.min(limit, Math.max(-limit, value));

/** The turn from `from` to `to` for a joint: the short way round for the turret, and for the pad's roll, which lines up the same either way round. */
const gap = (name: keyof Joints, from: number, to: number) =>
  name === 'yaw'
    ? shortest(from, to)
    : name === 'roll'
      ? nearest(from, to)
      : to - from;

/** Motors at rest at `joints`. */
const rest = (joints: Joints): Drive => ({
  joints,
  velocity: ZERO,
  goal: null,
});

/**
 * One servo step: each joint moves toward `goal` within its speed and
 * acceleration caps. The goal's own motion since last step is fed forward, so
 * a moving setpoint is tracked without lag; on top of that, each joint closes
 * its gap at the speed it can still brake from, so it arrives without
 * overshoot when the setpoint stops.
 */
const servo = (drive: Drive, goal: Joints, dt: number): Drive => {
  const joints = { ...drive.joints };
  const velocity = { ...drive.velocity };

  for (const name of NAMES) {
    const { speed, accel } = limits(name);
    const left = gap(name, drive.joints[name], goal[name]);
    const feed = drive.goal ? gap(name, drive.goal[name], goal[name]) / dt : 0;
    // No inertia: the joint just goes, as fast as it may. Otherwise it closes the gap at the speed it can still brake from.
    const close =
      accel === Infinity
        ? left / dt
        : Math.sign(left) * Math.sqrt(2 * accel * Math.abs(left));
    const want = clamp(feed + close, speed);
    const next =
      accel === Infinity
        ? want
        : drive.velocity[name] + clamp(want - drive.velocity[name], accel * dt);
    const move = next * dt;

    velocity[name] = next;
    joints[name] = drive.joints[name] + move;
  }

  return { joints, velocity, goal };
};

/** One step of braking: every joint sheds speed as fast as it may, and the goal is forgotten. */
const brake = (drive: Drive, dt: number): Drive => {
  const joints = { ...drive.joints };
  const velocity = { ...drive.velocity };

  for (const name of NAMES) {
    const { accel } = limits(name);
    const next =
      accel === Infinity
        ? 0
        : drive.velocity[name] - clamp(drive.velocity[name], accel * dt);

    velocity[name] = next;
    joints[name] = drive.joints[name] + next * dt;
  }

  return { joints, velocity, goal: null };
};

/** Whether every joint is at its goal, to within `within` radians. */
const settled = (joints: Joints, goal: Joints, within = SETTLED) =>
  NAMES.every((name) => Math.abs(gap(name, joints[name], goal[name])) < within);

export { brake, rest, servo, settled };
export type { Drive };
