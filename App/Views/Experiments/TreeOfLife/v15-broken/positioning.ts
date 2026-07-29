/**
 * Deterministic 3D placement inside a fixed sphere — pure, no framework/three
 * dependency (unit-testable in isolation).
 *
 * The root (origin of life) sits at the sphere's centre, permanently. Every
 * other node has a stable unit *direction* from that centre — a cone-bounded
 * perturbation of its parent's direction — and sits on a depth shell whose
 * radius approaches the sphere surface asymptotically. So depth reads as
 * distance from the origin: a node's parent is always nearer the centre, its
 * descendants always further out, and the whole tree fills the sphere.
 *
 * Determinism inputs are only: the parent's direction, this node's own
 * nodeId, and its index/count among a fixed sort order of its parent's
 * children — never fetch order. Revisiting a nodeId always reproduces the
 * same point, which is why a node's position can only be computed once its
 * full ancestor chain is known.
 */

export type Vec3 = readonly [number, number, number];

export const ORIGIN: Vec3 = [0, 0, 0];

/** World radius of the containing sphere; the root sits at its centre. */
export const SPHERE_RADIUS = 100;

/**
 * Depth shell radius: r(d) = R * sqrt(d / MAX_MAPPED_DEPTH).
 *
 * The previous exponential falloff (R * (1 - 0.58^d)) reached 93% of the
 * radius by depth 5 and was pinned at 100% from about depth 20 — so every
 * node deeper than that shared one thin shell at the surface. On a deep
 * lineage that stacked 40+ ancestors into a few world units, which read as
 * a clump of abandoned geometry rather than a path.
 *
 * A sqrt mapping spends the radius across the whole realistic depth range
 * (OTOL's deepest cached lineage is 46) while still opening up quickly near
 * the centre, so shallow clades keep their spread:
 * d1≈14, d5≈31, d10≈44, d20≈62, d33≈80, d46≈94.
 */
const MAX_MAPPED_DEPTH = 52;

export function radiusForDepth(depth: number): number {
  if (depth <= 0) {
    return 0;
  }
  return SPHERE_RADIUS * Math.sqrt(Math.min(1, depth / MAX_MAPPED_DEPTH));
}

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function normalize(a: Vec3): Vec3 {
  const len = Math.sqrt(dot(a, a)) || 1;
  return scale(a, 1 / len);
}

/** FNV-1a — stable per string, no external dependency. */
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** mulberry32 — deterministic PRNG seeded from the hash above. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Small deterministic nudge so a sibling fan doesn't read as a mechanical grid. */
function applyJitter(direction: Vec3, nodeId: string, magnitude: number): Vec3 {
  const rand = mulberry32(hashString(nodeId));
  const jitter: Vec3 = [
    (rand() - 0.5) * 2,
    (rand() - 0.5) * 2,
    (rand() - 0.5) * 2,
  ];
  return normalize(add(direction, scale(jitter, magnitude)));
}

function basisFromAxis(axis: Vec3): { u: Vec3; v: Vec3 } {
  const helper: Vec3 = Math.abs(axis[1]) < 0.99 ? [0, 1, 0] : [1, 0, 0];
  const u = normalize(cross(helper, axis));
  const v = normalize(cross(axis, u));
  return { u, v };
}

/** Point `index` of `count` on a Fibonacci sphere lattice — even, pole-free coverage. */
function fibonacciSpherePoint(index: number, count: number): Vec3 {
  if (count <= 1) {
    return [0, 1, 0];
  }
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (count - 1)) * 2;
  const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * index;
  return [Math.cos(theta) * radiusAtY, y, Math.sin(theta) * radiusAtY];
}

/** Direction within a cone of `polarDeg` around `axis`, at azimuth `azimuthFraction` (0..1). */
function coneDirection(
  axis: Vec3,
  azimuthFraction: number,
  polarDeg: number
): Vec3 {
  const { u, v } = basisFromAxis(axis);
  const polarRad = (polarDeg * Math.PI) / 180;
  const azimuthRad = azimuthFraction * Math.PI * 2;
  const along = scale(axis, Math.cos(polarRad));
  const perp = add(
    scale(u, Math.cos(azimuthRad)),
    scale(v, Math.sin(azimuthRad))
  );
  return normalize(add(along, scale(perp, Math.sin(polarRad))));
}

