import { THREE } from '@/three';

// Anchors
import { spread } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Constants
import { TRUNK_SIZE } from '@/views/experiments/tree-of-life/explorer/constants';
import { LEAN, ROLL, WORLD_UP } from './constants';

// Parts
import { distanceToFit } from './fit';
import { fly } from './fly';
import { orbit } from './orbit';

// Rig
import type { Rig } from './use-rig';

type Props = Omit<Rig, 'framed' | 'held' | 'placed' | 'waiting' | 'wanted'> & {
  anchor: readonly [number, number, number];
  marginPx: number;
  perspective: THREE.PerspectiveCamera;
  size: { width: number; height: number };
};

/**
 * Write the camera for the current zoom, blending the near pose into the far
 * one. Every field moves on the same eased parameter, so the pan, the rotation
 * and the dolly stay one motion.
 */
const compose = ({
  across,
  anchor,
  centre,
  departed,
  facing,
  flying,
  hand,
  lifted,
  marginPx,
  near,
  perspective,
  scratch,
  size,
  spin,
  tilt,
  travel,
  upright,
  zoom,
}: Props): void => {
  // Smoothstep, so neither end of the range starts or stops abruptly.
  const t = zoom.current;
  const eased = t * t * (3 - 2 * t);

  const pose = fly({ departed, flying, near, travel });

  /*
   * The far pose stands the lineage upright, the taxon above and the origin
   * below, so the origin→focus axis becomes the screen's up. The origin itself
   * has no such axis, so it falls back to the world's up.
   */
  const lineage = centre.current.set(...anchor);
  const height = lineage.length();

  const axis =
    height < 1e-3
      ? upright.current.copy(WORLD_UP)
      : upright.current.copy(lineage).divideScalar(height);

  // Halfway along the lineage, so both ends sit the same distance off centre.
  const farTarget = lineage.multiplyScalar(0.5);

  /*
   * Sized to the taxa, not to the globe around them: enclosing the globe too
   * shrinks the lineage to a fifth of the screen.
   */
  const farDistance = distanceToFit(
    spread(farTarget.x, farTarget.y, farTarget.z) + TRUNK_SIZE,
    perspective,
    size,
    marginPx
  );

  // Projected into the axis's plane, so the camera stays on the side it was on.
  const farBearing = facing.current.copy(pose.bearing).projectOnPlane(axis);

  if (farBearing.lengthSq() < 1e-6) {
    farBearing.set(axis.z, axis.x, axis.y).projectOnPlane(axis);
  }

  farBearing.normalize();

  farBearing
    .multiplyScalar(Math.cos(LEAN))
    .addScaledVector(axis, -Math.sin(LEAN))
    .normalize();

  const up = lifted.current.copy(WORLD_UP).lerp(axis, eased).normalize();
  const bearing = farBearing.lerpVectors(pose.bearing, farBearing, eased);

  bearing.normalize();

  /*
   * The pull-back takes the orientation over as it goes. Held as a weight
   * rather than by clearing the drag, so zooming back in returns the view to
   * where the drag left it.
   */
  const authority = 1 - eased;

  hand.current = authority;

  orbit({ across, authority, bearing, spin, tilt, up });

  // Roll last, about the view axis, so it turns the picture.
  if (eased > 1e-4) {
    up.applyAxisAngle(bearing, ROLL * eased).normalize();
  }

  const distance = pose.distance + (farDistance - pose.distance) * eased;
  const target = scratch.current.copy(pose.target).lerp(farTarget, eased);

  perspective.position.copy(target).addScaledVector(bearing, distance);
  perspective.up.copy(up);
  perspective.lookAt(target);
};

export { compose };
