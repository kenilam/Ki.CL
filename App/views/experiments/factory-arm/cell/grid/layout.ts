// Protocol
import type { Box, Point } from '../protocol';

// Partials
import {
  centre,
  type Hex,
  heading as bearing,
  INRADIUS,
  type Side,
} from './hex';

type Vector = [number, number, number];

/**
 * A cell's children: the seven finer hexes under an arm's hex, as H3 nests
 * them, with the arm on the middle one and a slot round it on each side.
 * A pallet or the buffer stands on a slot.
 */
const FINE = INRADIUS / Math.sqrt(7);

/** From the arm's base to the centre of a slot, in metres. */
const SLOT = 2 * FINE;

/** A standard 1200 × 1000 mm pallet: `size` is width, height, depth. */
const PALLET = { size: [1.2, 0.144, 1] as Vector };

/** How far to the right of the cells it runs past a belt line lies, in metres: within reach, clear of the base. */
const LATERAL = 1.4;

/** How far from a line an arm may stand and still work it, in metres. */
const REACHABLE = 2.15;

/**
 * A belt line on the floor: straight, from `origin` along `heading`, with
 * cases going on from `start` and off at `end`, distances along it. `span`
 * is how far along its last cell lies: arms from there on take cases off.
 */
type Line = {
  id: string;
  origin: { x: number; z: number };
  heading: number;
  start: number;
  span: number;
  end: number;
  height: number;
  width: number;
  speed: number;
};

/**
 * A belt line as one arm sees it: past the arm along `heading`, `lateral`
 * to its right (or left, when negative), the arm's own stretch of it from
 * `zone[0]` to `zone[1]`. Distances along it are from the point nearest
 * the arm, `along` from the line's origin. `drops` are where this arm sets
 * cases down; at the `end` of the line the arm takes them off at `pick`.
 * `downstream` are the cells the line goes on to from here.
 */
type Belt = {
  id: string;
  heading: number;
  lateral: number;
  along: number;
  zone: [number, number];
  drops: number[];
  pick: number;
  height: number;
  width: number;
  speed: number;
  end: boolean;
  downstream: Hex[];
};

/** A pallet on one of the slots, and whose it is. */
type Pallet = { id: string; side: Side; at: Vector };

/**
 * What stands round one arm, in its own frame: the arm's base at the
 * origin. `shared` are the sides facing another arm's cell, whose slots
 * overlap that cell's facing slots: one pallet between the two, and never
 * the buffer or a pallet of the cell's own. An arm that only takes cases
 * off a belt never digs into a stack, so it has no buffer: every slot of
 * its own takes a pallet to stack on.
 */
type Layout = {
  pallets: Pallet[];
  buffer: Vector | null;
  belts: Belt[];
  shared: Side[];
};

/** A point this far out through a side, at height `y`. */
const along = (side: Side, distance: number, y = 0): Vector => [
  distance * Math.cos(bearing(side)),
  y,
  distance * Math.sin(bearing(side)),
];

/** Where a slot's centre is. */
const slot = (side: Side) => along(side, SLOT);

/** A straight line past `cells`, adjacent and in a row, to the right of them. */
const line = (id: string, cells: Hex[]): Line => {
  const first = centre(cells[0]);
  const last = centre(cells[cells.length - 1]);
  const heading = Math.atan2(last.z - first.z, last.x - first.x);
  const length = Math.hypot(last.x - first.x, last.z - first.z);

  return {
    id,
    origin: {
      x: first.x + LATERAL * Math.cos(heading - Math.PI / 2),
      z: first.z + LATERAL * Math.sin(heading - Math.PI / 2),
    },
    heading,
    start: -INRADIUS,
    span: length,
    end: length + 0.6,
    height: 0.55,
    width: 0.7,
    speed: 0.35,
  };
};

/** Where `cell` is against a line: how far along it, and how far to its right. */
const beside = (found: Line, cell: Hex) => {
  const { x, z } = centre(cell);
  const dx = x - found.origin.x;
  const dz = z - found.origin.z;

  return {
    along: dx * Math.cos(found.heading) + dz * Math.sin(found.heading),
    lateral:
      dx * Math.cos(found.heading - Math.PI / 2) +
      dz * Math.sin(found.heading - Math.PI / 2),
  };
};

/** How far along a line an arm's drops and pick reach either side of the point nearest it, in metres. */
const SPREAD = 0.6;