export type SiblingInfo = {
  nodeId: string;
  ottId: number | null;
  numTips: number | null;
};

/** Fixed sort order for siblings — never fetch-order-dependent. */
export function sortSiblings<T extends SiblingInfo>(nodes: readonly T[]): T[] {
  return [...nodes].sort((a, b) => {
    const ao = a.ottId ?? Number.POSITIVE_INFINITY;
    const bo = b.ottId ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) {
      return ao - bo;
    }
    return a.nodeId.localeCompare(b.nodeId);
  });
}

const JITTER_MAGNITUDE = 0.13;
/** Golden angle — successive siblings land maximally far apart in azimuth. */
const GOLDEN_ANGLE_TURNS = 0.5 * (Math.sqrt(5) - 1);
/**
 * Siblings sitting on a mathematically perfect shell is what made the tree
 * read as a network diagram. A deterministic radial wobble — a fraction of
 * the gap to the next shell — breaks the concentric rings without breaking
 * the "depth = distance from origin" reading.
 */
const RADIAL_WOBBLE = 0.3;

/**
 * Branch thickness at a given depth: heavy near the root, fine at the tips.
 * Kept deliberately slender — a trunk reads as a vein, not a tentacle, so
 * the base is a small fraction of a typical branch's length.
 */
export function branchRadiusForDepth(
  depth: number,
  numTips?: number | null
): number {
  const base = SPHERE_RADIUS * 0.0045;
  const taper = 0.7 ** Math.max(0, depth);
  // Fatter trunks for bigger clades, log-compressed so millions of tips
  // don't dwarf everything else.
  const bulk = 1 + 0.09 * Math.log10(Math.max(1, numTips ?? 1) + 1);
  return Math.max(SPHERE_RADIUS * 0.0006, base * taper * bulk);
}

/** Fan half-angle around the parent's direction; narrows with depth so deep clades stay legible. */
function coneHalfAngleDeg(depth: number): number {
  return Math.max(14, 60 * 0.78 ** Math.max(0, depth - 2));
}

export type PositionInputs = {
  nodeId: string;
  /** Distance from the root; the root itself is depth 0. */
  depth: number;
  /**
   * The parent's own unit direction from the sphere centre. `null` only when
   * the parent *is* the root — its children spread over the whole sphere.
   */
  parentDirection: Vec3 | null;
  /** Parent's full children set, any order — sorted internally. */
  siblings: readonly SiblingInfo[];
};

export type PositionResult = {
  position: Vec3;
  /** This node's unit direction from centre — becomes `parentDirection` for its children. */
  direction: Vec3;
};

export function positionFor(input: PositionInputs): PositionResult {
  const siblings = sortSiblings(input.siblings);
  const count = Math.max(1, siblings.length);
  const index = Math.max(
    0,
    siblings.findIndex((s) => s.nodeId === input.nodeId)
  );

  let direction: Vec3;
  if (input.parentDirection === null) {
    direction = fibonacciSpherePoint(index, count);
  } else {
    /*
     * Vogel/sunflower spread inside the cone: sqrt on the polar angle keeps
     * the fan even *by area* rather than bunching siblings near the axis,
     * and a golden-angle azimuth guarantees neighbours never share a
     * bearing. Deliberately NOT weighted by numTips — real clades range from
     * millions of tips to zero, and weighting collapsed every small sibling
     * into one unreadable clump.
     */
    const polarFraction = Math.sqrt((index + 0.5) / count);
    const polarDeg = coneHalfAngleDeg(input.depth) * polarFraction;
    const azimuthFraction = (index * GOLDEN_ANGLE_TURNS) % 1;
    direction = coneDirection(input.parentDirection, azimuthFraction, polarDeg);
  }

  direction = applyJitter(direction, input.nodeId, JITTER_MAGNITUDE);

  // Deterministic radial wobble within the gap to the next shell.
  const shell = radiusForDepth(input.depth);
  const gap = radiusForDepth(input.depth + 1) - shell;
  const wobbleRand = mulberry32(hashString(`${input.nodeId}:radius`));
  const radius = shell + (wobbleRand() - 0.5) * 2 * RADIAL_WOBBLE * gap;

  return {
    position: scale(direction, Math.max(0, radius)),
    direction,
  };
}
