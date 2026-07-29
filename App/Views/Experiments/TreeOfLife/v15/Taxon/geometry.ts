import THREE from '@/Three';

import { random } from './seed';

/**
 * The two pieces of a taxon: the branch that reaches it, and the body at the
 * tip.
 *
 * The branch is swept by hand rather than built with `THREE.TubeGeometry`,
 * which holds one radius for its whole length. Sweeping the rings gives both
 * the taper from `startWidth` to `endWidth` and a per-vertex colour ramp, so
 * the connection itself carries the inheritance from one colour to the next.
 */

/** Rings along the path — enough for a smooth taper without heavy geometry. */
const PATH_STEPS = 26;
/** Sides per ring. Branches are thin; 7 reads as round at a fraction of the cost. */
const RADIAL_SEGMENTS = 7;
/** Sideways bow, as a fraction of the branch's own length. */
const BOW = 0.17;

/**
 * The path a branch follows: bowed off the straight chord so it arcs like
 * growth rather than a ruled line. Which way it bows is seeded, so a branch
 * always curves the same way.
 */
export function branchCurve(
  start: THREE.Vector3,
  tip: THREE.Vector3,
  nodeId: string
): THREE.CatmullRomCurve3 {
  const axis = new THREE.Vector3().subVectors(tip, start);
  const length = axis.length() || 1;
  const direction = axis.clone().normalize();

  const helper =
    Math.abs(direction.y) < 0.99
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);

  const side = new THREE.Vector3().crossVectors(helper, direction).normalize();
  const lift = new THREE.Vector3().crossVectors(direction, side).normalize();

  const angle = random(`${nodeId}:bow`)() * Math.PI * 2;
  const bow = length * BOW;

  const offset = side
    .clone()
    .multiplyScalar(Math.cos(angle) * bow)
    .add(lift.clone().multiplyScalar(Math.sin(angle) * bow));

  // Two interior controls relax it into an S rather than a single arc.
  return new THREE.CatmullRomCurve3([
    start.clone(),
    start
      .clone()
      .addScaledVector(axis, 0.33)
      .add(offset.clone().multiplyScalar(0.85)),
    start
      .clone()
      .addScaledVector(axis, 0.68)
      .add(offset.clone().multiplyScalar(0.55)),
    tip.clone(),
  ]);
}

export type Branch = {
  geometry: THREE.BufferGeometry;
  curve: THREE.CatmullRomCurve3;
  /** Indices per ring, so the reveal can advance a ring at a time. */
  indicesPerStep: number;
  steps: number;
};

export function createBranch({
  start,
  tip,
  startWidth,
  endWidth,
  startColor,
  endColor,
  nodeId,
}: {
  start: THREE.Vector3;
  tip: THREE.Vector3;
  startWidth: number;
  endWidth: number;
  startColor: string;
  endColor: string;
  nodeId: string;
}): Branch {
  const curve = branchCurve(start, tip, nodeId);
  const frames = curve.computeFrenetFrames(PATH_STEPS, false);

  const from = new THREE.Color(startColor);
  const to = new THREE.Color(endColor);
  const colour = new THREE.Color();

  const vertexCount = (PATH_STEPS + 1) * (RADIAL_SEGMENTS + 1);
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);

  for (let i = 0; i <= PATH_STEPS; i += 1) {
    const along = i / PATH_STEPS;
    const point = curve.getPointAt(along);
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];

    if (!normal || !binormal) {
      continue;
    }

    // Smoothstep keeps the taper gradual at both ends, with no visible step.
    const eased = along * along * (3 - 2 * along);
    const radius = startWidth / 2 + (endWidth / 2 - startWidth / 2) * eased;

    colour.copy(from).lerp(to, eased);

    for (let j = 0; j <= RADIAL_SEGMENTS; j += 1) {
      const angle = (j / RADIAL_SEGMENTS) * Math.PI * 2;
      const sin = Math.sin(angle);
      const cos = -Math.cos(angle);

      const x = cos * normal.x + sin * binormal.x;
      const y = cos * normal.y + sin * binormal.y;
      const z = cos * normal.z + sin * binormal.z;

      const index = (i * (RADIAL_SEGMENTS + 1) + j) * 3;

      positions[index] = point.x + radius * x;
      positions[index + 1] = point.y + radius * y;
      positions[index + 2] = point.z + radius * z;

      normals[index] = x;
      normals[index + 1] = y;
      normals[index + 2] = z;

      colors[index] = colour.r;
      colors[index + 1] = colour.g;
      colors[index + 2] = colour.b;
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
    curve,
    indicesPerStep: RADIAL_SEGMENTS * 6,
    steps: PATH_STEPS,
  };
}

