// Constants
import {
  BUFFER,
  PALLET,
} from '@/views/experiments/factory-arm/scene/constants';

/** Space kept between a case and a taller neighbour, as on the incoming pallet. */
const GAP = 0.01;

/** Tallest the load may stand above the pallet's boards, in metres. */
const LIMIT = 1;

/**
 * Tallest a column may stand for how narrow it is: its height above the
 * boards over the narrowest width it rests on. Two small cases on end pass;
 * a third makes a tower that tips at a nudge.
 */
const SLENDER = 2.5;

/** Share of a case's base that must rest on what is under it. */
const SUPPORT = 0.75;

/** Heights closer than this count as one level, past settling. */
const LEVEL = 0.02;

/** How close a side must be to a wall or neighbour to count as touching it. */
const TOUCH = 0.015;

const [WIDTH, BOARDS, DEPTH] = PALLET.size;

/** A pallet's edges from above. */
type Edges = { x: [number, number]; z: [number, number] };

const edgesOf = ([x, , z]: [number, number, number]): Edges => ({
  x: [x - WIDTH / 2, x + WIDTH / 2],
  z: [z - DEPTH / 2, z + DEPTH / 2],
});

/**
 * The pallets cases can be set down on out of the way: the buffer, and the
 * incoming pallet, which has room once cases have come off it.
 */
const AREAS = {
  buffer: edgesOf(BUFFER.position),
  pallet: edgesOf(PALLET.position),
};

export { AREAS, BOARDS, GAP, LEVEL, LIMIT, SLENDER, SUPPORT, TOUCH };
export type { Edges };
