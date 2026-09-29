// Grid
import type { Child } from '../grid/child';
import type { Hex } from '../grid/hex';

// Station
import type { Case } from '../station/spec';

/**
 * A pallet on the floor: where it stands, where its cases are bound, and
 * the order they go in, which can change while an arm works it. `cases`
 * are relative to the pallet's centre, so any arm can take them into its
 * own frame. `version` goes up with every change to the queue.
 */
type Target = {
  id: string;
  at: Child;
  to: Hex;
  queue: string[];
  cases: Case[];
  version: number;
  /** The arm working it, if one has picked it up. */
  claimed: string | null;
};

/** How many pallets an arm may pick up in a period, in seconds. */
type Capacity = { targets: number; period: number };

/**
 * The board every arm reads: the pallets and their plans. The hub writes
 * it; the arms pick from it and put back what they leave.
 */
type Board = {
  targets: () => Target[];
  claim: (id: string, arm: string) => Target | null;
  release: (id: string, cases: Case[], queue: string[]) => void;
};

export type { Board, Capacity, Target };
