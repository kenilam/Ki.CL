// Protocol
import type { Point } from '../protocol';

// Grid
import { type Layout, PALLET, type Vector } from '../grid/layout';

// Constants
import { DECK } from './constants';

// Partials
import { standing } from './stability';
import { cases, extent, GRAZE, intersects, LEVEL, shared } from './world';

// Spec
import type { Extent, Spot, World } from './spec';

/** Space left between a case and its neighbour, in metres. */
const GAP = 0.01;

/** How close a side must be to a wall or neighbour to count as touching. */
const TOUCH = 0.02;

/** A pallet's edges from above. */
const edges = ([x, , z]: Vector) => ({
  x: [x - PALLET.size[0] / 2, x + PALLET.size[0] / 2],
  z: [z - PALLET.size[2] / 2, z + PALLET.size[2] / 2],
});

type Edges = ReturnType<typeof edges>;

const onBuffer = (EDGES: Edges, { at }: { at: Point }) =>
  at.x > EDGES.x[0] &&
  at.x < EDGES.x[1] &&
  at.z > EDGES.z[0] &&
  at.z < EDGES.z[1];

/** How many of a box's four sides touch a wall of the buffer or a neighbour. */
const contact = (EDGES: Edges, box: Extent, loaded: Extent[]) => {
  const sides = [
    Math.abs(box.min.x - EDGES.x[0]) < TOUCH,
    Math.abs(box.max.x - EDGES.x[1]) < TOUCH,
    Math.abs(box.min.z - EDGES.z[0]) < TOUCH,
    Math.abs(box.max.z - EDGES.z[1]) < TOUCH,
  ];

  loaded.forEach((other) => {
    if (other.min.y > box.max.y - LEVEL || other.max.y < box.min.y + LEVEL) {
      return;
    }

    const alongZ =
      other.min.z < box.max.z - LEVEL && other.max.z > box.min.z + LEVEL;
    const alongX =
      other.min.x < box.max.x - LEVEL && other.max.x > box.min.x + LEVEL;

    if (alongZ && Math.abs(other.max.x - box.min.x) < TOUCH) sides[0] = true;
    if (alongZ && Math.abs(other.min.x - box.max.x) < TOUCH) sides[1] = true;
    if (alongX && Math.abs(other.max.z - box.min.z) < TOUCH) sides[2] = true;
    if (alongX && Math.abs(other.min.z - box.max.z) < TOUCH) sides[3] = true;
  });

  return sides.filter(Boolean).length;
};

/**
 * Safe places on `pallets` for case `id`, best first: the first pallet
 * before the next, on each the lowest level first, then the snuggest,
 * packed against walls and neighbours, filling from the far side. Candidates
 * stand flush against a wall or a case on each axis, turned either way, on
 * the boards or on a case's top. A place over a `reserved` case, one still
 * to be picked up, lists it in `buries` and comes after every place that
 * buries nothing.
 */
const spots = (
  layout: Layout,
  state: World,
  id: string,
  reserved: string[] = [],
  pallets: Vector[] = layout.buffer ? [layout.buffer] : []
): Spot[] => {
  const own = state.cases[id];

  if (!own) {
    return [];
  }

  const others = cases(state).filter((other) => other.id !== id);
  const boxes = others.map(extent);
  const solids = [...boxes, ...state.obstacles];
  const found: (Spot & { rank: number[] })[] = [];

  pallets.forEach((pallet, order) => {
    const EDGES = edges(pallet);
    const loaded = others.filter((one) => onBuffer(EDGES, one)).map(extent);
    const levels = [...new Set([DECK, ...loaded.map(({ max }) => max.y)])].sort(
      (a, b) => a - b
    );

    for (const turned of [false, true]) {
      const [w, h, d] = turned
        ? [own.size[2], own.size[1], own.size[0]]
        : own.size;
      const xs = [
        EDGES.x[0] + w / 2,
        EDGES.x[1] - w / 2,
        ...loaded.flatMap(({ min, max }) => [
          max.x + GAP + w / 2,
          min.x - GAP - w / 2,
        ]),
      ];
      const zs = [
        EDGES.z[0] + d / 2,
        EDGES.z[1] - d / 2,
        ...loaded.flatMap(({ min, max }) => [
          max.z + GAP + d / 2,
          min.z - GAP - d / 2,
        ]),
      ];

      for (const level of levels) {
        for (const x of xs) {
          for (const z of zs) {
            const box: Extent = {
              min: { x: x - w / 2, y: level, z: z - d / 2 },
              max: { x: x + w / 2, y: level + h, z: z + d / 2 },
            };

            if (
              solids.some((solid) => intersects(box, solid)) ||
              !standing(layout, box, boxes)
            ) {
              continue;
            }

            const buries = reserved.filter((other) => {
              const kept = state.cases[other];

              return (
                kept &&
                shared(box, extent(kept)) > GRAZE &&
                box.min.y > extent(kept).max.y - LEVEL
              );
            });

            found.push({
              at: { x, y: level + h / 2, z },
              facing: turned ? Math.PI / 2 : 0,
              buries,
              // The first pallet fills before the next; on each, the lowest level, then the snuggest, row by row from the far side.
              rank: [
                buries.length ? 1 : 0,
                order,
                level,
                -contact(EDGES, box, loaded),
                -box.max.z,
                box.min.x,
              ],
            });
          }
        }
      }
    }
  });

  const before = (a: number[], b: number[]) => {
    for (let index = 0; index < a.length; index++) {
      if (Math.abs(a[index] - b[index]) > 1e-6) return a[index] - b[index];
    }

    return 0;
  };

  // A spot beside a case and one against an edge often land on the same point: each place once, so the tries aren't spent on one.
  const seen = new Set<string>();
  const key = ({ at, facing }: Spot) =>
    [at.x, at.y, at.z, facing].map((value) => value.toFixed(3)).join();

  return found
    .sort((a, b) => before(a.rank, b.rank))
    .map(({ at, buries, facing }) => ({ at, buries, facing }))
    .filter((spot) => !seen.has(key(spot)) && seen.add(key(spot)));
};

export { edges, onBuffer, spots };
