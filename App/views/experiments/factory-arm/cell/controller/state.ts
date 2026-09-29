// Protocol
import type { Box, Joints, Plan, Pose, Report, State } from '../protocol';

// Model
import { HOME, bearing, forward } from '../model/kinematics';

// Partials
import type { Segment } from './motion';
import { type Drive, rest } from './servo';

/** Everything one controller box keeps between ticks. Mutated in place: it runs a thousand times a second. */
type Arm = {
  id: string;
  state: State;
  /** Why the arm is held: the operator, or its own sensors. */
  cause: 'command' | 'sensor';
  drive: Drive;
  goal: Joints;
  /** The pad pose last sent to the joints; a move starts from here. */
  setpoint: Pose;
  plan: Plan | null;
  /** A plan that arrived mid-grip, adopted once the grip settles. */
  pending: Plan | null;
  /** The last revision accepted, kept past a stop so a stale plan stays stale. */
  revision: number;
  step: number;
  segment: Segment | null;
  waited: number;
  holding: string | null;
  /** Gates the hub has opened in the plan under way. */
  opened: Set<string>;
  /** What is physically around the arm, for its sensors to meet. */
  boxes: Box[];
  scanned: number;
  clock: number;
  reports: Report[];
};

const boot = (id: string): Arm => ({
  id,
  state: 'idle',
  cause: 'command',
  drive: rest(HOME),
  goal: HOME,
  setpoint: { at: forward(HOME), facing: bearing(HOME) },
  plan: null,
  pending: null,
  revision: 0,
  step: 0,
  segment: null,
  waited: 0,
  holding: null,
  opened: new Set(),
  boxes: [],
  scanned: 0,
  clock: 0,
  reports: [],
});

const say = (arm: Arm, report: Report) => arm.reports.push(report);

/** Whether the arm is in the middle of taking or letting go of a case. */
const gripping = ({ plan, state, step }: Arm) => {
  const doing = plan?.instructions[step];

  return state === 'running' && (doing?.do === 'pick' || doing?.do === 'place');
};

/** Takes `plan` as the one to run, from its first instruction. */
const adopt = (arm: Arm, plan: Plan) => {
  arm.plan = plan;
  arm.pending = null;
  arm.revision = plan.revision;
  arm.step = 0;
  arm.segment = null;
  arm.waited = 0;
  arm.opened.clear();
  arm.state = plan.instructions.length ? 'running' : 'idle';
  say(arm, { type: 'loaded', arm: arm.id, revision: plan.revision });

  if (!plan.instructions.length) {
    say(arm, { type: 'done', arm: arm.id, revision: plan.revision });
  }
};

export { adopt, boot, gripping, say };
export type { Arm };