/**
 * Body silhouettes. Rank drives the form: high ranks are larger, softer and
 * more complex; low ranks are compact and tighter; an unknown rank gets a
 * soft-cornered cube, so "no rank" is never drawn as a plain sphere.
 */
export type Form = 'bloom' | 'lobed' | 'compact' | 'blob';

export function formForRank(rank?: string | null): Form {
  const value = (rank ?? '').trim().toLowerCase().replace(/[_-]+/g, ' ');

  if (!value || value.startsWith('no rank') || value === 'clade') {
    return 'blob';
  }

  if (/(^|\s)(domain|superkingdom|kingdom)(\s|$)/.test(value)) {
    return 'bloom';
  }

  if (
    /(^|\s)(phylum|division|class|subclass|superclass|order|suborder|infraorder|superorder|family|subfamily|tribe|superfamily)(\s|$)/.test(
      value
    )
  ) {
    return 'lobed';
  }

  return 'compact';
}

/** Relative body size by form — higher ranks read larger. */
export const FORM_SCALE: Record<Form, number> = {
  bloom: 1.15,
  lobed: 1,
  compact: 0.82,
  blob: 0.92,
};

const FORM_SURFACE: Record<
  Form,
  { detail: number; wobble: number; frequency: number }
> = {
  bloom: { detail: 4, wobble: 0.2, frequency: 2.1 },
  lobed: { detail: 3, wobble: 0.15, frequency: 2.8 },
  compact: { detail: 2, wobble: 0.09, frequency: 3.6 },
  blob: { detail: 3, wobble: 0.12, frequency: 2.4 },
};

/**
 * Smooth pseudo-noise from summed sinusoids — cheap, seeded, and continuous
 * over the surface, which is all the wobble needs to avoid looking machined.
 */
function wobbleAt(
  x: number,
  y: number,
  z: number,
  frequency: number,
  phase: readonly number[]
): number {
  return (
    (Math.sin(x * frequency + (phase[0] ?? 0)) *
      Math.cos(y * frequency * 0.9 + (phase[1] ?? 0)) +
      Math.sin(y * frequency * 1.3 + (phase[2] ?? 0)) *
        Math.cos(z * frequency * 1.1 + (phase[3] ?? 0)) +
      Math.sin(z * frequency * 0.8 + (phase[4] ?? 0)) *
        Math.cos(x * frequency * 1.2 + (phase[5] ?? 0))) /
    3
  );
}

/** A unit-radius organic body, deterministic per `nodeId`. */
export function createBody(nodeId: string, form: Form): THREE.BufferGeometry {
  const surface = FORM_SURFACE[form];
  const next = random(`${nodeId}:body`);
  const phase = Array.from({ length: 6 }, () => next() * Math.PI * 2);

  const geometry: THREE.BufferGeometry =
    form === 'blob'
      ? new THREE.BoxGeometry(1.35, 1.35, 1.35, 6, 6, 6)
      : new THREE.IcosahedronGeometry(1, surface.detail);

  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);

    if (form === 'blob') {
      // Round the cube off, keeping a hint of its corners.
      const length = vertex.length();

      vertex.normalize().multiplyScalar(0.72 + length * 0.2);
    } else {
      vertex.normalize();
    }

    vertex.multiplyScalar(
      1 +
        wobbleAt(vertex.x, vertex.y, vertex.z, surface.frequency, phase) *
          surface.wobble
    );

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}
