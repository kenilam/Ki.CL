// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Constants
import {
  BUFFER,
  PALLET,
} from '@/views/experiments/factory-arm/scene/constants';

/** How far past each pallet's edge the camera sees, in metres. */
const MARGIN = 0.15;

/** What the overhead camera covers, from above: both pallets and a margin. */
const VIEW = [PALLET.position, BUFFER.position].map(([x, , z]) => ({
  x: [x - PALLET.size[0] / 2 - MARGIN, x + PALLET.size[0] / 2 + MARGIN],
  z: [z - PALLET.size[2] / 2 - MARGIN, z + PALLET.size[2] / 2 + MARGIN],
}));

/**
 * The obstacles the overhead 3D camera sees before the arm moves, as in the
 * cell the article describes: anything over or beside the pallets it works.
 * The arm starts out knowing these; its sensors find the rest on the way.
 */
const vision = (solids: Solid[]) =>
  solids
    .filter(({ min, max }) =>
      VIEW.some(
        ({ x, z }) =>
          min.x < x[1] && max.x > x[0] && min.z < z[1] && max.z > z[0]
      )
    )
    .map(({ id }) => id);

export { vision };
