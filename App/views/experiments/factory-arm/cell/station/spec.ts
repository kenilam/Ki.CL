// Protocol
import type { Box, Ease, Point } from '../protocol';

/**
 * A case as the station knows it. `size` is its extent along x, up and
 * along z as it stands, already turned for a quarter turn; `yaw` is any
 * other turn, as a case comes off a belt. `at` is its centre.
 */
type Case = {
  id: string;
  mass: number;
  size: [number, number, number];
  at: Point;
  yaw: number;
};

/**
 * Everything the station plans with. Cases don't move unless the arm moves
 * them, so this is the cell exactly, not a guess at where physics left it.
 * `obstacles` are only the ones the station knows of.
 */
type World = {
  cases: Record<string, Case>;
  obstacles: Box[];
};

/** An axis-aligned box by its lowest and highest corners. */
type Extent = { min: Point; max: Point };

/** A pad waypoint: where the pad goes, the heading it faces there, how it gets there, and what it does on arrival. */
type Waypoint = {
  target: Point;
  facing: number;
  ease: Ease;
  action?: 'pick' | 'place';
};

/** Where a case can be set down: its centre, the pad's heading there, and the queued cases it would bury. */
type Spot = { at: Point; facing: number; buries: string[] };

/** One case moved: to the buffer or a belt by id, from where to where, and the waypoints that do it. */
type Move = {
  id: string;
  to: string;
  from: Point;
  at: Point;
  facing: number;
  waypoints: Waypoint[];
};

/** Why a plan can't be made: which case, what for, and the obstacles in the way. */
type Refusal = {
  id: string;
  reason: 'reach' | 'room' | 'way';
  across: string[];
};

/** A move's destination when it isn't a belt: the buffer, or a pallet of this cell's own. */
const BUFFER = 'buffer';
const HERE = 'pallet';

/** Whether a move sets its case down in this cell rather than on a belt. */
const stays = (to: string) => to === BUFFER || to === HERE;

export { BUFFER, HERE, stays };
export type { Case, Extent, Move, Refusal, Spot, Waypoint, World };
