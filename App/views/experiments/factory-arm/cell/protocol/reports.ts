import type { Pose } from './geometry';
import type { Joints } from './joints';

type State = 'idle' | 'running' | 'held' | 'stopped';

/** Where the arm is, sent at a steady rate whether or not anything happened. */
type Telemetry = {
  type: 'telemetry';
  arm: string;
  /** Seconds since the controller booted. */
  at: number;
  state: State;
  revision: number | null;
  /** The instruction under way, or the count when the plan is done. */
  step: number;
  joints: Joints;
  pad: Pose;
  holding: string | null;
};

/**
 * What an arm tells the hub. `progress` is one instruction finished; `held`
 * says why the arm stopped moving, with the obstacles its sensors saw that
 * the plan didn't know of.
 */
type Report =
  | Telemetry
  | { type: 'loaded'; arm: string; revision: number }
  | { type: 'rejected'; arm: string; revision: number; reason: string }
  | { type: 'progress'; arm: string; revision: number; step: number }
  | { type: 'done'; arm: string; revision: number }
  | { type: 'held'; arm: string; cause: 'command' | 'sensor'; seen: string[] }
  | { type: 'resumed'; arm: string }
  | { type: 'stopped'; arm: string }
  | { type: 'reset'; arm: string };

export type { Report, State, Telemetry };
