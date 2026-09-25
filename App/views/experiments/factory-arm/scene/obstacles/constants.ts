// Spec
import type { Solid } from './spec';

/*
 * Fixed obstacles the arm isn't told about: its sensors have to find them.
 * The pillar stands in the swing to the belt, the crate on the way from the
 * pallet to the buffer, and the beam hangs low over the pallet's front, so
 * some cases under it can't be lifted out at all.
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
    min: { x: -1.3, y: 1.95, z: 0.5 },
    max: { x: -0.35, y: 2.1, z: 0.7 },
  },
];

export { OBSTACLES };
