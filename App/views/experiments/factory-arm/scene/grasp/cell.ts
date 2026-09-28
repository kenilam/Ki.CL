// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/boxes/spec';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Pad
import { heading, top } from './pad';

// Rect
import { overlap, type Rect } from './rect';

// Constants
import { GRIPPER } from '@/views/experiments/factory-arm/scene/arm/constants';
import {
  BUFFER,
  CONVEYOR,
  INCOMING,
  PALLET,
} from '@/views/experiments/factory-arm/scene/constants';

type Bodies = Map<string, { body: RapierRigidBody; box: Box }>;

/** Room kept clear along the belt either side of the drop point. */
const SPACING = 0.55;

/** Half the suction pad's width and depth; it is 1 cm wider than the housing. */
const PAD: [number, number] = [
  (GRIPPER.width + 0.02) / 2,
  (GRIPPER.depth + 0.02) / 2,
];

/** How much taller a case must be to count as over another, past settling. */
const TALLER = 0.02;

/** Overlap smaller than this is cases touching side to side, not in the way. */
const TOUCHING = 0.005;

/** A case's outline on the floor plan. */
const footprint = (body: RapierRigidBody, box: Box): Rect => {
  const { x, z } = body.translation();

  return {
    x,
    z,
    half: [box.size[0] / 2, box.size[2] / 2],
    yaw: heading(body.rotation()),
  };
};

/** The pad's outline on a case: the wrist rolls it square to the case first. */
const pad = ({ x, z, yaw }: Rect): Rect => ({ x, z, half: PAD, yaw });

/**
 * The cases on the pallets as solids for planning a way through the cell,
 * leaving out those in `except`: the case being moved, which travels with
 * the pad. Cases on the belt are on their way out and left out too.
 */
const solidsOf = (bodies: Bodies, except: string[]): Solid[] => {
  const found: Solid[] = [];

  bodies.forEach(({ body, box }, id) => {
    if (except.includes(id) || !onPallet(id, bodies)) {
      return;
    }

    const { x, y, z } = body.translation();
    const { half } = footprint(body, box);
    const cos = Math.abs(Math.cos(heading(body.rotation())));
    const sin = Math.abs(Math.sin(heading(body.rotation())));
    const across = half[0] * cos + half[1] * sin;
    const along = half[0] * sin + half[1] * cos;

    found.push({
      id,
      min: { x: x - across, y: y - box.size[1] / 2, z: z - along },
      max: { x: x + across, y: y + box.size[1] / 2, z: z + along },
    });
  });

  return found;
};

/** The top of the tallest case in the cell. */
const highest = (bodies: Bodies) => {
  let top = 0;

  bodies.forEach(({ body, box }) => {
    top = Math.max(top, body.translation().y + box.size[1] / 2);
  });

  return top;
};

/** Whether a case other than the held one still sits at the drop point `z` along the belt. */
const occupied = (bodies: Bodies, z: number, held?: string) => {
  let found = false;

  bodies.forEach(({ body, box }, id) => {
    const at = body.translation();

    found ||=
      id !== held &&
      Math.abs(at.x - CONVEYOR.x) < CONVEYOR.width &&
      Math.abs(at.z - z) < SPACING &&
      at.y - box.size[1] / 2 > CONVEYOR.height - 0.05;
  });

  return found;
};

/**
 * Whether something with `outline` from above and its top at `height` would
 * be in the way of lifting case `id` straight up: it rises above the case's
 * top and overlaps the case or the pad on it.
 */
const covers = (outline: Rect, height: number, id: string, bodies: Bodies) => {
  const entry = bodies.get(id);

  if (!entry) {
    return false;
  }

  const own = footprint(entry.body, entry.box);

  return (
    height > top(entry.body, entry.box).y + TALLER &&
    (overlap(outline, own, TOUCHING) || overlap(outline, pad(own), TOUCHING))
  );
};

/**
 * The cases in the way of lifting one straight up: those rising above its top
 * that overlap either the case or the pad on it, seen from above. The held
 * case is in the air and never counts.
 */
const blockers = (id: string, bodies: Bodies, held?: string) => {
  const found: string[] = [];

  bodies.forEach(({ body, box }, other) => {
    if (
      other !== id &&
      other !== held &&
      covers(footprint(body, box), top(body, box).y, id, bodies)
    ) {
      found.push(other);
    }
  });

  return found;
};

const blocked = (id: string, bodies: Bodies, held?: string) =>
  !bodies.has(id) || blockers(id, bodies, held).length > 0;

/** Whether a case's centre is over the pallet at `position`, resting on or above it. */
const over = (
  id: string,
  bodies: Bodies,
  [left, , back]: [number, number, number]
) => {
  const entry = bodies.get(id);

  if (!entry) {
    return false;
  }

  const { x, y, z } = entry.body.translation();
  const [width, height, depth] = PALLET.size;

  return (
    Math.abs(x - left) < width / 2 &&
    Math.abs(z - back) < depth / 2 &&
    y - entry.box.size[1] / 2 > height - TALLER
  );
};

/** The place a point is over, in words, for the log. */
const where = ({ x, z }: { x: number; z: number }) => {
  const [width, , depth] = PALLET.size;
  const on = ([left, , back]: [number, number, number]) =>
    Math.abs(x - left) < width / 2 && Math.abs(z - back) < depth / 2;

  if (Math.abs(x - CONVEYOR.x) < CONVEYOR.width / 2 + 0.1) {
    return 'the belt';
  }

  if (on(BUFFER.position)) {
    return 'the buffer';
  }

  const stack = INCOMING.findIndex(on);

  return stack < 0 ? 'the floor' : stack ? 'the second stack' : 'the pallet';
};

/** Whether a case is on a pallet: the arm works every one, never the belt or floor. */
const onPallet = (id: string, bodies: Bodies) =>
  [...INCOMING, BUFFER.position].some((position) => over(id, bodies, position));

export {
  PAD,
  blocked,
  blockers,
  covers,
  footprint,
  highest,
  occupied,
  onPallet,
  solidsOf,
  where,
};
export type { Bodies };
