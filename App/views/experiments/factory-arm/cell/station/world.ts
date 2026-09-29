// Protocol
import type { Point } from '../protocol';

// Spec
import type { Case, Extent, World } from './spec';

/** Heights closer than this count as touching, in metres. */
const LEVEL = 0.005;

/** Overlap, in square metres, below which two footprints only touch. */
const GRAZE = 1e-4;

/**
 * A case's box, square to the cell. A case turned by `yaw` takes the box
 * round its turned footprint, so what stands under or beside it stays safe.
 */
const extent = ({ at, size: [w, h, d], yaw }: Case): Extent => {
  const cos = Math.abs(Math.cos(yaw));
  const sin = Math.abs(Math.sin(yaw));
  const x = (w * cos + d * sin) / 2;
  const z = (w * sin + d * cos) / 2;

  return {
    min: { x: at.x - x, y: at.y - h / 2, z: at.z - z },
    max: { x: at.x + x, y: at.y + h / 2, z: at.z + z },
  };
};

/** How much two boxes overlap from above, in square metres. */
const shared = (a: Extent, b: Extent) =>
  Math.max(0, Math.min(a.max.x, b.max.x) - Math.max(a.min.x, b.min.x)) *
  Math.max(0, Math.min(a.max.z, b.max.z) - Math.max(a.min.z, b.min.z));

/** Whether two boxes overlap as solids, touching faces aside. */
const intersects = (a: Extent, b: Extent, slack = LEVEL) =>
  a.min.x < b.max.x - slack &&
  a.max.x > b.min.x + slack &&
  a.min.y < b.max.y - slack &&
  a.max.y > b.min.y + slack &&
  a.min.z < b.max.z - slack &&
  a.max.z > b.min.z + slack;

const cases = (state: World) => Object.values(state.cases);

/**
 * The cases in the way of lifting `id` straight up: every case over any part
 * of it, higher first, so each is clear by its turn.
 */
const over = (state: World, id: string) => {
  const own = state.cases[id];

  if (!own) {
    return [];
  }

  const box = extent(own);

  return cases(state)
    .filter(
      (other) =>
        other.id !== id &&
        shared(extent(other), box) > GRAZE &&
        extent(other).min.y > box.max.y - LEVEL
    )
    .sort((a, b) => b.at.y - a.at.y);
};

/** The cases `id` rests on: under it, their tops at its underside. */
const under = (state: World, id: string) => {
  const own = state.cases[id];

  if (!own) {
    return [];
  }

  const box = extent(own);

  return cases(state).filter(
    (other) =>
      other.id !== id &&
      shared(extent(other), box) > GRAZE &&
      Math.abs(extent(other).max.y - box.min.y) < LEVEL
  );
};

/** The cell with `id` moved so its centre is at `at`. Nothing else changes. */
const move = (state: World, id: string, at: Point): World => ({
  ...state,
  cases: { ...state.cases, [id]: { ...state.cases[id], at } },
});

/**
 * The cell with `id` set down with its centre at `at`, the pad facing
 * `facing`. Set down square, a case turned a quarter swaps its sides; any
 * other turn is kept as its yaw.
 */
const place = (state: World, id: string, at: Point, facing: number): World => {
  const own = state.cases[id];
  const [w, h, d] = own.size;
  const quarter = Math.round(facing / (Math.PI / 2));
  const square = Math.abs(facing - quarter * (Math.PI / 2)) < 1e-6;
  const turned = square && quarter % 2 !== 0;

  return {
    ...state,
    cases: {
      ...state.cases,
      [id]: {
        ...own,
        at,
        size: turned ? [d, h, w] : [w, h, d],
        yaw: square ? 0 : facing,
      },
    },
  };
};

/** The cell with `id` gone, as a case set on the belt leaves it. */
const remove = (state: World, id: string): World => ({
  ...state,
  cases: Object.fromEntries(
    Object.entries(state.cases).filter(([key]) => key !== id)
  ),
});

export {
  GRAZE,
  LEVEL,
  cases,
  extent,
  intersects,
  move,
  over,
  place,
  remove,
  shared,
  under,
};
