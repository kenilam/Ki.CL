// Spec
import type { Solid } from './spec';

/*
 * Obstacles the arm isn't told about, where they start; the operator can move
 * them. The overhead camera sees the ones over or beside the pallets before
 * the arm moves; its sensors find the rest on the way. The pillar stands in the swing to the belt and the crate
 * on the way from the pallet to the buffer. The beam hangs low behind the
 * pallet, out of the arm's swing, where it stops one case in the back row
 * being lifted out.
 */
const OBSTACLES: Solid[] = [
  {
    id: 'pillar',
    min: { x: 0.78, y: 0, z: 0.88 },
    max: { x: 0.92, y: 2.3, z: 1.02 },
  },
  {
    id: 'crate',
    min: { x: -1.25, y: 0, z: 1.02 },
    max: { x: -0.8, y: 1.6, z: 1.45 },
  },
  {
    id: 'beam',
    min: { x: -1.9, y: 1.3, z: -0.35 },
    max: { x: -0.9, y: 1.45, z: -0.22 },
  },
];

/** How far one press of an arrow key moves an obstacle, in metres. */
const STEP = 0.05;

/** How high an obstacle's top may be raised, in metres. */
const CEILING = 3;

export { CEILING, OBSTACLES, STEP };
