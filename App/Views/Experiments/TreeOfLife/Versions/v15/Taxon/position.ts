import THREE from '@/Three';

import { lerp, random } from './seed';

/**
 * Where a taxon's branch ends up.
 *
 * The tip is derived rather than passed in, so a caller only has to say where
 * a branch leaves - the taxon works out where it arrives. It is seeded on
 * `nodeId`, so the same taxon lands in the same place on every reload without
 * any layout being stored.
 *
 * Direction leans *outward from the origin*, which is where the root of the
 * tree sits: growth radiates away from the origin of life rather than folding
 * back through it. The seeded part is a cone around that outward bearing, so
 * siblings fan out instead of stacking.
 */

/**
 * Branch length as a multiple of the body it terminates in.
 *
 * Siblings all leave the same point inside the same cone, so how far apart
 * their tips land is a product of length, not of angle - at a short length a
 * whole clade arrives inside a couple of body widths and reads as one lump.
 * Reaching further separates them without widening the fan into a disc.
 */
const LENGTH_PER_SIZE = 11.5;
/**
 * Length varies by ±this fraction, so a fan never looks combed - and, more
 * usefully, so siblings do not all come to rest on the same shell, which is
 * what makes a dense fan read as a ring rather than a spray.
 */
const LENGTH_VARIANCE = 0.52;
/**
 * Half-angle of the cone around the outward bearing.
 *
 * Length separates tips along the bearing; this separates them *across* it.
 * Both are needed - reaching further with a narrow cone gives a longer, no
 * less crowded spike, and widening alone flattens a clade into a disc.
 */
const SPREAD = Math.PI / 2.3;

export function tipFor({
  start,
  nodeId,
  size,
}: {
  start: THREE.Vector3;
  nodeId: string;
  size: number;
}): THREE.Vector3 {
  const next = random(`${nodeId}:tip`);

  // Outward from the origin; at the origin itself there is no bearing to
  // lean on, so any direction is as good as another.
  const outward =
    start.lengthSq() > 1e-6
      ? start.clone().normalize()
      : new THREE.Vector3(0, 1, 0);

  const helper =
    Math.abs(outward.y) < 0.99
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);

  const side = new THREE.Vector3().crossVectors(helper, outward).normalize();
  const lift = new THREE.Vector3().crossVectors(outward, side).normalize();

  // A point in the cone: `polar` off the bearing, `azimuth` around it.
  const polar = Math.acos(lerp(Math.cos(SPREAD), 1, next()));
  const azimuth = next() * Math.PI * 2;

  const direction = outward
    .clone()
    .multiplyScalar(Math.cos(polar))
    .addScaledVector(side, Math.sin(polar) * Math.cos(azimuth))
    .addScaledVector(lift, Math.sin(polar) * Math.sin(azimuth))
    .normalize();

  const length =
    size *
    LENGTH_PER_SIZE *
    lerp(1 - LENGTH_VARIANCE, 1 + LENGTH_VARIANCE, next());

  return start.clone().addScaledVector(direction, length);
}
