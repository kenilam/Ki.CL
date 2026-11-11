import { THREE } from '@/three';

// Constants
import { TILT_LIMIT } from './constants';

// Rig
import type { Rig } from './use-rig';

type Props = Pick<Rig, 'across' | 'spin' | 'tilt'> & {
  /** How much of the drag is in effect at this zoom. */
  authority: number;
  bearing: THREE.Vector3;
  up: THREE.Vector3;
};

/** Turns the bearing by what the drag has added, weighted by the zoom. */
const orbit = ({ across, authority, bearing, spin, tilt, up }: Props) => {
  if (spin.current !== 0) {
    bearing.applyAxisAngle(up, spin.current * authority);
  }

  if (tilt.current !== 0) {
    // Clamped by how far the bearing already leans, which varies with the zoom.
    const side = across.current.crossVectors(up, bearing);

    if (side.lengthSq() > 1e-6) {
      side.normalize();

      const leaning = Math.acos(Math.min(Math.max(bearing.dot(up), -1), 1));
      const wantedLean = leaning + tilt.current;
      const allowed = Math.min(
        Math.max(wantedLean, TILT_LIMIT),
        Math.PI - TILT_LIMIT
      );

      bearing.applyAxisAngle(side, (allowed - leaning) * authority);
    }
  }
};

export { orbit };