/**
 * Whether an arm in `cell` can work a line: near enough to reach it, and
 * beside it, from its start to within a cell of its end, where the belt
 * runs on to meet the furthest arm.
 */
const reaches = (found: Line, cell: Hex) => {
  const { along, lateral } = beside(found, cell);

  // A hair of tolerance: cells are laid out in floating point.
  return (
    Math.abs(lateral) <= REACHABLE &&
    along - SPREAD >= found.start - 1e-6 &&
    along + SPREAD <= found.end + INRADIUS + 1e-6
  );
};

/**
 * A line as the arm in `cell` sees it. `end` when this is the last arm
 * along it, where cases come off; `downstream` the cells of the arms after
 * it.
 */
const stretch = (
  found: Line,
  cell: Hex,
  { downstream, end }: { downstream: Hex[]; end: boolean }
): Belt => {
  const { along: offset, lateral } = beside(found, cell);

  return {
    id: found.id,
    heading: found.heading,
    // The cell is `lateral` to the right of the line, so the line is that far to the arm's left.
    lateral: -lateral,
    along: offset,
    zone: [
      Math.max(found.start, offset - INRADIUS) - offset,
      Math.min(found.end, offset + INRADIUS) - offset,
    ],
    drops: [0, -0.5, 0.5],
    pick: 0,
    height: found.height,
    width: found.width,
    speed: found.speed,
    end,
    downstream,
  };
};

/** A line run on to the furthest of `cells` that works it, on either side, so its belt reaches every arm. */
const extended = (found: Line, cells: Hex[]): Line => {
  const along = cells
    .filter((cell) => reaches(found, cell))
    .map((cell) => beside(found, cell).along);

  return along.length
    ? { ...found, end: Math.max(found.end, Math.max(...along) + SPREAD) }
    : found;
};

/** How close two belts may come, in metres: their width and a case's room, so nothing on one meets the other. */
const APART = 1.2;

/**
 * Whether two lines keep apart along their whole run, so a case on one never
 * meets a case on the other: the nearest two points of the belts are at
 * least `APART` from each other.
 */
const apart = (a: Line, b: Line) => {
  const ends = (found: Line) =>
    [found.start, found.end].map((distance) => onLine(found, distance));
  const [a0, a1] = ends(a);
  const [b0, b1] = ends(b);

  // The nearest approach of two segments, in the floor plane.
  const gap = (
    p: { x: number; z: number },
    q: { x: number; z: number },
    r: { x: number; z: number },
    s: { x: number; z: number }
  ) => {
    const between = (
      from: { x: number; z: number },
      to: { x: number; z: number },
      point: { x: number; z: number }
    ) => {
      const dx = to.x - from.x;
      const dz = to.z - from.z;
      const length = dx * dx + dz * dz || 1;
      const t = Math.min(
        1,
        Math.max(
          0,
          ((point.x - from.x) * dx + (point.z - from.z) * dz) / length
        )
      );

      return Math.hypot(from.x + dx * t - point.x, from.z + dz * t - point.z);
    };
    const cross = (
      o: { x: number; z: number },
      u: { x: number; z: number },
      v: { x: number; z: number }
    ) => (u.x - o.x) * (v.z - o.z) - (u.z - o.z) * (v.x - o.x);
    const meets =
      cross(p, q, r) * cross(p, q, s) < 0 &&
      cross(r, s, p) * cross(r, s, q) < 0;

    return meets
      ? 0
      : Math.min(
          between(p, q, r),
          between(p, q, s),
          between(r, s, p),
          between(r, s, q)
        );
  };

  return gap(a0, a1, b0, b1) >= APART;
};

/** Where a point `distance` along a belt is, in this arm's frame. */
const onBelt = (found: Belt, distance: number): Point => ({
  x:
    distance * Math.cos(found.heading) +
    found.lateral * Math.cos(found.heading - Math.PI / 2),
  y: found.height,
  z:
    distance * Math.sin(found.heading) +
    found.lateral * Math.sin(found.heading - Math.PI / 2),
});

/** Where a point `distance` along a line is, on the floor. */
const onLine = (found: Line, distance: number): Point => ({
  x: found.origin.x + distance * Math.cos(found.heading),
  y: found.height,
  z: found.origin.z + distance * Math.sin(found.heading),
});

/** How far above a belt's surface a box still meets what rides it, in metres: the tallest case and some room. */
const CLEARANCE = 0.5;

