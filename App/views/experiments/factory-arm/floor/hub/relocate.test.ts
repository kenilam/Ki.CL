import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Grid
import { neighbour } from 'arm/grid/hex';
import { layout } from 'arm/grid/layout';

// Partials
import { relocate } from './relocate';
import type { Simulation } from './simulations';

const A = { q: 0, r: 0 };
const B = neighbour(A, 0);
const C = neighbour(B, 0);
const FAR = neighbour(B, 1);

const one = (id: string) => ({
  id,
  mass: 5,
  size: [0.5, 0.3, 0.4] as [number, number, number],
  at: { x: 0, y: 0.294, z: 0 },
  yaw: 0,
});

const pallet = (id: string, parent: typeof A, slot: 0 | 1 | 2 | 3 | 4 | 5) => ({
  id,
  at: { parent, slot },
  to: C,
  queue: [] as string[],
  cases: [one(`${id}-case`)],
});

const floor: Simulation = {
  id: 's',
  name: 's',
  cells: [
    { hex: A, arm: 'arm-a' },
    { hex: B, arm: 'arm-b' },
    { hex: C, arm: 'arm-c' },
  ],
  lines: [{ id: 'line', cells: [A, B, C] }],
  pallets: [
    pallet('p1', C, 3),
    pallet('p2', C, 4),
    pallet('p3', C, 5),
    pallet('p4', C, 0),
  ],
};

describe('relocating an arm', () => {
  test('takes its pallets along, moving those that no longer fit, and drops the rest with their cases loose', () => {
    const { dropped, simulation } = relocate({
      arm: 'arm-c',
      floor,
      hex: FAR,
      stations: floor.cells.map((cell) => ({
        ...cell,
        layout: layout({}),
      })),
    });

    assert.deepEqual(
      simulation.cells.find((cell) => cell.arm === 'arm-c')?.hex,
      FAR
    );
    // Every pallet kept stands on the new cell, each on its own slot, and none under the belt.
    const kept = simulation.pallets.filter(({ at }) => at.parent === FAR);
    const slots = kept.map(({ at }) => at.slot);

    assert.equal(kept.length + dropped.length, 4);
    assert.equal(new Set(slots).size, slots.length);
    assert.ok(
      dropped.length >= 1,
      'four pallets cannot all fit beside the belt and the buffer'
    );
    assert.equal(simulation.loose?.length, dropped.length);
    assert.equal(simulation.loose?.[0].cases[0].id, `${dropped[0].id}-case`);
    assert.ok(
      simulation.pallets.every(({ to }) => to === FAR),
      'bound for the arm where it now is'
    );
  });

  test('a pallet that must move keeps off the slots shared with a neighbouring arm when it can', () => {
    // Arm-a's pallet on slot 1 lands under the belt once the arm crosses to the far side.
    const { simulation } = relocate({
      arm: 'arm-a',
      floor: { ...floor, pallets: [pallet('p1', A, 4)] },
      hex: neighbour(A, 1),
      stations: floor.cells.map((cell) => ({ ...cell, layout: layout({}) })),
    });
    const moved = simulation.pallets.find(({ id }) => id === 'p1');

    const there = neighbour(A, 1);
    const shared = ([0, 1, 2, 3, 4, 5] as const).filter((side) =>
      floor.cells.some(
        ({ hex }) =>
          hex.q === neighbour(there, side).q &&
          hex.r === neighbour(there, side).r
      )
    );

    assert.ok(moved);
    assert.deepEqual(moved.at.parent, there);
    assert.ok(shared.length > 0, 'the new cell has a neighbouring arm');
    assert.ok(
      !(shared as number[]).includes(moved.at.slot),
      'not on a slot facing another arm'
    );
  });
});
