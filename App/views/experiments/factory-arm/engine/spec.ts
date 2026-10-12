// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

/**
 * A case as the engine knows it: square to the cell, so its box is exact.
 * `size` is its extent along x, up and along z as it stands, already turned;
 * `at` is its centre.
 */
type Case = {
  id: string;
  mass: number;
  size: [number, number, number];
  at: Point;
};

/**
 * Everything the engine plans with. Cases don't move unless the arm moves
 * them, so this is the cell exactly, not a guess at where physics left it.
 */
type World = {
  cases: Record<string, Case>;
  obstacles: Solid[];
};

/** Where a case can be, as the log names it. */
type Place = 'belt' | 'buffer' | 'pallet';

/**
 * A step for the log. The engine can't read the copy, so it says which line
 * it is (`step_<context>` in the view's namespace) and the values that go in
 * it; the log writes the sentence.
 */
type Note = {
  context:
    | `${'no_path' | 'no_room'}${'' | '_across'}${'' | '_waits'}`
    | `${'picked' | 'set_down'}_${Place}`
    | 'moving_belt'
    | 'moving_buffer'
    | 'queued'
    | 'queued_blocked'
    | 'resumed'
    | 'retry'
    | 'stopped'
    | 'waiting';
  values?: Record<string, number | string>;
};

/** An axis-aligned box by its lowest and highest corners. */
type Extent = { min: Point; max: Point };

export type { Case, Extent, Note, Place, World };
