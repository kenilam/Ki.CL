import type { Pose } from './geometry';

/**
 * How the pad moves to a pose. `arrive` and `leave` are the slow straight
 * moves into and out of contact with a case; `swing` travels at speed.
 */
type Ease = 'arrive' | 'leave' | 'swing';

/**
 * One thing the arm does, in order. The arm knows nothing about cases beyond
 * their ids. A `gate` holds the arm there until the hub opens it: how it
 * waits for the belt to clear without knowing there is a belt.
 */
type Instruction =
  | { do: 'move'; to: Pose; ease: Ease }
  | { do: 'pick'; case: string }
  | { do: 'place'; case: string }
  | { do: 'wait'; seconds: number }
  | { do: 'gate'; id: string };

/**
 * A plan for one arm. The hub sends a whole plan each time; a newer revision
 * replaces whatever the arm still had to do. `holding` is what the hub thinks
 * the arm has on the pad, and the arm rejects a plan that gets it wrong.
 * `known` are the obstacles the hub planned around, so seeing one of them
 * doesn't stop the arm.
 */
type Plan = {
  arm: string;
  revision: number;
  holding: string | null;
  known: string[];
  instructions: Instruction[];
};

export type { Ease, Instruction, Plan };
