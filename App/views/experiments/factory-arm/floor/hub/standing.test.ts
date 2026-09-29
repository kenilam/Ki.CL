import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Grid
import { slot } from '@/views/experiments/factory-arm/cell/grid/layout';

// Partials
import { standing } from './standing';

const A = { q: 0, r: 0 };

const one = (id: string, x: number, z: number) => ({
  id,
  mass: 5,
  size: [0.5, 0.3, 0.4] as [number, number, number],
  at: { x, y: 0.294, z },
  yaw: 0,
});

describe('the floor as it stands', () => {
  test("keeps what a claimed pallet has now, and an arm's own stacked pallet", () => {
    const [px, , pz] = slot(3);
    const [ox, , oz] = slot(0);
    const floor = standing({
      active: {
        id: 's',
        name: 's',
        cells: [{ hex: A, arm: 'arm-a' }],
        lines: [],
        pallets: [],
      },
      capacities: {},
      cases: () => [
        one('left', px - 0.28, pz),
        one('stacked', ox + 0.1, oz - 0.1),
        one('elsewhere', 0, 0),
      ],
      extras: { 'arm-a': [slot(0)] },
      stations: [{ arm: 'arm-a', hex: A }],
      targets: [
        {
          id: 'p1',
          at: { parent: A, slot: 3 },
          to: A,
          queue: ['left'],
          cases: [one('left', -0.28, 0), one('gone', 0.28, 0)],
          version: 3,
          claimed: 'arm-a',
        },
      ],
    });

    assert.deepEqual(
      floor.pallets.map(({ id, cases }) => [id, cases.map((c) => c.id)]),
      [
        ['p1', ['left']],
        ['arm-a-stacked-1', ['stacked']],
      ]
    );
    assert.ok(
      Math.abs(floor.pallets[0].cases[0].at.x + 0.28) < 1e-9,
      'relative to its pallet'
    );
    assert.deepEqual(floor.pallets[1].at, { parent: A, slot: 0 });
  });

  test('a stacked pallet is numbered past those already on the board, and a queue keeps only what is still there', () => {
    const [ox, , oz] = slot(0);
    const floor = standing({
      active: {
        id: 's',
        name: 's',
        cells: [{ hex: A, arm: 'arm-a' }],
        lines: [],
        pallets: [],
      },
      capacities: {},
      cases: () => [one('stacked', ox, oz)],
      extras: { 'arm-a': [slot(0)] },
      stations: [{ arm: 'arm-a', hex: A }],
      targets: [
        {
          id: 'arm-a-stacked-2',
          at: { parent: A, slot: 4 },
          to: A,
          queue: ['old', 'kept'],
          cases: [one('kept', 0, 0)],
          version: 0,
          claimed: null,
        },
      ],
    });

    assert.deepEqual(
      floor.pallets.map(({ id, queue }) => [id, queue]),
      [
        ['arm-a-stacked-2', ['kept']],
        ['arm-a-stacked-3', []],
      ]
    );
  });
});
