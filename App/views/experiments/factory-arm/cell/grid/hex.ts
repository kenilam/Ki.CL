/*
 * The floor as hexagons, one arm to a cell, indexed the way H3 does it: axial
 * coordinates, six neighbours each. Flat-topped, so a row of cells runs along z.
 */

/** A cell's axial coordinates. */
type Hex = { q: number; r: number };

/** Which of a cell's six sides, counted round from the one at 30° off +x. */
type Side = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * A cell's inradius in metres: half the distance between two arms' bases.
 * Wide enough for two pallets and a buffer round one arm, close enough that
 * a belt from one arm's drop reaches the next arm's pick.
 */
const INRADIUS = 2;

/** From centre to corner. */
const RADIUS = INRADIUS / (Math.sqrt(3) / 2);

/** The axial step to each neighbour, by side. */
const STEPS: Hex[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

const SIDES: Side[] = [0, 1, 2, 3, 4, 5];

const index = ({ q, r }: Hex) => `${q},${r}`;

const parse = (key: string): Hex => {
  const [q, r] = key.split(',').map(Number);

  return { q, r };
};

/** Where a cell's centre is on the floor, in metres. */
const centre = ({ q, r }: Hex) => ({
  x: RADIUS * 1.5 * q,
  z: RADIUS * Math.sqrt(3) * (r + q / 2),
});

const neighbour = ({ q, r }: Hex, side: Side): Hex => ({
  q: q + STEPS[side].q,
  r: r + STEPS[side].r,
});

/** The heading from a cell's centre out through a side, in radians from +x toward +z. */
const heading = (side: Side) => {
  const from = centre({ q: 0, r: 0 });
  const to = centre(STEPS[side]);

  return Math.atan2(to.z - from.z, to.x - from.x);
};

/** The cell a point on the floor is in: the axial coordinates nearest it, rounded as cube coordinates. */
const at = ({ x, z }: { x: number; z: number }): Hex => {
  const q = (x * 2) / 3 / RADIUS;
  const r = (-x / 3 + (Math.sqrt(3) / 3) * z) / RADIUS;
  const s = -q - r;
  let rq = Math.round(q);
  let rr = Math.round(r);
  const rs = Math.round(s);
  const dq = Math.abs(rq - q);
  const dr = Math.abs(rr - r);
  const ds = Math.abs(rs - s);

  if (dq > dr && dq > ds) {
    rq = -rr - rs;
  } else if (dr > ds) {
    rr = -rq - rs;
  }

  return { q: rq, r: rr };
};

/** The side of the neighbour that faces back. */
const opposite = (side: Side): Side => ((side + 3) % 6) as Side;

/** Which side of `from` faces `to`, if they touch. */
const facing = (from: Hex, to: Hex) =>
  SIDES.find(
    (side) => from.q + STEPS[side].q === to.q && from.r + STEPS[side].r === to.r
  );

export {
  INRADIUS,
  RADIUS,
  SIDES,
  at,
  centre,
  facing,
  heading,
  index,
  neighbour,
  opposite,
  parse,
};
export type { Hex, Side };
