// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Constants
import {
  BUFFER,
  PALLET,
} from '@/views/experiments/factory-arm/scene/constants';

// Partials
import { DECK, standing } from './stability';
import { cases, extent, GRAZE, intersects, LEVEL, shared } from './world';

// Spec
import type { Extent, World } from './spec';

/** Space left between a case and its neighbour, in metres. */
const GAP = 0.01;

/** How close a side must be to a wall or neighbour to count as touching. */
const TOUCH = 0.02;

const EDGES = {
  x: [
    BUFFER.position[0] - PALLET.size[0] / 2,
    BUFFER.position[0] + PALLET.size[0] / 2,
  ],
  z: [
    BUFFER.position[2] - PALLET.size[2] / 2,
    BUFFER.position[2] + PALLET.size[2] / 2,
  ],
} as const;

/** A place on the buffer: where the case's centre goes, and the queued cases it would bury. */
type Spot = { at: Point; turned: boolean; buries: string[] };

const onBuffer = ({ at }: { at: Point }) =>
  at.x > EDGES.x[0] &&
  at.x < EDGES.x[1] &&
  at.z > EDGES.z[0] &&
  at.z < EDGES.z[1];

/** How many of a box's four sides touch a wall of the buffer or a neighbour. */
const contact = (box: Extent, loaded: Extent[]) => {
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
 * Safe places on the buffer for case `id`, best first: the lowest level
 * first, then the snuggest, packed against walls and neighbours, filling
 * from the far side. Candidates
 * stand flush against a wall or a case on each axis, turned either way, on
 * the boards or on a case's top. A place over a `reserved` case, one still
 * to be picked up, lists it in `buries` and comes after every place that
 * buries nothing.
 */
const spots = (state: World, id: string, reserved: string[] = []): Spot[] => {
  const own = state.cases[id];

  if (!own) {
    return [];
  }

  const others = cases(state).filter((other) => other.id !== id);
  const boxes = others.map(extent);
  const loaded = others.filter(onBuffer).map(extent);
  const levels = [...new Set([DECK, ...loaded.map(({ max }) => max.y)])].sort(
    (a, b) => a - b
  );
  const solids = [...boxes, ...state.obstacles];
  const found: (Spot & { rank: number[] })[] = [];

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
            !standing(box, boxes)
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
            buries,
            // Then row by row from the far side, so the rows nearest the arm stay free to reach over.
            rank: [
              buries.length ? 1 : 0,
              level,
              -contact(box, loaded),
              -box.max.z,
              box.min.x,
            ],
            turned,
          });
        }
      }
    }
  }

  const before = (a: number[], b: number[]) => {
    for (let index = 0; index < a.length; index++) {
      if (Math.abs(a[index] - b[index]) > 1e-6) return a[index] - b[index];
    }

    return 0;
  };

  return found
    .sort((a, b) => before(a.rank, b.rank))
    .map(({ at, buries, turned }) => ({ at, buries, turned }));
};

export { EDGES, onBuffer, spots, type Spot };
