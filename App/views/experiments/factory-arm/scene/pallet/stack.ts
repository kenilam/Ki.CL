// Random
import { random } from '@/views/experiments/factory-arm/random';

// Spec
import type {
  Box,
  Vector,
} from '@/views/experiments/factory-arm/scene/boxes/spec';

// Constants
import { PALLET } from '@/views/experiments/factory-arm/scene/constants';

/** Case sizes (width, height, depth in metres) and their loaded weight in kg. */
const CATALOG: { size: Vector; mass: number }[] = [
  { size: [0.4, 0.3, 0.3], mass: 9 },
  { size: [0.3, 0.25, 0.2], mass: 5 },
  { size: [0.5, 0.25, 0.33], mass: 11 },
  { size: [0.6, 0.3, 0.4], mass: 15 },
  { size: [0.35, 0.2, 0.25], mass: 4 },
];

const LAYERS = 4;
const GAP = 0.01;

/** Cases may overhang the pallet's edge by this much in total, as in practice. */
const OVERHANG = 0.04;

/** How many fit along a side of the given length. */
const fit = (side: number, length: number) =>
  Math.floor((side + OVERHANG + GAP) / (length + GAP));

/**
 * A mixed pallet as it would arrive: each layer is one case type in a grid,
 * turned whichever way fits more, and the top layer is left part-picked.
 */
const stack = (seed: number): Box[] => {
  const next = random(seed);
  const [width, base, depth] = PALLET.size;
  const [x, , z] = PALLET.position;
  const boxes: Box[] = [];

  let floor = base;

  for (let layer = 0; layer < LAYERS; layer++) {
    const { size, mass } = CATALOG[Math.floor(next() * CATALOG.length)];
    const [w, h, d] = size;
    const turned =
      fit(width, d) * fit(depth, w) > fit(width, w) * fit(depth, d);
    const [along, across] = turned ? [d, w] : [w, d];
    const columns = fit(width, along);
    const rows = fit(depth, across);

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        if (layer === LAYERS - 1 && next() < 0.3) {
          continue;
        }

        boxes.push({
          id: `${layer}-${column}-${row}`,
          mass,
          position: [
            x + (column - (columns - 1) / 2) * (along + GAP),
            floor + h / 2,
            z + (row - (rows - 1) / 2) * (across + GAP),
          ],
          size,
          yaw: turned ? Math.PI / 2 : 0,
        });
      }
    }

    floor += h;
  }

  return boxes;
};

export { stack };
