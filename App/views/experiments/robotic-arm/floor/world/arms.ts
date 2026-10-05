import { JOINTS } from 'arm/robot';

import { padOf } from './frame';
import { supportUnder } from './support';
import type { Arm, World } from './types';

/*
 * The arm's drives and vacuum. Each joint moves towards its commanded angle
 * no faster than its top speed and stops at its limits. With the vacuum on,
 * the pad seals on a case whose top it is touching; with it off, the case
 * drops onto whatever is under it.
 */

/** How close the pad must be to a case's top to seal on it, in metres. */
const SEAL = 0.03;

/**
 * The drives. The wrist is not driven on its own: as on a real palletizer, a
 * parallelogram links it to the shoulder and elbow, so it always turns by
 * their sum the other way and the pad stays level whatever a brain asks of it.
 */
const drive = (arm: Arm, dt: number) => {
  const target = arm.command?.target;

  JOINTS.forEach(({ max, min, name, speed }) => {
    const linked = -(arm.pose.shoulder + arm.pose.elbow);
    const want =
      name === 'wrist'
        ? linked
        : Math.min(max, Math.max(min, target?.[name] ?? arm.pose[name]));
    const step =
      name === 'wrist'
        ? want - arm.pose[name]
        : Math.max(-speed * dt, Math.min(speed * dt, want - arm.pose[name]));

    arm.pose[name] += step;
    arm.velocity[name] = dt ? step / dt : 0;
  });
};

const seal = (world: World, arm: Arm) => {
  const pad = padOf(arm);
  const found = world.cases.find(({ holder, position, size }) => {
    if (holder.kind === 'pad') {
      return false;
    }

    const top = position.y + size[1] / 2;

    return (
      Math.abs(pad.at.y - top) < SEAL &&
      Math.hypot(pad.at.x - position.x, pad.at.z - position.z) <
        Math.min(size[0], size[2]) / 2
    );
  });

  if (found) {
    found.holder = { kind: 'pad', arm: arm.id, yaw: found.heading - pad.yaw };
    arm.held = found.id;
  }
};

const release = (world: World, arm: Arm) => {
  const found = world.cases.find(({ id }) => id === arm.held);

  arm.held = null;

  if (found) {
    found.holder = supportUnder(world, found);
  }
};

const runArm = (world: World, arm: Arm, dt: number) => {
  drive(arm, dt);
  arm.vacuum = arm.command?.vacuum ?? arm.vacuum;

  if (arm.vacuum && !arm.held) {
    seal(world, arm);
  } else if (!arm.vacuum && arm.held) {
    release(world, arm);
  }
};

export { runArm };
