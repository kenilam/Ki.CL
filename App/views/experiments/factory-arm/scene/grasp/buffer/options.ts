// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/boxes/spec';

// Cell
import { PAD } from '@/views/experiments/factory-arm/scene/grasp/cell';

// Slab
import {
  around,
  type Slab,
} from '@/views/experiments/factory-arm/scene/grasp/slab';

// Partials
import { contact } from './contact';
import { fit } from './fit';

// Constants
import { EDGES, GAP } from './constants';

/** A safe place for a case: its slab there, the heading, and how it ranks. */
type Option = { slab: Slab; facing: number; rank: number[] };

/**
 * Centres worth trying along one side of the pallet, for a case reaching
 * `half` either way from its centre and a pad reaching `pad`: flush with
 * either edge of the pallet, `GAP` beside each case already there by the
 * case's edge or by the pad's, and square on top of each. A case pushed
 * against something is where packing leaves no gaps; the pad's edge matters
 * beside a taller neighbour, since the pad is wider than a small case.
 */
const positions = (
  [from, to]: [number, number],
  half: number,
  pad: number,
  edges: [number, number][]
) =>
  [
    from + half,
    to - half,
    ...edges.flatMap(([low, high]) => [
      high + GAP + half,
      low - GAP - half,
      high + GAP + pad,
      low - GAP - pad,
      low + half,
      high - half,
    ]),
  ].filter(
    (centre) => centre >= from + half - 1e-6 && centre <= to - half + 1e-6
  );

/** Whether one ranking comes first, comparing entry by entry. */
const before = (a: number[], b: number[]) => {
  const index = a.findIndex((value, i) => Math.abs(value - b[i]) > 1e-6);

  return index >= 0 && a[index] < b[index];
};

/**
 * Every safe place for a case on the buffer, best first, trying it both ways
 * round. The ranking: on the floor before stacked, then the most sides
 * touching a wall or neighbour, then the lowest top, then back and left.
 */
const options = (box: Box, loaded: Slab[]): Option[] => {
  const half: [number, number] = [box.size[0] / 2, box.size[2] / 2];
  const found: Option[] = [];

  for (const facing of [0, Math.PI / 2]) {
    const turned = facing !== 0;
    const [across, along] = turned ? [half[1], half[0]] : half;
    const [padAcross, padAlong] = turned ? [PAD[1], PAD[0]] : PAD;
    const xs = positions(
      EDGES.x,
      across,
      padAcross,
      loaded.map((o) => o.x)
    );
    const zs = positions(
      EDGES.z,
      along,
      padAlong,
      loaded.map((o) => o.z)
    );
    const seen = new Set<string>();

    for (const z of zs) {
      for (const x of xs) {
        const key = `${x.toFixed(4)},${z.toFixed(4)}`;

        if (seen.has(key)) {
          continue;
        }

        seen.add(key);

        const outline = around(x, z, half, turned);
        const place = fit(outline, around(x, z, PAD, turned), box, loaded);

        if (place) {
          const slab = around(
            x,
            z,
            half,
            turned,
            place.base,
            place.top,
            box.mass
          );

          found.push({
            slab,
            facing,
            rank: [place.base, -contact(slab, loaded), place.top, z, x],
          });
        }
      }
    }
  }

  return found.sort((a, b) =>
    before(a.rank, b.rank) ? -1 : before(b.rank, a.rank) ? 1 : 0
  );
};

export { before, options };
export type { Option };
