// Kinematics
import {
  solve,
  type Joints,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Plan
import type { Step } from '@/views/experiments/factory-arm/scene/grasp/plan';

// Partials
import type { Carried } from './body';
import { verify } from './steer';

/**
 * Checks a whole job before any of it happens, from the pose `joints`, with
 * the obstacles the arm knows about: every move in turn, from where the last
 * one ends. A blocked move that can go round takes its way round; one that
 * can't fails the job, naming what was in the way.
 *
 * `carried` is the case as it will hang on the pad; it counts from the pick
 * on, or from the start when the arm already holds it.
 */
const ahead = (
  steps: Step[],
  joints: Joints,
  carried: Carried,
  solids: Solid[],
  holding = false
): { steps: Step[] } | { across: string[] } => {
  const planned: Step[] = [];
  const across = new Set<string>();
  let pose = joints;
  let held = holding;

  for (const step of steps) {
    const verdict = verify(step, pose, held ? carried : undefined, solids);

    if (verdict.kind === 'stuck') {
      return { across: [...new Set([...across, ...verdict.across])] };
    }

    if (verdict.kind === 'round') {
      verdict.across.forEach((id) => across.add(id));
      planned.push(...verdict.steps);
    } else {
      planned.push(step);
    }

    if (step.action === 'pick') held = true;
    if (step.action === 'place') held = false;

    pose = solve(step.target, held ? 1 : 0, step.facing);
  }

  return { steps: planned };
};

export { ahead };
