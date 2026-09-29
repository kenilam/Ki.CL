// Protocol
import type { Ease, Point, Pose } from '../protocol';

// Model
import { shortest } from '../model/kinematics';

// Constants
import { LINE } from './constants';

/** A straight pad move under way: how long it is, how far along, and the turn made over it. */
type Segment = {
  from: Pose;
  to: Pose;
  ease: Ease;
  length: number;
  travelled: number;
  turn: number;
};

const distance = (a: Point, b: Point) =>
  Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);

/**
 * How fast to move along a line, given how far the pad has come and how far
 * there is to go. Contact is at the end when arriving and at the start when
 * leaving; within `LINE.near` of it the speed eases down to `LINE.slow`, so
 * the pad meets a case gently and lifts it out gently.
 */
const speed = (ease: Ease, travelled: number, remaining: number) => {
  if (ease === 'swing') {
    return LINE.swing;
  }

  const near = ease === 'arrive' ? remaining : travelled;
  const share = Math.min(1, Math.max(0, near / LINE.near));
  const smooth = share * share * (3 - 2 * share);

  return LINE.slow + (LINE.fast - LINE.slow) * smooth;
};

const begin = (from: Pose, to: Pose, ease: Ease): Segment => ({
  from,
  to,
  ease,
  length: distance(from.at, to.at),
  travelled: 0,
  turn: shortest(from.facing, to.facing),
});

/** The segment `dt` seconds further on. */
const advance = (segment: Segment, dt: number): Segment => ({
  ...segment,
  travelled: Math.min(
    segment.length,
    segment.travelled +
      speed(
        segment.ease,
        segment.travelled,
        segment.length - segment.travelled
      ) *
        dt
  ),
});

/** Where the pad is sent this step: along the line, turning as it goes. */
const pose = ({ from, to, length, travelled, turn }: Segment): Pose => {
  const share = length ? travelled / length : 1;

  return {
    at: {
      x: from.at.x + (to.at.x - from.at.x) * share,
      y: from.at.y + (to.at.y - from.at.y) * share,
      z: from.at.z + (to.at.z - from.at.z) * share,
    },
    facing: from.facing + turn * share,
  };
};

const finished = (segment: Segment) => segment.travelled >= segment.length;

export { advance, begin, finished, pose };
export type { Segment };
