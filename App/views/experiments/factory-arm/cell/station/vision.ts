// Protocol
import type { Box } from '../protocol';

// Grid
import { type Layout, PALLET } from '../grid/layout';

/** How far past each pallet's edge the camera sees, in metres. */
const MARGIN = 0.15;

/** What the overhead camera covers, from above: every pallet and a margin. */
const view = ({ buffer, pallets }: Layout) =>
  [...pallets.map(({ at }) => at), ...(buffer ? [buffer] : [])].map(
    ([x, , z]) => ({
      x: [x - PALLET.size[0] / 2 - MARGIN, x + PALLET.size[0] / 2 + MARGIN],
      z: [z - PALLET.size[2] / 2 - MARGIN, z + PALLET.size[2] / 2 + MARGIN],
    })
  );

/**
 * The obstacles the overhead 3D camera sees before an arm moves: anything
 * over or beside the pallets. The hub starts out knowing these; the arms'
 * own sensors find the rest on the way and report them.
 */
const vision = (layout: Layout, boxes: Box[]) =>
  boxes
    .filter(({ min, max }) =>
      view(layout).some(
        ({ x, z }) =>
          min.x < x[1] && max.x > x[0] && min.z < z[1] && max.z > z[0]
      )
    )
    .map(({ id }) => id);

export { vision };
