import { THREE } from '@/three';

// Anchors
import { reach } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Constants
import {
  FALLBACK_REACH,
  MIN_RADIUS,
  PADDING,
  TILT,
  WORLD_UP,
} from './constants';

// Rig
import type { Rig } from './use-rig';

type Props = Pick<Rig, 'facing' | 'lifted' | 'near' | 'scratch' | 'upright'> & {
  ancestor: readonly [number, number, number] | null;
  anchor: readonly [number, number, number];
  /** How far right of centre the taxon should sit, in CSS pixels. */
  offsetPx: number;
  perspective: THREE.PerspectiveCamera;
  size: { width: number; height: number };
};

/** Compute and store the near pose: the taxon beside the ancestor it grew from. */
const settle = ({
  ancestor,
  anchor,
  facing,
  lifted,
  near,
  offsetPx,
  perspective,
  scratch,
  size,
  upright,
}: Props): void => {
  const pose = near.current;

  pose.target.set(...anchor);

  // Without an anchored ancestor, fall back to a slice of the tree's extent.
  const radius = ancestor
    ? Math.max(
        MIN_RADIUS,
        pose.target.distanceTo(scratch.current.set(...ancestor)) * PADDING
      )
    : Math.max(MIN_RADIUS, reach() * FALLBACK_REACH);

  const verticalFov = (perspective.fov * Math.PI) / 180;
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * perspective.aspect);

  pose.distance = Math.max(
    radius / Math.tan(verticalFov / 2),
    radius / Math.tan(horizontalFov / 2)
  );

  /*
   * Stand inward of the taxon. Growth radiates outward from the origin, so its
   * descendants end up behind it rather than between it and the lens.
   */
  const outward = upright.current.copy(pose.target);

  if (outward.lengthSq() < 1e-6) {
    outward.set(0, 0, 1);
  }

  outward.normalize();

  const helper =
    Math.abs(outward.y) < 0.99
      ? scratch.current.set(0, 1, 0)
      : scratch.current.set(1, 0, 0);
  const side = facing.current.crossVectors(helper, outward).normalize();
  const lift = lifted.current.crossVectors(outward, side).normalize();

  pose.bearing
    .copy(outward)
    .multiplyScalar(-Math.cos(TILT))
    .addScaledVector(lift, Math.sin(TILT) * 0.82)
    .addScaledVector(side, Math.sin(TILT) * 0.57)
    .normalize();

  // Slide the target left, which puts the taxon right of centre.
  const worldPerPx =
    (2 * pose.distance * Math.tan(verticalFov / 2)) / size.height;

  pose.target.addScaledVector(
    scratch.current
      .crossVectors(facing.current.copy(pose.bearing).negate(), WORLD_UP)
      .normalize(),
    -offsetPx * worldPerPx
  );
};

export { settle };
