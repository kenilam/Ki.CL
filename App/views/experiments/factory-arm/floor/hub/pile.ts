// Station
import type { Case } from 'arm/station/spec';

// Grid
import { PALLET } from 'arm/grid/layout';

/** Case sizes (width, height, depth in metres) and their loaded weight in kg. */
const CATALOG: { size: [number, number, number]; mass: number }[] = [
  { size: [0.4, 0.3, 0.3], mass: 9 },
  { size: [0.5, 0.3, 0.4], mass: 12 },
  { size: [0.6, 0.35, 0.4], mass: 15 },
];

/** Room left between cases, in metres. */
const GAP = 0.01;

/** A small seeded generator (mulberry32), so a pile can be built again exactly. */
const random = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let value = state;

    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * A pile of cases on a pallet, relative to the pallet's centre: each layer
 * one size, laid in rows and columns to fill the boards, the top layer
 * sometimes short a case or two.
 */
const pile = (id: string, seed: number, layers: number): Case[] => {
  const next = random(seed);
  const cases: Case[] = [];
  let floor = PALLET.size[1];

  for (let layer = 0; layer < layers; layer++) {
    const { mass, size } = CATALOG[Math.floor(next() * CATALOG.length)];
    const turned = next() < 0.5;
    const [w, h, d] = size;
    const along = turned ? d : w;
    const across = turned ? w : d;
    const columns = Math.floor((PALLET.size[0] + GAP) / (along + GAP));
    const rows = Math.floor((PALLET.size[2] + GAP) / (across + GAP));

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        if (layer === layers - 1 && next() < 0.3) {
          continue;
        }

        cases.push({
          id: `${id}-${layer}-${column}-${row}`,
          mass,
          size: turned ? [d, h, w] : [w, h, d],
          at: {
            x: (column - (columns - 1) / 2) * (along + GAP),
            y: floor + h / 2,
            z: (row - (rows - 1) / 2) * (across + GAP),
          },
          yaw: 0,
        });
      }
    }

    floor += h;
  }

  return cases;
};

export { pile };
