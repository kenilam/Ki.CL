// Partials
import { centre, type Hex, index, parse, type Side } from './hex';
import { slot } from './layout';

/**
 * One of the six slots round an arm's hex, addressed as H3 addresses a
 * child cell: by its parent and which one it is. A pallet stands on one.
 */
type Child = { parent: Hex; slot: Side };

const childIndex = ({ parent, slot: side }: Child) =>
  `${index(parent)}/${side}`;

const parseChild = (key: string): Child => {
  const [parent, side] = key.split('/');

  return { parent: parse(parent), slot: Number(side) as Side };
};

/** Where a slot's centre is on the floor, in metres. */
const childCentre = ({ parent, slot: side }: Child) => {
  const [x, , z] = slot(side);
  const at = centre(parent);

  return { x: at.x + x, z: at.z + z };
};

export { childCentre, childIndex, parseChild };
export type { Child };
