import { add, fromPoint, hex, toPoint, type Hex, type Point } from 'arm/grid';
import { HOME } from 'arm/robot';

import type { Amr, Arm, Belt, Obstacle, Pallet, Walker, World } from './types';

/*
 * A floor of any size: arm cells in rows of up to ten, each cell's belt
 * coming in from the north into its north-west slot and its two pallets on
 * the southern slots, facing an aisle. Rows are 15 m apart, which leaves the
 * aisle clear of the next row's belts. West of the cells is the depot, where
 * each AMR has its own staging hex and parking hex. Two workers walk the
 * first rows; one crosses beside the second cell, close enough to trip its
 * safety scanner. With two arms and one AMR, this is the floor the
 * experiment started with.
 */

type Floor = { arms: number; amrs: number };

const DEFAULT: Floor = { arms: 2, amrs: 1 };
const LIMITS: Floor = { arms: 50, amrs: 20 };
const COLUMNS = 10;

const BELT_SLOT = hex(0, -1);
const PALLET_SLOTS = [hex(-1, 1), hex(0, 1)];

/** Height of a belt's surface, in metres. */
const BELT_TOP = 0.75;

/** A standard 1.2 m by 1.0 m pallet, 0.15 m high. */
const PALLET = { width: 1.2, depth: 1, height: 0.15 } as const;

/** An AMR's deck height with the deck raised, where a carried pallet's underside sits. */
const DECK = 0.38;

/**
 * Where the `index`th cell's centre is. Every step is between rosette
 * centres, so cells never share a hex: columns alternate (3, -1) and (4, 1),
 * and rows alternate (-2, 10) and (-9, 10), which keeps rows from drifting
 * sideways.
 */
const cellAt = (index: number): Hex => {
  const column = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  const across = hex(
    Math.floor(column / 2) * 7 + (column % 2) * 3,
    -(column % 2)
  );
  const down = hex(
    Math.floor(row / 2) * -11 + (row % 2) * -2,
    Math.floor(row / 2) * 20 + (row % 2) * 10
  );

  return add(across, down);
};

/** Rotation about y that turns local +x towards `to`. */
const facing = (from: Point, to: Point) =>
  Math.atan2(-(to.z - from.z), to.x - from.x);

const belt = (arm: string, cell: Hex, index: number): Belt => {
  const end = toPoint(add(cell, BELT_SLOT));
  const length = 6;

  return {
    id: `belt-${index}`,
    arm,
    start: { x: end.x, z: end.z - length },
    heading: 0,
    length,
    width: 0.8,
    speed: 0.6,
    every: 2.5 + (index % 3),
    due: index % 3,
  };
};

const obstacle = (
  id: string,
  kind: Obstacle['kind'],
  position: Point,
  size: Obstacle['size'],
  heading = 0
): Obstacle => ({ id, kind, position, size, heading });

const walker = (id: string, path: Point[], speed: number): Walker => ({
  id,
  path,
  speed,
  travelled: 0,
  position: path[0],
  heading: 0,
});

const arm = (cell: Hex, index: number): Arm => ({
  id: `arm-${index}`,
  cell,
  heading: facing(toPoint(cell), toPoint(add(cell, BELT_SLOT))),
  pose: { ...HOME },
  velocity: { base: 0, shoulder: 0, elbow: 0, wrist: 0, flange: 0 },
  vacuum: false,
  held: null,
  command: null,
});

const pallets = ({ cell, id }: Arm): Pallet[] =>
  PALLET_SLOTS.map((slot, index) => {
    const home = add(cell, slot);
    const { x, z } = toPoint(home);

    return {
      id: `${id}-pallet-${index}`,
      arm: id,
      home,
      position: { x, y: 0, z },
      heading: 0,
      carrier: null,
    };
  });

const layout = ({ amrs, arms }: Floor = DEFAULT): World => {
  const cells = Array.from({ length: arms }, (_, index) => cellAt(index));
  const points = cells.map((cell) => toPoint(cell));
  const xs = points.map(({ x }) => x);
  const zs = points.map(({ z }) => z);
  const west = Math.min(...xs);
  const east = Math.max(...xs);
  const north = Math.min(...zs);
  const south = Math.max(...zs);

  // The depot: a column west of the cells, a parking hex and a staging hex 3 m apart per AMR.
  const depot = (index: number, offset: number) =>
    fromPoint({ x: west - 6.93, z: north + 6 * index + offset });
  const deepest = north + 6 * Math.max(0, amrs - 1) + 3;
  const reach = { south: Math.max(south, deepest) + 8, north: north - 10 };
  const second = points[1] ?? points[0];
  const centre = {
    x: (west - 9 + east + 4.33) / 2,
    z: (reach.north + reach.south) / 2,
  };

  const placed = cells.map(arm);

  return {
    time: 0,
    arms: placed,
    pallets: placed.flatMap(pallets),
    belts: placed.map((one, index) => belt(one.id, one.cell, index)),
    cases: [],
    obstacles: [
      obstacle(
        'wall-west',
        'wall',
        { x: west - 9, z: (reach.north + reach.south) / 2 + 1 },
        [0.2, 3, reach.south - reach.north - 2]
      ),
      obstacle(
        'wall-north',
        'wall',
        { x: (west + east) / 2 + 1, z: reach.north },
        [east - west + 20, 3, 0.2]
      ),
      obstacle(
        'pillar-0',
        'pillar',
        { x: west - 4.33, z: north + 4.5 },
        [0.5, 6, 0.5]
      ),
      obstacle(
        'pillar-1',
        'pillar',
        { x: east + 4.33, z: north - 6 },
        [0.5, 6, 0.5]
      ),
      obstacle(
        'post-0',
        'post',
        { x: west - 2, z: north - 5 },
        [0.12, 1.1, 0.12]
      ),
      obstacle(
        'post-1',
        'post',
        { x: east + 0.87, z: north - 5 },
        [0.12, 1.1, 0.12]
      ),
    ],
    workers: [
      walker(
        'worker-0',
        [
          { x: west - 6, z: north + 5 },
          { x: east + 3.67, z: north + 5 },
          { x: east + 3.67, z: north + 6.5 },
          { x: west - 6, z: north + 6.5 },
        ],
        1.2
      ),
      walker(
        'worker-1',
        [
          { x: second.x + 2.17, z: north - 6 },
          { x: second.x + 2.17, z: north + 5 },
        ],
        0.9
      ),
    ],
    amrs: Array.from({ length: amrs }, (_, index): Amr => {
      const park = depot(index, 0);

      return {
        id: `amr-${index}`,
        position: toPoint(park),
        heading: Math.PI / 2,
        lifted: false,
        pallet: null,
        task: null,
        command: null,
        staging: depot(index, 3),
        park,
      };
    }),
    ground: {
      centre: fromPoint(centre),
      radius:
        Math.ceil(
          Math.max(east - west + 14, reach.south - reach.north) / 2 / 1.5
        ) + 4,
    },
    made: 0,
  };
};

export { BELT_TOP, DECK, DEFAULT, LIMITS, PALLET, layout, type Floor };
