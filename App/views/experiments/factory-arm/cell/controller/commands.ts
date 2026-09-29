// Protocol
import type { Command, Plan } from '../protocol';

// Partials
import { rest } from './servo';
import { adopt, type Arm, gripping, say } from './state';

/**
 * Takes a plan from the hub, or says why not. A plan that arrives mid-grip
 * waits for the grip to settle; one that arrives during an operator's hold
 * is taken but stays held, while a sensor's hold ends with a new plan.
 */
const load = (arm: Arm, plan: Plan) => {
  const refuse = (reason: string) =>
    say(arm, {
      type: 'rejected',
      arm: arm.id,
      revision: plan.revision,
      reason,
    });
  const latest = arm.pending?.revision ?? arm.revision;

  if (plan.arm !== arm.id) {
    return refuse(`addressed to ${plan.arm}`);
  }

  if (arm.state === 'stopped') {
    return refuse('stopped: reset first');
  }

  if (plan.revision <= latest) {
    return refuse(`revision ${plan.revision} is not after ${latest}`);
  }

  if (plan.holding !== arm.holding) {
    return refuse(
      arm.holding ? `holding case ${arm.holding}` : 'holding nothing'
    );
  }

  if (gripping(arm)) {
    arm.pending = plan;

    return;
  }

  const paused = arm.state === 'held' && arm.cause === 'command';

  adopt(arm, plan);

  if (paused && arm.state === 'running') {
    arm.state = 'held';
  }
};

const command = (arm: Arm, received: Command) => {
  if (received.arm !== arm.id) {
    return;
  }

  switch (received.type) {
    case 'load':
      return load(arm, received.plan);
    case 'hold':
      if (arm.state === 'running') {
        arm.state = 'held';
        arm.cause = 'command';
        say(arm, { type: 'held', arm: arm.id, cause: 'command', seen: [] });
      }

      return;
    case 'resume':
      if (arm.state === 'held') {
        arm.state =
          arm.plan && arm.step < arm.plan.instructions.length
            ? 'running'
            : 'idle';
        say(arm, { type: 'resumed', arm: arm.id });
      }

      return;
    case 'stop':
      // The emergency stop: brakes on, motors off, and the plan is gone with it.
      arm.state = 'stopped';
      arm.drive = rest(arm.drive.joints);
      arm.plan = null;
      arm.pending = null;
      arm.segment = null;
      say(arm, { type: 'stopped', arm: arm.id });

      return;
    case 'reset':
      if (arm.state === 'stopped') {
        arm.state = 'idle';
        say(arm, { type: 'reset', arm: arm.id });
      }

      return;
    case 'open':
      arm.opened.add(received.gate);
  }
};

export { command };
