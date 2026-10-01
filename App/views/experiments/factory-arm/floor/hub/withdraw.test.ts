import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Grid
import { neighbour } from 'arm/grid/hex';

// Partials
import { SIMULATIONS } from './simulations';
import { withdraw } from './withdraw';

const floor = SIMULATIONS.find(({ id }) => id === 'one-line')!;

describe('taking an arm off the floor', () => {
  test('the arm goes with its pallets, and what was bound for it is bound for the next arm along', () => {
    const [a, b, c] = floor.cells.map(({ hex }) => hex);
    const found = withdraw({ arm: 'arm-c', floor });

    assert.ok(found);
    assert.deepEqual(
      found.simulation.cells.map(({ arm }) => arm),
      ['arm-a', 'arm-b']
    );
    assert.ok(
      found.simulation.pallets.every(({ to }) => to.q === b.q && to.r === b.r),
      'bound for arm-b now'
    );
    assert.equal(found.dropped.length, 0);
    void a;
    void c;

    const first = withdraw({ arm: 'arm-a', floor });

    assert.ok(first);
    assert.equal(first.dropped.length, 2, 'the two pallets on arm-a');
    assert.equal(first.simulation.loose, undefined, 'nothing left behind');
    assert.equal(first.simulation.pallets.length, 1);
  });

  test('refuses when a line would have no arm in reach', () => {
    const a = { q: 0, r: 0 };
    const alone = {
      ...floor,
      cells: [{ hex: a, arm: 'arm-a' }],
      lines: [{ id: 'line', cells: [a, neighbour(a, 0)] }],
      pallets: [],
    };

    assert.equal(withdraw({ arm: 'arm-a', floor: alone }), null);
  });
});
