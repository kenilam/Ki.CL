// Grid
import { type Layout, PALLET } from '../grid/layout';

// Constants
import { DECK } from './constants';

// Partials
import { cases, extent, GRAZE, LEVEL, shared } from './world';

// Spec
import type { Extent, World } from './spec';

/** How far a case may stand past a pallet's edge, in metres. */
const OVERHANG = 0.02;

/** Share of a case's base that must rest on what is under it. */
const SUPPORT = 0.75;

/** Tallest a load may stand above the boards, in metres. */
const LIMIT = 1;

/** Tallest a block may stand for how narrow it is. */
const SLENDER = 2.5;

/** Sides closer than this stand as one block. */
const TOUCH = 0.02;

/** Every pallet's edges from above: the incoming ones and the buffer. */
const pallets = ({ buffer, pallets: incoming }: Layout) =>
  [...incoming.map(({ at }) => at), ...(buffer ? [buffer] : [])].map(
    ([x, , z]) => ({
      x: [x - PALLET.size[0] / 2, x + PALLET.size[0] / 2] as const,
      z: [z - PALLET.size[2] / 2, z + PALLET.size[2] / 2] as const,
    })
  );

/** Whether a box stands within a pallet's edges, give or take the overhang. */
const within = (layout: Layout, box: Extent) =>
  pallets(layout).some(
    ({ x, z }) =>
      box.min.x > x[0] - OVERHANG &&
      box.max.x < x[1] + OVERHANG &&
      box.min.z > z[0] - OVERHANG &&
      box.max.z < z[1] + OVERHANG
  );

/**
 * Whether a case with box `box` would stand safely, the case `except` aside:
 * on a pallet's boards, or three quarters on the cases under it with its
 * centre over them; no higher than the limit; and not a tower, for how
 * narrow the block of cases it stands in is.
 */
const stable = (layout: Layout, state: World, box: Extent, except?: string) =>
  standing(
    layout,
    box,
    cases(state)
      .filter(({ id }) => id !== except)
      .map(extent)
  );

/** `stable`, given the boxes of the other cases, for a caller testing many places at once. */
const standing = (layout: Layout, box: Extent, others: Extent[]) => {
  if (!within(layout, box) || box.max.y - DECK > LIMIT + LEVEL) {
    return false;
  }

  if (Math.abs(box.min.y - DECK) >= LEVEL) {
    const rests = others.filter(
      (other) =>
        Math.abs(other.max.y - box.min.y) < LEVEL && shared(other, box) > GRAZE
    );
    const footprint = (box.max.x - box.min.x) * (box.max.z - box.min.z);
    const held = rests.reduce((sum, other) => sum + shared(other, box), 0);
    const centre = {
      x: (box.min.x + box.max.x) / 2,
      z: (box.min.z + box.max.z) / 2,
    };
    const over = rests.some(
      (other) =>
        centre.x >= other.min.x &&
        centre.x <= other.max.x &&
        centre.z >= other.min.z &&
        centre.z <= other.max.z
    );

    if (held / footprint < SUPPORT || !over) {
      return false;
    }
  }

  // The block it stands in at its level: it and the cases touching it there.
  const block = [box];

  for (const one of block) {
    for (const other of others) {
      if (
        !block.includes(other) &&
        Math.abs(other.max.y - box.max.y) < LEVEL &&
        other.min.x < one.max.x + TOUCH &&
        other.max.x > one.min.x - TOUCH &&
        other.min.z < one.max.z + TOUCH &&
        other.max.z > one.min.z - TOUCH
      ) {
        block.push(other);
      }
    }
  }

  const span = Math.min(
    Math.max(...block.map(({ max }) => max.x)) -
      Math.min(...block.map(({ min }) => min.x)),
    Math.max(...block.map(({ max }) => max.z)) -
      Math.min(...block.map(({ min }) => min.z))
  );

  return (box.max.y - DECK) / span <= SLENDER + 1e-9;
};

export { pallets, stable, standing, within };
