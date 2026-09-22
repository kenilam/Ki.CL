/*
 * Occupancy grid.
 *
 * Testing every candidate seat against every obstacle would be far too much
 * per frame; binning into coarse cells makes marking and querying near
 * constant time, at the cost of placing to within a cell rather than a pixel.
 */
const CELL_PX = 12;

type Grid = { cols: number; rows: number; bits: Uint8Array };

export function createGrid(width: number, height: number): Grid {
  const cols = Math.max(1, Math.ceil(width / CELL_PX));
  const rows = Math.max(1, Math.ceil(height / CELL_PX));

  return { cols, rows, bits: new Uint8Array(cols * rows) };
}

function forEachCell(
  grid: Grid,
  left: number,
  top: number,
  right: number,
  bottom: number,
  visit: (index: number) => void
): void {
  const c0 = Math.max(0, Math.floor(left / CELL_PX));
  const c1 = Math.min(grid.cols - 1, Math.floor(right / CELL_PX));
  const r0 = Math.max(0, Math.floor(top / CELL_PX));
  const r1 = Math.min(grid.rows - 1, Math.floor(bottom / CELL_PX));

  for (let r = r0; r <= r1; r += 1) {
    for (let c = c0; c <= c1; c += 1) {
      visit(r * grid.cols + c);
    }
  }
}

export function mark(
  grid: Grid,
  l: number,
  t: number,
  r: number,
  b: number
): void {
  forEachCell(grid, l, t, r, b, (index) => {
    grid.bits[index] = 1;
  });
}

/** Occupied cells a rect overlaps - zero means a clear seat. */
export function cost(
  grid: Grid,
  l: number,
  t: number,
  r: number,
  b: number
): number {
  let total = 0;

  forEachCell(grid, l, t, r, b, (index) => {
    total += grid.bits[index] ?? 0;
  });

  return total;
}

/** Candidate seats: two rings of eight bearings, nearest ring tried first. */
export const SEAT_ANGLES = Array.from(
  { length: 8 },
  (_, i) => (i / 8) * Math.PI * 2
);
export const SEAT_RINGS = [1, 1.8];

/**
 * How much better a challenger has to be before a label gives up its bearing.
 *
 * Seats used to be re-elected from scratch every frame and handed to whoever
 * won by a single occupied cell - and a cell is 12px, so a sub-pixel drift
 * during a zoom was enough to flip a label from above its node to below it.
 * Requiring a real margin means a bearing is kept until it is properly blocked,
 * which is what stops the jumping.
 */
export const INCUMBENT_MARGIN = 3;

/**
 * How covered a label has to become before it gives up and hides.
 *
 * Appearing needs a properly clear seat; disappearing needs real obstruction.
 * The two thresholds differ on purpose - with a single one, a label sitting
 * near the boundary flips every time the grid shifts under it, and the tree
 * mounts in slices, so the grid shifts constantly for the first second after a
 * route change. Measured before this: 14 of 18 labels blinking, the worst
 * toggling 18 times inside a second.
 */
export const HIDE_ABOVE = 6;

/**
 * How quickly a label slides to a new bearing, per second.
 *
 * Only the *offset* from the node is damped. The node's own projected position
 * is used live, so panning and zooming track exactly with no lag - what eases
 * is the rare change of side, which would otherwise be a teleport.
 */
export const SETTLE_EASE = 12;

export const GAP_PX = 10;
export const EDGE_PAD = 12;
/** At or above this, a label is placed even with no perfectly clear seat. */
export const FORCE_PLACE_PRIORITY = 3;
