import type { Plan } from './plan';

/**
 * What the hub sends an arm. Every command names its arm, so one hub can
 * drive many over the same wire. `stop` is the emergency stop: motors off at
 * once, and nothing runs again until `reset`. `hold` is the gentle one: the
 * arm brakes and waits for `resume` or a new plan. `open` lets the arm past
 * a gate in its plan; sent early, it's remembered until the arm gets there.
 */
type Command =
  | { type: 'load'; arm: string; plan: Plan }
  | { type: 'hold'; arm: string }
  | { type: 'resume'; arm: string }
  | { type: 'stop'; arm: string }
  | { type: 'reset'; arm: string }
  | { type: 'open'; arm: string; gate: string };

export type { Command };
