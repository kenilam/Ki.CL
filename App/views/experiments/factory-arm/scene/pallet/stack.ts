// Random
import { random } from '@/views/experiments/factory-arm/random';

// Spec
import type { Box, Vector } from './spec';

// Constants
import {
  INCOMING,
  PALLET,
} from '@/views/experiments/factory-arm/scene/constants';

/** Case sizes (width, height, depth in metres) and their loaded weight in kg. */
const CATALOG: { size: Vector; mass: number }[] = [
  { size: [0.4, 0.3, 0.3], mass: 9 },
  { size: [0.3, 0.25, 0.2], mass: 5 },
  { size: [0.5, 0.25, 0.33], mass: 11 },
  { size: [0.6, 0.3, 0.4], mass: 15 },
  { size: [0.35, 0.2, 0.25], mass: 4 },
];

const GAP = 0.01;

/** Cases may overhang the pallet's edge by this much in total, as in practice. */
const OVERHANG = 0.04;

/** How the incoming stacks are built: how many layers, and the seed that picks the cases. */
type Pile = { layers: number; seed: number };

/** How many fit along a side of the given length. */
const fit = (side: number, length: number) =>
  Math.floor((side + OVERHANG + GAP) / (length + GAP));

/**
 * One mixed pallet as it would arrive: each layer is one case type in a grid,
 * turned whichever way fits more, and the top layer is left part-picked.
 */
const one = (
  { layers, seed }: Pile,
  [x, , z]: [number, number, number],
  prefix: string
): Box[] => {
  const next = random(seed);
  const [width, base, depth] = PALLET.size;
  const boxes: Box[] = [];

  let floor = base;

  for (let layer = 0; layer < layers; layer++) {
    const { size, mass } = CATALOG[Math.floor(next() * CATALOG.length)];
    const [w, h, d] = size;
    const turned =
      fit(width, d) * fit(depth, w) > fit(width, w) * fit(depth, d);
    const [along, across] = turned ? [d, w] : [w, d];
    const columns = fit(width, along);
    const rows = fit(depth, across);

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        if (layer === layers - 1 && next() < 0.3) {
          continue;
        }

        boxes.push({
          id: `${prefix}${layer}-${column}-${row}`,
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

/**
 * The incoming stacks, `stacks` of them, each from its own seed so no two
 * are alike.
 */
const stack = (pile: Pile, stacks = 1): Box[] =>
  INCOMING.slice(0, stacks).flatMap((position, index) =>
    one(
      { ...pile, seed: pile.seed + index * 101 },
      position,
      index ? `${index}-` : ''
    )
  );

export { stack, type Pile };
