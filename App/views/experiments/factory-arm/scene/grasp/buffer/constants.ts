// Constants
import {
  BUFFER,
  PALLET,
} from '@/views/experiments/factory-arm/scene/constants';

/** Space kept between a case and a taller neighbour, as on the incoming pallet. */
const GAP = 0.01;

/** Tallest the load may stand above the pallet's boards, in metres. */
const LIMIT = 1;

/** Share of a case's base that must rest on what is under it. */
const SUPPORT = 0.75;

/** Heights closer than this count as one level, past settling. */
const LEVEL = 0.02;

/** How close a side must be to a wall or neighbour to count as touching it. */
const TOUCH = 0.015;

const [WIDTH, BOARDS, DEPTH] = PALLET.size;
const [CENTRE_X, , CENTRE_Z] = BUFFER.position;

/** The buffer pallet's edges from above. */
const EDGES = {
  x: [CENTRE_X - WIDTH / 2, CENTRE_X + WIDTH / 2] as [number, number],
  z: [CENTRE_Z - DEPTH / 2, CENTRE_Z + DEPTH / 2] as [number, number],
};

export { BOARDS, EDGES, GAP, LEVEL, LIMIT, SUPPORT, TOUCH };
