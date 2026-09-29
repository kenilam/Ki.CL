// Model
import { solve } from '../model/kinematics';

// Partials
import { advance, begin, finished, pose } from './motion';
import { sense } from './sensors';
import { servo, settled } from './servo';
import { adopt, type Arm, say } from './state';

// Constants
import { PASSING, SCAN } from './constants';

/** The instruction under way is done: on to the next, or to a plan that was waiting. */
const complete = (arm: Arm) => {
  if (!arm.plan) {
    return;
  }

  say(arm, {
    type: 'progress',
    arm: arm.id,
    revision: arm.plan.revision,
    step: arm.step,
  });
  arm.step += 1;
  arm.segment = null;
  arm.waited = 0;

  if (arm.pending) {
    return adopt(arm, arm.pending);
  }

  if (arm.step >= arm.plan.instructions.length) {
    arm.state = 'idle';
    say(arm, { type: 'done', arm: arm.id, revision: arm.plan.revision });
  }
};

/** Reads the sensors: anything seen that the plan didn't know of holds the arm. */
const watch = (arm: Arm) => {
  const known = new Set(arm.plan?.known);
  const seen = new Set<string>();

  sense(arm.drive.joints, arm.boxes).forEach((ids) =>
    ids.forEach((id) => known.has(id) || seen.add(id))
  );

  if (seen.size) {
    arm.state = 'held';
    arm.cause = 'sensor';
    say(arm, { type: 'held', arm: arm.id, cause: 'sensor', seen: [...seen] });
  }
};

/** One running tick: the instruction under way moves the joints a step, then the sensors are read. */
const run = (arm: Arm, dt: number) => {
  const instruction = arm.plan?.instructions[arm.step];

  if (!instruction) {
    return;
  }

  switch (instruction.do) {
    case 'move':
      arm.segment ??= begin(arm.setpoint, instruction.to, instruction.ease);
      arm.segment = advance(arm.segment, dt);
      arm.setpoint = pose(arm.segment);
      arm.goal = solve(arm.setpoint.at, arm.goal.grip, arm.setpoint.facing);
      arm.drive = servo(arm.drive, arm.goal, dt);

      // A swing into another move passes through; anything else is reached exactly.
      if (
        finished(arm.segment) &&
        settled(
          arm.drive.joints,
          arm.goal,
          instruction.ease === 'swing' &&
            arm.plan?.instructions[arm.step + 1]?.do === 'move'
            ? PASSING
            : undefined
        )
      ) {
        complete(arm);
      }

      break;
    case 'pick':
    case 'place':
      arm.goal = { ...arm.goal, grip: instruction.do === 'pick' ? 1 : 0 };
      arm.drive = servo(arm.drive, arm.goal, dt);

      if (settled(arm.drive.joints, arm.goal)) {
        arm.holding = instruction.do === 'pick' ? instruction.case : null;
        complete(arm);
      }

      break;
    case 'wait':
      arm.drive = servo(arm.drive, arm.goal, dt);
      arm.waited += dt;

      if (arm.waited >= instruction.seconds) {
        complete(arm);
      }

      break;
    case 'gate':
      arm.drive = servo(arm.drive, arm.goal, dt);

      if (arm.opened.has(instruction.id)) {
        complete(arm);
      }
  }

  arm.scanned += dt;

  if (arm.scanned >= SCAN) {
    arm.scanned = 0;
    watch(arm);
  }
};

export { run };
