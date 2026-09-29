// Protocol
import type { Telemetry } from '../protocol';

// Grid
import type { Hex } from '../grid/hex';
import type { Vector } from '../grid/layout';

// Spec
import type { Case } from './spec';

type Level = 'confirm' | 'error' | 'info' | 'warning';

/** A case riding a belt: which one, how far along it from this arm, its heading, and the cell it's bound for. */
type Rider = {
  id: string;
  own: Case;
  belt: string;
  distance: number;
  yaw: number;
  to: Hex | null;
};

/**
 * What the station tells whoever watches it: notes for a log, each a
 * headline and, when there's more to say, a detail; what to
 * light, and the cell as it stands whenever a case moves. Telemetry passes
 * straight through from the arm. `placed` is a case set on a belt, for the
 * hub to carry along it; `pallet` is one of the cell's own set down on a
 * slot, for the cases that arrive here; `idle` says the arm has nothing
 * to do, or has again. `struck` names the obstacles standing in the arm
 * as it is posed, or none once they are moved clear.
 */
type Event =
  | { type: 'note'; text: string; level: Level; detail?: string }
  | { type: 'refuse'; target: string; across: string[] }
  | { type: 'unpark'; target: string }
  | { type: 'alarm' }
  | { type: 'calm' }
  | { type: 'struck'; obstacles: string[] }
  | { type: 'telemetry'; report: Telemetry }
  | { type: 'cell'; cases: Case[]; holding: Case | null; riders: Rider[] }
  | { type: 'placed'; rider: Rider }
  | { type: 'pallet'; at: Vector }
  | { type: 'idle'; idle: boolean };

export type { Event, Level, Rider };
