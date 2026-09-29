// Grid
import { childCentre } from '@/views/experiments/factory-arm/cell/grid/child';
import {
  type Hex,
  index,
  neighbour,
  opposite,
  SIDES,
  type Side,
} from '@/views/experiments/factory-arm/cell/grid/hex';
import {
  free,
  type Layout,
  layout,
  line as geometry,
  on,
  reaches,
  stretch,
} from '@/views/experiments/factory-arm/cell/grid/layout';

// Partials
import type { Loose, Simulation } from './simulations';

type Pallet = Simulation['pallets'][number];

/** Slots tried for a pallet that no longer fits, behind the arm first. */
const ORDER: Side[] = [3, 4, 5, 2, 1, 0];

/**
 * The floor with `arm` moved to `hex`. Its pallets go with it, and what
 * was bound for it still is. A pallet whose slot is no good there, under
 * the belt, the buffer's, or facing something across the edge, goes to
 * another free slot of the arm, or comes off the floor with its cases left
 * where it stood.
 */
const relocate = ({
  arm,
  floor,
  hex,
  stations,
}: {
  arm: string;
  floor: Simulation;
  hex: Hex;
  stations: { arm: string; hex: Hex; layout: Layout }[];
}): { simulation: Simulation; dropped: Pallet[] } => {
  const from = floor.cells.find((cell) => cell.arm === arm)?.hex;

  if (!from) {
    return { simulation: floor, dropped: [] };
  }

  const cells = floor.cells.map((cell) =>
    cell.arm === arm ? { ...cell, hex } : cell
  );
  const moved = (cell: Hex) => (index(cell) === index(from) ? hex : cell);

  // The arm's layout where it lands, as the hub will make it.
  const made = layout({
    belts: floor.lines
      .map((each) => geometry(each.id, each.cells))
      .filter((each) => reaches(each, hex))
      .map((each) => stretch(each, hex, { end: false, downstream: [] })),
    shared: SIDES.filter((side) =>
      cells.some((cell) => index(cell.hex) === index(neighbour(hex, side)))
    ),
  });

  const staying = floor.pallets.filter(
    ({ at }) => index(at.parent) !== index(from)
  );
  const placed: Pallet[] = [];
  const dropped: Pallet[] = [];
  const loose: Loose[] = [...(floor.loose ?? [])];

  /** Whether a slot of the arm, or the one facing it across the edge, holds something. */
  const taken = (side: Side) => {
    const facing = { parent: neighbour(hex, side), slot: opposite(side) };
    const across = stations.find(
      (one) => index(one.hex) === index(facing.parent)
    );
    return (
      [...staying, ...placed].some(
        (pallet) =>
          (index(pallet.at.parent) === index(hex) && pallet.at.slot === side) ||
          (index(pallet.at.parent) === index(facing.parent) &&
            pallet.at.slot === facing.slot)
      ) ||
      (!!across &&
        (across.layout.pallets.some((pallet) => pallet.side === facing.slot) ||
          on(across.layout.buffer, facing.slot)))
    );
  };

  const fits = (side: Side) => free(made, side) && !taken(side);

  floor.pallets
    .filter(({ at }) => index(at.parent) === index(from))
    .forEach((pallet) => {
      // Its own slot if it still fits; else a free slot not shared with a neighbour, and only then a shared one.
      const side = fits(pallet.at.slot)
        ? pallet.at.slot
        : (ORDER.find((each) => fits(each) && !made.shared.includes(each)) ??
          ORDER.find((each) => fits(each)));

      if (side === undefined) {
        dropped.push(pallet);
        loose.push({ at: childCentre(pallet.at), cases: pallet.cases });

        return;
      }

      placed.push({ ...pallet, at: { parent: hex, slot: side } });
    });

  return {
    simulation: {
      ...floor,
      cells,
      pallets: [...staying, ...placed].map((pallet) => ({
        ...pallet,
        to: moved(pallet.to),
      })),
      loose,
    },
    dropped,
  };
};

export { relocate };
