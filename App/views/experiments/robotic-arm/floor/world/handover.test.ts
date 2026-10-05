import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { classic, handovers, type Brain } from 'arm/brains';
import type { Commands } from 'arm/frames';
import { JOINTS } from 'arm/robot';

import { layout, map, sense, step, type World } from '.';

/*
 * Hands the first arm from one classic brain to a fresh one every few seconds
 * while it carries a case, through the same guard the floor's router uses.
 * The incoming brain hears nothing for a few ticks, as across a real link.
 * Needs Ki.CL-arm checked out beside this repo.
 */

const DT = 1 / 50;
/** Seconds between handovers, each made only while the arm holds a case. */
const EVERY = 4;
/** Ticks before the incoming brain hears its first frame. */
const LATENCY = 6;

const apply = (world: World, command: Commands) => {
  if (command.robot === 'arm') {
    world.arms.find(({ id }) => id === command.id)!.command = command;
  } else {
    world.amrs.find(({ id }) => id === command.id)!.command = command;
  }
};

describe('handover', () => {
  it('moves an arm to a new brain mid-carry without a drop or a jump', () => {
    const world = layout();
    const blocked = map(world);
    const arm = world.arms[0];
    const handing = handovers();
    const brains = new Map<string, Brain>([
      ...world.arms.map(
        ({ id }) => [id, classic({ type: 'attach', robot: 'arm', id })] as const
      ),
      ...world.amrs.map(
        ({ id }) =>
          [
            id,
            classic({ type: 'attach', robot: 'amr', id, config: { blocked } }),
          ] as const
      ),
    ]);
    // Where each case the arm let go of landed, at the moment it was let go: shipped pallets take their cases away later.
    const released: { id: string; landed?: string }[] = [];
    let handed = 0;
    let deaf = 0;
    let since = 0;
    let held = arm.held;
    let largest = 0;
    let previous = { ...arm.pose };

    for (let tick = 0; tick * DT < 150; tick++) {
      step(world, DT);

      // The drives already cap speed; this checks nothing teleports the arm either.
      JOINTS.forEach(({ name, speed }) => {
        largest = Math.max(
          largest,
          Math.abs(arm.pose[name] - previous[name]) / (speed * DT)
        );
      });
      previous = { ...arm.pose };

      if (held && arm.held !== held) {
        released.push({
          id: held,
          landed: world.cases.find((item) => item.id === held)?.holder.kind,
        });
      }
      held = arm.held;

      const frames = sense(world, tick);

      handing.see(frames);
      since += DT;

      if (arm.held && since >= EVERY) {
        brains.set(
          arm.id,
          classic({
            type: 'attach',
            robot: 'arm',
            id: arm.id,
            handover: handing.begin(arm.id),
          })
        );
        handed += 1;
        deaf = LATENCY;
        since = 0;
      }

      const commands = frames.flatMap((frame) => {
        if (frame.id === arm.id && deaf > 0) {
          deaf -= 1;

          return [];
        }

        return brains.get(frame.id)?.(frame) ?? [];
      });

      handing.guard(commands, tick).forEach((command) => apply(world, command));
    }

    assert.ok(handed >= 5, `only ${handed} handovers`);
    assert.equal(
      handing.counts().violations,
      0,
      'an incoming brain broke from the snapshot'
    );
    assert.ok(released.length >= 5, `only ${released.length} cases placed`);
    released.forEach(({ id, landed }) =>
      assert.equal(landed, 'pallet', `${id} was not set on a pallet`)
    );
    assert.equal(
      world.cases.filter(({ holder }) => holder.kind === 'floor').length,
      0
    );
    assert.ok(
      largest <= 1 + 1e-9,
      `a joint moved ${largest.toFixed(2)}x its top speed`
    );
  });
});
