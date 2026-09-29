// Grid
import { PALLET } from '../grid/layout';

/** The top of a pallet's boards, where the first layer stands. */
const DECK = PALLET.size[1];

/** Room kept on a belt round a drop for the last case to move on, in metres. */
const ROOM = 0.6;

/**
 * How far up the belt the arm looks before coming down onto it, in metres:
 * the room, and what the belt carries along in the time it takes to come
 * down and let go, about two and a half seconds.
 */
const LOOKOUT = ROOM + 0.35 * 2.5;

/** Seconds after an obstacle last moved before refused cases are tried again. */
const SETTLE = 0.4;

export { DECK, LOOKOUT, ROOM, SETTLE };
