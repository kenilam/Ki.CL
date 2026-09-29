// Protocol
import type { Box, Command, Telemetry } from '../protocol';

// Model
import { bearing, forward } from '../model/kinematics';

// Partials
import { command } from './commands';
import { run } from './run';
import { brake } from './servo';
import { boot } from './state';

/**
 * One arm's controller box. It takes plans from the hub, drives the joints
 * toward each instruction in turn at a fixed tick, reads its own sensors on
 * the way, and reports back. It knows the arm's geometry and nothing about
 * the cell: `feed` tells it what is physically around it, standing in for
 * what the sensors would meet on a real arm.
 */
const create = ({ arm: id }: { arm: string }) => {
  const arm = boot(id);

  /** One servo tick of `dt` seconds. Held or idle, the joints brake; stopped, nothing moves. */
  const tick = (dt: number) => {
    arm.clock += dt;

    if (arm.state === 'running') {
      run(arm, dt);
    } else if (arm.state !== 'stopped') {
      arm.drive = brake(arm.drive, dt);
    }
  };

  const feed = (boxes: Box[]) => {
    arm.boxes = boxes;
  };

  /** The reports since last asked. */
  const drain = () => {
    const out = arm.reports;

    arm.reports = [];

    return out;
  };

  const telemetry = (): Telemetry => ({
    type: 'telemetry',
    arm: id,
    at: arm.clock,
    state: arm.state,
    revision: arm.plan?.revision ?? null,
    step: arm.step,
    joints: arm.drive.joints,
    pad: { at: forward(arm.drive.joints), facing: bearing(arm.drive.joints) },
    holding: arm.holding,
  });

  return {
    arm: id,
    command: (received: Command) => command(arm, received),
    drain,
    feed,
    telemetry,
    tick,
  };
};

type Controller = ReturnType<typeof create>;

export { create };
export type { Controller };
