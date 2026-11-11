import { THREE } from '@/three';

import { random } from './seed';

/**
 * The branch is swept by hand rather than built with `THREE.TubeGeometry`,
 * which holds one radius for its whole length. Sweeping the rings gives the
 * taper and a per-vertex colour ramp from the parent's colour to this one.
 */

/** Rings along the path - enough for a smooth taper without heavy geometry. */
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
