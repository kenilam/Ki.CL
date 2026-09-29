// Protocol
import type { Box } from '@/views/experiments/factory-arm/cell/protocol';

// Hub
import type { Riding, Target } from '@/views/experiments/factory-arm/cell/hub';

// Grid
import { childCentre } from '@/views/experiments/factory-arm/cell/grid/child';
import {
  centre,
  type Hex,
} from '@/views/experiments/factory-arm/cell/grid/hex';
import {
  above,
  type Line,
  onLine,
  PALLET,
} from '@/views/experiments/factory-arm/cell/grid/layout';

// Station
import type { Case } from '@/views/experiments/factory-arm/cell/station/spec';

// Partials
import type { Loose } from './simulations';

type Point = { x: number; z: number };
type Vector = [number, number, number];

/** The shapes the operator can add: each one's size (width, height, depth in metres) and how high its underside sits. */
const SHAPES = {
  pillar: { base: 0, size: [0.14, 2.3, 0.14] as Vector },
  crate: { base: 0, size: [0.45, 1.6, 0.43] as Vector },
  beam: { base: 1.3, size: [1, 0.15, 0.13] as Vector },
  partition: { base: 0, size: [2, 2, 0.1] as Vector },
};

type Shape = keyof typeof SHAPES;

/** The arm's stand: its pedestal and turret, square to the cell. */
const STAND = { size: 0.9, height: 1 };

/** How high a stack on a pallet may reach, in metres: what a pallet's place must keep clear. */
const STACK = 1.5;

/** A box of `shape`, its footprint centred on `at`. */
const box = (id: string, shape: Shape, at: Point): Box => {
  const { base, size } = SHAPES[shape];

  return {
    id,
    min: { x: at.x - size[0] / 2, y: base, z: at.z - size[2] / 2 },
    max: { x: at.x + size[0] / 2, y: base + size[1], z: at.z + size[2] / 2 },
  };
};

/** The same box with its footprint centred on `at`. */
const moved = ({ id, min, max }: Box, at: Point): Box => {
  const half = { x: (max.x - min.x) / 2, z: (max.z - min.z) / 2 };

  return {
    id,
    min: { x: at.x - half.x, y: min.y, z: at.z - half.z },
    max: { x: at.x + half.x, y: max.y, z: at.z + half.z },
  };
};

/**
 * The box set down on whatever belt it's over: lifted so its underside
 * rests on the belt's surface, if it would otherwise cut through it. Over
 * no belt, or already above one, it's left as it is.
 */
const rest = (box: Box, lines: Line[]): Box => {
  const under = lines
    .filter((line) => above(line, box))
    .map(({ height }) => height);

  if (!under.length) {
    return box;
  }

  const top = Math.max(...under);

  if (box.min.y >= top) {
    return box;
  }

  const height = box.max.y - box.min.y;

  return {
    ...box,
    min: { ...box.min, y: top },
    max: { ...box.max, y: top + height },
  };
};

/** The same box given a quarter turn about the middle of its footprint: its width and depth swap. */
const turned = (box: Box): Box => {
  const at = middle(box);
  const half = {
    x: (box.max.z - box.min.z) / 2,
    z: (box.max.x - box.min.x) / 2,
  };

  return {
    id: box.id,
    min: { x: at.x - half.x, y: box.min.y, z: at.z - half.z },
    max: { x: at.x + half.x, y: box.max.y, z: at.z + half.z },
  };
};

/** The middle of a box's footprint. */
const middle = ({ min, max }: Box): Point => ({
  x: (min.x + max.x) / 2,
  z: (min.z + max.z) / 2,
});

/** The shape a box was made from, by its size, if it was made from one. */
const shape = ({ min, max }: Box) =>
  (Object.keys(SHAPES) as Shape[]).find((each) => {
    const [width, height, depth] = SHAPES[each].size;

    const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;
    const [w, d] = [max.x - min.x, max.z - min.z];

    // Either way round: a quarter turn swaps width and depth.
    return (
      near(max.y - min.y, height) &&
      ((near(w, width) && near(d, depth)) || (near(w, depth) && near(d, width)))
    );
  });

/** Whether two boxes share any space. */
const overlaps = (a: Box, b: Box) =>
  a.min.x < b.max.x &&
  a.max.x > b.min.x &&
  a.min.y < b.max.y &&
  a.max.y > b.min.y &&
  a.min.z < b.max.z &&
  a.max.z > b.min.z;

/** The stand of the arm in `hex`. */
const stand = (id: string, hex: Hex): Box => {
  const at = centre(hex);
  const half = STAND.size / 2;

  return {
    id,
    min: { x: at.x - half, y: 0, z: at.z - half },
    max: { x: at.x + half, y: STAND.height, z: at.z + half },
  };
};

