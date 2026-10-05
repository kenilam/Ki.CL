import type { Task } from 'arm/frames';
import { fromPoint, type Hex } from 'arm/grid';

import { queues, waitingOn } from './belts';
import type { Amr, Arm, Pallet, World } from './types';

/*
 * The fleet manager. When a pallet is full it sends a free AMR to fetch it to
 * staging, where it is emptied, and bring it back to its slot. One task at a
 * time; the next goes out when the AMR's brain reports the last one done.
 *
 * Full means either many cases on it, or that its arm has run out of room:
 * a case has waited at the arm's belt for STALL seconds and the arm has not
 * picked it up. Cases come in mixed sizes, so how many fit varies; an arm
 * left waiting is the sign that does not.
 */

/** A pallet this loaded is fetched whatever its arm is doing. */
const FULL = 12;

/** Seconds a case may wait at the belt with its arm idle before the arm's pallets count as full. */
const STALL = 5;

/** Seconds an emptied pallet stands at staging, being unloaded. */
const UNLOAD = 3;

/** Lined up to carry a pallet square: the body drives along +x. */
const FACING = Math.PI / 2;

type Errand = { pallet: string; leg: number; wait: number };

const errands = new WeakMap<Amr, Errand>();
const stalled = new WeakMap<Arm, number>();
let counter = 0;

const task = (to: Hex, lift: boolean): Task => ({
  id: `task-${counter++}`,
  to,
  facing: FACING,
  lift,
});

/** How many cases each pallet holds, counted in one pass over the floor. */
const loads = (world: World) => {
  const counted = new Map<string, number>();

  world.cases.forEach(({ holder }) => {
    if (holder.kind === 'pallet') {
      counted.set(holder.pallet, (counted.get(holder.pallet) ?? 0) + 1);
    }
  });

  return counted;
};

/** The legs of one errand: fetch, set down at the AMR's staging hex, pick up, return, park. */
const legs = (amr: Amr, pallet: Pallet): Task[] => [
  task(fromPoint(pallet.position), true),
  task(amr.staging, false),
  task(amr.staging, true),
  task(pallet.home, false),
  task(amr.park, false),
];

/** Times how long each arm has left a case waiting at its belt while holding nothing. */
const watch = (world: World, dt: number) => {
  const lines = queues(world);

  world.arms.forEach((arm) => {
    const belt = world.belts.find((one) => one.arm === arm.id);
    const waiting = belt && waitingOn(belt, lines.get(belt.id));

    stalled.set(arm, waiting && !arm.held ? (stalled.get(arm) ?? 0) + dt : 0);
  });
};

/** Whether a pallet should go: loaded to FULL, or the most loaded pallet of an arm that has run out of room. */
const due = (world: World, load: Map<string, number>) => {
  const arms = new Map(world.arms.map((arm) => [arm.id, arm]));

  return (pallet: Pallet) => {
    const count = load.get(pallet.id) ?? 0;

    if (count >= FULL) {
      return true;
    }

    const arm = arms.get(pallet.arm);

    if (!arm || (stalled.get(arm) ?? 0) < STALL || count === 0) {
      return false;
    }

    return world.pallets
      .filter((one) => one.arm === pallet.arm && !one.carrier)
      .every((one) => (load.get(one.id) ?? 0) <= count);
  };
};

const dispatch = (world: World, dt: number) => {
  watch(world, dt);

  world.amrs.forEach((amr) => {
    const errand = errands.get(amr);

    if (!errand) {
      const busy = new Set(
        world.amrs.map((one) => errands.get(one)?.pallet).filter(Boolean)
      );
      const load = loads(world);
      const full = due(world, load);
      const holding = new Set(
        world.arms.filter(({ held }) => held).map(({ id }) => id)
      );
      // Not while its arm holds a case: the case may be on its way to this pallet.
      const next = world.pallets.find(
        (pallet) =>
          !pallet.carrier &&
          !busy.has(pallet.id) &&
          !holding.has(pallet.arm) &&
          full(pallet)
      );

      if (next) {
        errands.set(amr, { pallet: next.id, leg: 0, wait: UNLOAD });
        amr.task = legs(amr, next)[0];
      }

      return;
    }

    if (!amr.task || amr.command?.done !== amr.task.id) {
      return;
    }

    const pallet = world.pallets.find(({ id }) => id === errand.pallet);

    // Set down at staging: empty it before taking it back.
    if (errand.leg === 1 && pallet) {
      world.cases = world.cases.filter(
        ({ holder }) => holder.kind !== 'pallet' || holder.pallet !== pallet.id
      );
      errand.wait -= dt;

      if (errand.wait > 0) {
        return;
      }
    }

    errand.leg += 1;

    const next = pallet ? legs(amr, pallet)[errand.leg] : undefined;

    if (next) {
      amr.task = next;
    } else {
      errands.delete(amr);
      amr.task = null;
    }
  });
};

export { dispatch };
