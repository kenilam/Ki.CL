import type { AmrSensors, ArmSensors, Seen, Sensors } from 'arm/frames';
import { fromPoint, key, range, toPoint } from 'arm/grid';

import { queues, waitingOn, type Queue } from './belts';
import { toArm } from './frame';
import { PALLET } from './layout';
import type { Amr, Arm, Case, World } from './types';

/*
 * The sensor frames the floor puts on the bus each tick. An arm's camera
 * sees the cases and pallets inside its cell; its scanner trips when a
 * person is inside. An AMR feels how near the closest person ahead of it is.
 */

/** The camera's and the scanner's reach from the arm's base, in metres. */
const CELL = 2.7;

/** Hexes round a cell's centre that can hold anything within the camera's reach. */
const AROUND = Math.ceil(CELL / 1.5);

/** One pass over the floor that every arm's camera reads from: cases by the hex they are over, and the belt queues. */
type Index = { byHex: Map<string, Case[]>; lines: Map<string, Queue> };

const index = (world: World): Index => {
  const byHex = new Map<string, Case[]>();

  world.cases.forEach((item) => {
    const at = key(fromPoint(item.position));

    const here = byHex.get(at);

    if (here) {
      here.push(item);
    } else {
      byHex.set(at, [item]);
    }
  });

  return { byHex, lines: queues(world) };
};

/** A person counts as ahead of an AMR within this half-angle of its heading. */
const CONE = Math.PI / 3;

const near = (arm: Arm, x: number, z: number) => {
  const origin = toPoint(arm.cell);

  return Math.hypot(x - origin.x, z - origin.z) < CELL;
};

const vision = (world: World, arm: Arm, { byHex, lines }: Index): Seen[] => {
  const belt = world.belts.find((one) => one.arm === arm.id);
  const waiting = belt ? waitingOn(belt, lines.get(belt.id)) : null;

  const cases = range(arm.cell, AROUND)
    .flatMap((hex) => byHex.get(key(hex)) ?? [])
    .filter(({ position }) => near(arm, position.x, position.z))
    .map(({ heading, holder, id, position, size }) => ({
      id,
      kind: 'case' as const,
      top: toArm(arm, { ...position, y: position.y + size[1] / 2 }),
      width: size[0],
      depth: size[2],
      height: size[1],
      yaw: heading - arm.heading,
      waiting: id === waiting?.id,
      held: holder.kind === 'pad' && holder.arm === arm.id,
    }));

  const pallets = world.pallets
    .filter(
      ({ carrier, position }) => !carrier && near(arm, position.x, position.z)
    )
    .map(({ heading, id, position }) => ({
      id,
      kind: 'pallet' as const,
      top: toArm(arm, { ...position, y: position.y + PALLET.height }),
      width: PALLET.width,
      depth: PALLET.depth,
      height: PALLET.height,
      yaw: heading - arm.heading,
    }));

  return [...cases, ...pallets];
};

const armSensors = (
  world: World,
  arm: Arm,
  tick: number,
  seen: Index
): ArmSensors => ({
  id: arm.id,
  tick,
  time: world.time,
  position: { ...arm.pose },
  velocity: { ...arm.velocity },
  gripper: {
    vacuum: arm.vacuum,
    contact: arm.held !== null,
    payload: world.cases.find(({ id }) => id === arm.held)?.weight ?? 0,
  },
  vision: vision(world, arm, seen),
  intrusion: world.workers.some(({ position }) =>
    near(arm, position.x, position.z)
  ),
});

const proximity = (world: World, amr: Amr) =>
  world.workers.reduce((nearest, { position }) => {
    const dx = position.x - amr.position.x;
    const dz = position.z - amr.position.z;
    const bearing = Math.atan2(dx, dz) - amr.heading;
    const ahead = Math.abs(Math.atan2(Math.sin(bearing), Math.cos(bearing)));

    return ahead < CONE ? Math.min(nearest, Math.hypot(dx, dz)) : nearest;
  }, Infinity);

const amrSensors = (world: World, amr: Amr, tick: number): AmrSensors => ({
  id: amr.id,
  tick,
  time: world.time,
  position: { ...amr.position },
  heading: amr.heading,
  lifted: amr.lifted,
  loaded: amr.pallet !== null,
  proximity: proximity(world, amr),
  task: amr.task,
});

/** Every robot's frame for this tick. */
const sense = (world: World, tick: number): Sensors[] => {
  const seen = index(world);

  return [
    ...world.arms.map((arm) => ({
      robot: 'arm' as const,
      ...armSensors(world, arm, tick, seen),
    })),
    ...world.amrs.map((amr) => ({
      robot: 'amr' as const,
      ...amrSensors(world, amr, tick),
    })),
  ];
};

export { sense };
