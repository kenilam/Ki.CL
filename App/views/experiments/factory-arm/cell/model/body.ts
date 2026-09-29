// Protocol
import type { Box, Joints, Point } from '../protocol';

// Model
import { GRIPPER, LINK, SIDE } from './constants';
import { frames, place } from './frames';
import { bearing, forward, turn } from './kinematics';
import { overlap, type Rect } from './rect';

/** Space kept between the arm and anything it knows is there, in metres. */
const MARGIN = 0.05;

/** Spacing of the points tested along a capsule, in metres. */
const SAMPLE = 0.05;

/** The case on the pad, as collision needs it: size, and turn and offset from the pad. */
type Carried = { size: [number, number, number]; yaw: number; offset: Point };

/** A segment with a radius around it. */
type Capsule = { from: Point; to: Point; radius: number };

const touches = (
  { from, to, radius }: Capsule,
  { min, max }: Box,
  margin: number
) => {
  const reach = radius + margin;

  // Nowhere near: the capsule's own box, grown by its reach, misses the solid.
  if (
    Math.min(from.x, to.x) - reach > max.x ||
    Math.max(from.x, to.x) + reach < min.x ||
    Math.min(from.y, to.y) - reach > max.y ||
    Math.max(from.y, to.y) + reach < min.y ||
    Math.min(from.z, to.z) - reach > max.z ||
    Math.max(from.z, to.z) + reach < min.z
  ) {
    return false;
  }

  const length = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z);
  const count = Math.max(1, Math.ceil(length / SAMPLE));

  for (let index = 0; index <= count; index++) {
    const share = index / count;
    const x = from.x + (to.x - from.x) * share;
    const y = from.y + (to.y - from.y) * share;
    const z = from.z + (to.z - from.z) * share;

    if (
      Math.hypot(
        Math.max(min.x - x, 0, x - max.x),
        Math.max(min.y - y, 0, y - max.y),
        Math.max(min.z - z, 0, z - max.z)
      ) < reach
    ) {
      return true;
    }
  }

  return false;
};

/** An upright box, by its outline from above and its height range. */
const meets = (
  outline: Rect,
  low: number,
  high: number,
  solid: Box,
  margin: number
) =>
  high > solid.min.y - margin &&
  low < solid.max.y + margin &&
  overlap(
    outline,
    {
      x: (solid.min.x + solid.max.x) / 2,
      z: (solid.min.z + solid.max.z) / 2,
      half: [(solid.max.x - solid.min.x) / 2, (solid.max.z - solid.min.z) / 2],
      yaw: 0,
    },
    -margin
  );

/** The upper arm, the elbow housing and the forearm, as capsules at `joints`. */
const links = (joints: Joints): Capsule[] => {
  const { fore, upper } = frames(joints);

  return [
    {
      from: place(upper, [SIDE, 0, 0]),
      to: place(upper, [SIDE, 0, LINK.upper]),
      radius: 0.13,
    },
    { from: place(fore, [0, 0.03, -0.3]), to: fore.origin, radius: 0.15 },
    { from: fore.origin, to: place(fore, [0, 0, LINK.fore]), radius: 0.11 },
  ];
};

/**
 * Which of `solids` the arm's links come within `margin` of at `joints`,
 * leaving out the gripper: it's meant to touch the case it picks, and its
 * neighbours, but the links reaching over a stack mustn't touch any case.
 */
const grazes = (joints: Joints, solids: Box[], margin = MARGIN) => {
  const capsules = links(joints);

  return solids.filter((solid) =>
    capsules.some((capsule) => touches(capsule, solid, margin))
  );
};

/** The solids near the arm at `joints`, and a test of whether it meets one. */
const posed = (
  joints: Joints,
  carried: Carried | undefined,
  solids: Box[],
  margin: number
) => {
  const pad = forward(joints);
  const facing = bearing(joints);
  const capsules = links(joints);

  const gripper: Rect = {
    x: pad.x,
    z: pad.z,
    half: [GRIPPER.width / 2 + 0.01, GRIPPER.depth / 2 + 0.01],
    yaw: facing,
  };
  const top = pad.y + LINK.hand - 0.08;

  const shift = carried && turn(carried.offset, facing);
  const load: Rect | undefined = carried &&
    shift && {
      x: pad.x + shift.x,
      z: pad.z + shift.z,
      half: [carried.size[0] / 2, carried.size[2] / 2],
      yaw: facing + carried.yaw,
    };

  // A box round the whole arm and its load first: most solids, the cases
  // on the pallets among them, are nowhere near and skip the finer tests.
  const reach = (rect: Rect) => Math.hypot(rect.half[0], rect.half[1]);
  const spans = [
    ...capsules.flatMap(({ from, to, radius }) => [
      { point: from, radius },
      { point: to, radius },
    ]),
    { point: pad, radius: reach(gripper) },
    { point: { ...pad, y: top }, radius: reach(gripper) },
    ...(load && carried
      ? [{ point: { ...pad, y: pad.y - carried.size[1] }, radius: reach(load) }]
      : []),
  ];
  const low = (axis: 'x' | 'y' | 'z') =>
    Math.min(...spans.map(({ point, radius }) => point[axis] - radius)) -
    margin;
  const high = (axis: 'x' | 'y' | 'z') =>
    Math.max(...spans.map(({ point, radius }) => point[axis] + radius)) +
    margin;
  const bounds = {
    min: { x: low('x'), y: low('y'), z: low('z') },
    max: { x: high('x'), y: high('y'), z: high('z') },
  };
  const near = solids.filter(
    ({ min, max }) =>
      min.x < bounds.max.x &&
      max.x > bounds.min.x &&
      min.y < bounds.max.y &&
      max.y > bounds.min.y &&
      min.z < bounds.max.z &&
      max.z > bounds.min.z
  );

  const meet = (solid: Box) =>
    capsules.some((capsule) => touches(capsule, solid, margin)) ||
    meets(gripper, pad.y, top, solid, margin) ||
    (!!load &&
      !!carried &&
      meets(load, pad.y - carried.size[1], pad.y, solid, margin));

  return { meet, near };
};

/**
 * Whether the arm, posed at `joints` and carrying `carried`, would come
 * within `margin` of any of `solids`. The upper arm, the elbow housing and
 * the forearm are capsules; the gripper and the case under it are upright
 * boxes turned with the pad, since the hand always points straight down.
 */
const collides = (
  joints: Joints,
  carried: Carried | undefined,
  solids: Box[],
  margin = MARGIN
) => {
  if (!solids.length) {
    return false;
  }

  const { meet, near } = posed(joints, carried, solids, margin);

  return near.some(meet);
};

/** Which of `solids` the arm, posed at `joints` and carrying `carried`, comes within `margin` of. */
const hitting = (
  joints: Joints,
  carried: Carried | undefined,
  solids: Box[],
  margin = MARGIN
) => {
  if (!solids.length) {
    return [];
  }

  const { meet, near } = posed(joints, carried, solids, margin);

  return near.filter(meet);
};

export { collides, grazes, hitting };
export type { Carried };
