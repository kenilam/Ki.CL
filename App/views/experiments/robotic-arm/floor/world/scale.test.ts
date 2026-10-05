import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { classic, type Brain } from 'arm/brains';
import { key } from 'arm/grid';

import { LIMITS, layout, map, sense, step, type World } from '.';

/*
 * The largest floor the panel builds, run headless with the classic brains:
 * it has to lay out cleanly, keep every case off the floor while AMRs take
 * pallets away mid-shift, and stay cheap enough to step on the page's main
 * thread. Needs Ki.CL-arm checked out beside this repo.
 */

const DT = 1 / 50;

const run = (world: World, seconds: number) => {
  const blocked = map(world);
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
  let fetched = 0;
  let spent = 0;

  for (let tick = 0; tick * DT < seconds; tick++) {
    const started = performance.now();

    step(world, DT);

    const frames = sense(world, tick);

    spent += performance.now() - started;
    frames.forEach((frame) => {
      const command = brains.get(frame.id)?.(frame);

      if (command?.robot === 'arm') {
        world.arms.find(({ id }) => id === frame.id)!.command = command;
      } else if (command?.robot === 'amr') {
        world.amrs.find(({ id }) => id === frame.id)!.command = command;
      }
    });
    fetched = Math.max(
      fetched,
      world.pallets.filter(({ carrier }) => carrier).length
    );
  }

  return { fetched, perTick: spent / (seconds / DT) };
};

describe('scale', () => {
  it('lays out the largest floor without two things on one hex', () => {
    const world = layout(LIMITS);
    const cells = new Set(world.arms.map(({ cell }) => key(cell)));
    const blocked = new Set(map(world));

    assert.equal(cells.size, LIMITS.arms);
    world.amrs.forEach(({ park, staging }) => {
      assert.equal(blocked.has(key(park)), false, `${key(park)} is blocked`);
      assert.equal(
        blocked.has(key(staging)),
        false,
        `${key(staging)} is blocked`
      );
    });
  });

  it('keeps every case off the floor while AMRs take pallets away', () => {
    const world = layout(LIMITS);
    const { fetched, perTick } = run(world, 300);
    const placed = world.cases.filter(({ holder }) => holder.kind === 'pallet');

    assert.ok(placed.length > 500, `only ${placed.length} cases placed`);
    assert.ok(fetched >= 5, `only ${fetched} pallets ever out at once`);
    assert.equal(
      world.cases.filter(({ holder }) => holder.kind === 'floor').length,
      0
    );
    // Generous for a slow machine; it runs near 1.5 ms here.
    assert.ok(perTick < 8, `a tick took ${perTick.toFixed(1)} ms`);
  });
});
