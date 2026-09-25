/*
 * The cell's layout in metres, with the arm's base at the origin. The pallet
 * sits to its left, the outfeed conveyor to its right and the buffer pallet in
 * front, all inside the arm's reach at the heights they are worked at.
 */

/** A standard 1200 × 1000 mm pallet: `size` is width, height, depth. */
const PALLET = {
  position: [-1.25, 0, 0.35] as [number, number, number],
  size: [1.2, 0.144, 1] as [number, number, number],
};

/**
 * A second, empty pallet of the same size. Cases in the way of the one the
 * operator picked wait here, side by side, until it has gone.
 */
const BUFFER = {
  position: [0.1, 0, 1.55] as [number, number, number],
};

/** Runs along z, away from the back of the cell and toward the viewer. */
const CONVEYOR = {
  /** Where along the belt the arm sets cases down. */
  drop: 0.2,
  end: 2.4,
  height: 0.55,
  speed: 0.35,
  start: -1.6,
  width: 0.7,
  x: 1.35,
};

/** Seeds the stack, so a reload builds the same pallet. */
const SEED = 7;

export { BUFFER, CONVEYOR, PALLET, SEED };
