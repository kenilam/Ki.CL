// Grid
import { type Hex, index } from '@/views/experiments/factory-arm/cell/grid/hex';
import {
  beside,
  line as geometry,
  reaches,
} from '@/views/experiments/factory-arm/cell/grid/layout';

// Partials
import type { Simulation } from './simulations';

type Pallet = Simulation['pallets'][number];

/**
 * The floor with `arm` taken off it. Its pallets go with it, cases and all,
 * and whatever was bound for it is bound for its heir: the arm furthest
 * along the first line it worked. `null` when it can't go: it is the last
 * arm, or a line would have no arm in reach.
 */
const withdraw = ({
  arm,
  floor,
}: {
  arm: string;
  floor: Simulation;
}): {
  simulation: Simulation;
  dropped: Pallet[];
  heir: (cell: Hex) => Hex;
} | null => {
  const from = floor.cells.find((cell) => cell.arm === arm)?.hex;

  if (!from) {
    return null;
  }

  const cells = floor.cells.filter((cell) => cell.arm !== arm);
  const lines = floor.lines.map((each) => geometry(each.id, each.cells));

  if (
    !cells.length ||
    lines.some((each) => !cells.some((cell) => reaches(each, cell.hex)))
  ) {
    return null;
  }

  const worked = lines.find((each) => reaches(each, from));
  const after = worked
    ? cells
        .filter((cell) => reaches(worked, cell.hex))
        .sort(
          (a, b) => beside(worked, b.hex).along - beside(worked, a.hex).along
        )[0]
    : undefined;
  const to = (after ?? cells[0]).hex;
  const heir = (cell: Hex) => (index(cell) === index(from) ? to : cell);

  const dropped = floor.pallets.filter(
    ({ at }) => index(at.parent) === index(from)
  );
  const { [arm]: gone, ...capacities } = floor.capacities ?? {};

  void gone;

  return {
    simulation: {
      ...floor,
      cells,
      pallets: floor.pallets
        .filter((pallet) => !dropped.includes(pallet))
        .map((pallet) => ({ ...pallet, to: heir(pallet.to) })),
      capacities,
    },
    dropped,
    heir,
  };
};

export { withdraw };