/** The room a pallet takes on `at`: its boards and the stack that may go on them. */
const room = (id: string, at: Point): Box => ({
  id,
  min: { x: at.x - PALLET.size[0] / 2, y: 0, z: at.z - PALLET.size[2] / 2 },
  max: { x: at.x + PALLET.size[0] / 2, y: STACK, z: at.z + PALLET.size[2] / 2 },
});

/**
 * A case as a box with its centre at `at`, heading `yaw`. Square to the
 * floor at a quarter turn; at any other heading its footprint is grown to
 * its longer side, so it fits whichever way it points.
 */
const cased = (
  one: Case,
  at: { x: number; y: number; z: number },
  yaw: number
): Box => {
  const [width, height, depth] = one.size;
  const turns = yaw / (Math.PI / 2);
  const square = Math.abs(turns - Math.round(turns)) < 1e-3;
  const odd = Math.round(turns) % 2 !== 0;
  const [w, d] = square
    ? odd
      ? [depth, width]
      : [width, depth]
    : [Math.max(width, depth), Math.max(width, depth)];

  return {
    id: one.id,
    min: { x: at.x - w / 2, y: at.y - height / 2, z: at.z - d / 2 },
    max: { x: at.x + w / 2, y: at.y + height / 2, z: at.z + d / 2 },
  };
};

/**
 * Everything solid on the floor but the belts, as boxes in its frame: the
 * arms' stands, the pallets' boards, the cases on unclaimed pallets, every
 * case a station has or holds, the cases riding the lines, cases left
 * loose, and the obstacles. An obstacle may stand nowhere these are.
 */
const solids = ({
  cells,
  extras,
  lines,
  loose,
  obstacles,
  riders,
  stations,
  targets,
}: {
  cells: (arm: string) => { cases: Case[]; holding: Case | null };
  extras: Record<string, Vector[]>;
  lines: Line[];
  loose: Loose[];
  obstacles: Box[];
  riders: (line: string) => Riding[];
  stations: { arm: string; hex: Hex }[];
  targets: Target[];
}): Box[] => [
  ...stations.map(({ arm, hex }) => stand(arm, hex)),
  ...stations.flatMap(({ arm, hex }) => {
    const at = centre(hex);
    const { cases, holding } = cells(arm);

    return [...cases, ...(holding ? [holding] : [])].map((one) =>
      cased(
        one,
        { x: at.x + one.at.x, y: one.at.y, z: at.z + one.at.z },
        one.yaw
      )
    );
  }),
  ...stations.flatMap(({ arm, hex }) => {
    const at = centre(hex);

    return (extras[arm] ?? []).map(([x, , z], count) =>
      boards(`${arm}-stacked-${count + 1}`, { x: at.x + x, z: at.z + z })
    );
  }),
  ...targets.flatMap((target) => {
    const at = childCentre(target.at);

    return [
      boards(target.id, at),
      ...(target.claimed
        ? []
        : target.cases.map((one) =>
            cased(
              one,
              { x: at.x + one.at.x, y: one.at.y, z: at.z + one.at.z },
              one.yaw
            )
          )),
    ];
  }),
  ...lines.flatMap((line) =>
    riders(line.id).map((rider) => {
      const at = onLine(line, rider.at);

      return cased(
        rider.own,
        { x: at.x, y: line.height + rider.own.size[1] / 2, z: at.z },
        rider.yaw
      );
    })
  ),
  ...loose.flatMap(({ at, cases }) =>
    cases.map((one) =>
      cased(
        one,
        {
          x: at.x + one.at.x,
          y: one.at.y - PALLET.size[1],
          z: at.z + one.at.z,
        },
        one.yaw
      )
    )
  ),
  ...obstacles,
];

/** A pallet's boards on `at`. */
const boards = (id: string, at: Point): Box => ({
  id,
  min: { x: at.x - PALLET.size[0] / 2, y: 0, z: at.z - PALLET.size[2] / 2 },
  max: {
    x: at.x + PALLET.size[0] / 2,
    y: PALLET.size[1],
    z: at.z + PALLET.size[2] / 2,
  },
});

/** Whether `one` may stand among `others`: it shares space with none of them but itself. */
const clear = (one: Box, others: Box[]) =>
  !others.some((other) => other.id !== one.id && overlaps(one, other));

export {
  SHAPES,
  box,
  cased,
  clear,
  middle,
  moved,
  overlaps,
  rest,
  room,
  shape,
  solids,
  stand,
  turned,
};
export type { Shape };