/**
 * Whether a box stands on a line's belt: over its run, within its width,
 * and low enough to meet the cases riding it. The belt can't run with it
 * there.
 */
const covers = (found: Line, box: Box) =>
  box.min.y <= found.height + CLEARANCE &&
  box.max.y >= found.height - 0.1 &&
  above(found, box);

/** Whether a box's footprint lies over a line's belt, at any height. */
const above = (found: Line, box: Box) => {
  const across = found.heading - Math.PI / 2;
  const corners = [
    [box.min.x, box.min.z],
    [box.max.x, box.min.z],
    [box.max.x, box.max.z],
    [box.min.x, box.max.z],
  ];
  const belt = [found.start, found.end].flatMap((distance) =>
    [-found.width / 2, found.width / 2].map((lateral) => {
      const point = onLine(found, distance);

      return [
        point.x + lateral * Math.cos(across),
        point.z + lateral * Math.sin(across),
      ];
    })
  );
  // Two rectangles on the floor meet unless one of their four edge directions separates them.
  const axes = [
    [1, 0],
    [0, 1],
    [Math.cos(found.heading), Math.sin(found.heading)],
    [Math.cos(across), Math.sin(across)],
  ];
  const span = (points: number[][], [ax, az]: number[]) => {
    const values = points.map(([x, z]) => x * ax + z * az);

    return [Math.min(...values), Math.max(...values)];
  };

  return axes.every((axis) => {
    const [a0, a1] = span(corners, axis);
    const [b0, b1] = span(belt, axis);

    return a0 <= b1 && b0 <= a1;
  });
};

/** How far along a belt a point in this arm's frame is. */
const alongBelt = (found: Belt, { x, z }: Pick<Point, 'x' | 'z'>) =>
  x * Math.cos(found.heading) + z * Math.sin(found.heading);

/** Whether a slot lies under a belt, give or take a pallet's reach. */
const under = (found: Belt, side: Side) => {
  const [x, , z] = slot(side);
  const sideways =
    x * Math.cos(found.heading - Math.PI / 2) +
    z * Math.sin(found.heading - Math.PI / 2);

  return (
    Math.abs(sideways - found.lateral) <
    PALLET.size[0] / 2 + found.width / 2 + 0.1
  );
};

/** Whether an arm with `belts` past it only takes cases off them: at the end of every one. */
const unloading = (belts: Belt[]) =>
  belts.length > 0 && belts.every(({ end }) => end);

/**
 * A station's layout to start with: the belt lines past it, and the buffer
 * on the first slot left, behind for choice. Pallets come and go as the
 * arm picks them up, on the slots still free.
 */
const layout = ({
  belts = [],
  shared = [],
}: {
  belts?: Belt[];
  shared?: Side[];
}): Layout => {
  if (unloading(belts)) {
    return { pallets: [], buffer: null, belts, shared };
  }

  const clear = ([5, 4, 3, 2, 1, 0] as Side[]).filter(
    (side) => !belts.some((belt) => under(belt, side))
  );
  const bufferSide = clear.find((side) => !shared.includes(side)) ?? clear[0];

  if (bufferSide === undefined) {
    throw new Error('no slot left for the buffer');
  }

  return { pallets: [], buffer: slot(bufferSide), belts, shared };
};

/** Whether a slot is the cell's own to use: free, and not shared with a neighbour. */
const own = (found: Layout, side: Side) =>
  free(found, side) && !found.shared.includes(side);

/** Whether `at` is the slot on `side`. */
const on = (at: Vector | null, side: Side) =>
  !!at && Math.hypot(at[0] - slot(side)[0], at[2] - slot(side)[2]) < 1e-9;

/** Whether a slot has nothing on it: no belt over it, no pallet, not the buffer. */
const free = ({ belts, buffer, pallets }: Layout, side: Side) =>
  !belts.some((one) => under(one, side)) &&
  !pallets.some((one) => one.side === side) &&
  !on(buffer, side);

export {
  APART,
  FINE,
  INRADIUS,
  SPREAD,
  LATERAL,
  PALLET,
  REACHABLE,
  SLOT,
  above,
  alongBelt,
  apart,
  beside,
  covers,
  extended,
  free,
  layout,
  line,
  on,
  onBelt,
  onLine,
  own,
  reaches,
  slot,
  stretch,
  unloading,
};
export type { Belt, Layout, Line, Pallet, Vector };
