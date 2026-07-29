import * as THREE from 'three';

/**
 * A branch is built as a swept tube whose radius tapers smoothly from the
 * ancestor end to the descendant end, along a curved path rather than a
 * straight chord. Vertex colours interpolate ancestor → descendant so the
 * connection itself carries the inheritance.
 *
 * THREE.TubeGeometry can't do this — its radius is constant — so the rings
 * are swept by hand, which also gives us per-vertex colour for free.
 */

/** Rings along the path. Enough for a smooth taper without heavy geometry. */
const PATH_STEPS = 26;
/** Sides per ring. Branches are thin; 7 reads as round without the cost. */
const RADIAL_SEGMENTS = 7;

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Control path from `from` to `to`, bowed sideways and lifted off the chord
 * so branches arc like growth rather than ruled lines. The bow direction is
 * seeded by `seed`, so a given branch always curves the same way.
 */
export function buildBranchCurve(
  from: THREE.Vector3,
  to: THREE.Vector3,
  seed: string
): THREE.CatmullRomCurve3 {
  const axis = new THREE.Vector3().subVectors(to, from);
  const length = axis.length() || 1;
  const direction = axis.clone().normalize();

  const helper =
    Math.abs(direction.y) < 0.99
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
  const side = new THREE.Vector3().crossVectors(helper, direction).normalize();
  const lift = new THREE.Vector3().crossVectors(direction, side).normalize();

  const rand = hashString(seed) / 0xffffffff;
  const angle = rand * Math.PI * 2;
  // Bow is a fraction of the branch's own length, so long and short branches
  // curve by a proportionate amount.
  const bow = length * 0.17;

  const offset = side
    .clone()
    .multiplyScalar(Math.cos(angle) * bow)
    .add(lift.clone().multiplyScalar(Math.sin(angle) * bow));

  // Two interior controls give an S-relaxation rather than a single arc.
  const first = from
    .clone()
    .addScaledVector(axis, 0.33)
    .add(offset.clone().multiplyScalar(0.85));
  const second = from
    .clone()
    .addScaledVector(axis, 0.68)
    .add(offset.clone().multiplyScalar(0.55));

  return new THREE.CatmullRomCurve3([from.clone(), first, second, to.clone()]);
}

export type TaperedTubeInput = {
  from: readonly [number, number, number];
  to: readonly [number, number, number];
  /** Radius at the ancestor end — the thicker one. */
  fromRadius: number;
  /** Radius at the descendant end. */
  toRadius: number;
  fromColor: string;
  toColor: string;
  seed: string;
};

export type TaperedTube = {
  geometry: THREE.BufferGeometry;
  /** Indices per ring step, so growth can be animated via setDrawRange. */
  indicesPerStep: number;
  steps: number;
};

export function createTaperedTube({
  from,
  to,
  fromRadius,
  toRadius,
  fromColor,
  toColor,
  seed,
}: TaperedTubeInput): TaperedTube {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const curve = buildBranchCurve(start, end, seed);

  const frames = curve.computeFrenetFrames(PATH_STEPS, false);
  const startColor = new THREE.Color(fromColor);
  const endColor = new THREE.Color(toColor);
  const scratch = new THREE.Color();

  const vertexCount = (PATH_STEPS + 1) * (RADIAL_SEGMENTS + 1);
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);

  for (let i = 0; i <= PATH_STEPS; i += 1) {
    const t = i / PATH_STEPS;
    const point = curve.getPointAt(t);
    const normal = frames.normals[i]!;
    const binormal = frames.binormals[i]!;

    // smoothstep keeps the taper gradual at both ends — no visible step.
    const eased = t * t * (3 - 2 * t);
    const radius = fromRadius + (toRadius - fromRadius) * eased;
    scratch.copy(startColor).lerp(endColor, eased);

    for (let j = 0; j <= RADIAL_SEGMENTS; j += 1) {
      const angle = (j / RADIAL_SEGMENTS) * Math.PI * 2;
      const sin = Math.sin(angle);
      const cos = -Math.cos(angle);

      const nx = cos * normal.x + sin * binormal.x;
      const ny = cos * normal.y + sin * binormal.y;
      const nz = cos * normal.z + sin * binormal.z;

      const index = (i * (RADIAL_SEGMENTS + 1) + j) * 3;
      positions[index] = point.x + radius * nx;
      positions[index + 1] = point.y + radius * ny;
      positions[index + 2] = point.z + radius * nz;

      normals[index] = nx;
      normals[index + 1] = ny;
      normals[index + 2] = nz;

      colors[index] = scratch.r;
      colors[index + 1] = scratch.g;
      colors[index + 2] = scratch.b;
    }
  }

  const indices: number[] = [];
  for (let i = 0; i < PATH_STEPS; i += 1) {
    for (let j = 0; j < RADIAL_SEGMENTS; j += 1) {
      const a = i * (RADIAL_SEGMENTS + 1) + j;
      const b = a + RADIAL_SEGMENTS + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(indices);

  return {
    geometry,
    indicesPerStep: RADIAL_SEGMENTS * 6,
    steps: PATH_STEPS,
  };
}

/**
 * Sample the exact curve a branch is drawn along, in world space. The label
 * layer uses this to treat branches as obstacles, so it has to be the same
 * path the geometry uses — hence sharing the builder rather than
 * approximating with a straight line.
 */
export function sampleBranchCurve(
  from: readonly [number, number, number],
  to: readonly [number, number, number],
  seed: string,
  count = 10
): Array<[number, number, number]> {
  const curve = buildBranchCurve(
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
    seed
  );
  const out: Array<[number, number, number]> = [];
  for (let i = 0; i <= count; i += 1) {
    const point = curve.getPointAt(i / count);
    out.push([point.x, point.y, point.z]);
  }
  return out;
}
