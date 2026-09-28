import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Stack
import { stack } from '@/views/experiments/factory-arm/scene/pallet/stack';

// Partials
import { spots } from './placement';
import { DECK, stable } from './stability';
import { extent, move, over, remove, under, world } from './world';

const standard = () => world(stack({ layers: 4, seed: 7 }), []);

describe('world', () => {
  test('a buried case has the cases above it in the way, highest first', () => {
    const state = standard();
    const bottom = Object.values(state.cases).find(({ id }) =>
      id.startsWith('0-')
    )!;
    const above = over(state, bottom.id);

    assert.ok(above.length > 0);
    assert.ok(
      above.every(
        (one, index) => index === 0 || one.at.y <= above[index - 1].at.y
      )
    );
  });

  test('a case on top has nothing in the way', () => {
    const state = standard();
    const highest = Object.values(state.cases).reduce((a, b) =>
      a.at.y > b.at.y ? a : b
    );

    assert.deepEqual(over(state, highest.id), []);
  });

  test('every case in the stack rests on the boards or on others', () => {
    const state = standard();

    Object.values(state.cases).forEach((one) => {
      const floor = Math.abs(extent(one).min.y - DECK) < 0.01;

      assert.ok(floor || under(state, one.id).length > 0, one.id);
    });
  });

  test('moving and removing change only that case', () => {
    const state = standard();
    const [first] = Object.keys(state.cases);
    const moved = move(state, first, { x: 9, y: 9, z: 9 });

    assert.equal(moved.cases[first].at.x, 9);
    assert.notEqual(state.cases[first].at.x, 9);
    assert.equal(
      Object.keys(remove(state, first).cases).length,
      Object.keys(state.cases).length - 1
    );
  });
});

describe('stability', () => {
  test('a case in mid-air is not stable; one on the buffer boards is', () => {
    const state = standard();
    const size = 0.3;
    const at = (y: number) => ({
      min: { x: 0.1 - size / 2, y, z: 1.55 - size / 2 },
      max: { x: 0.1 + size / 2, y: y + size, z: 1.55 + size / 2 },
    });

    assert.equal(stable(state, at(0.6)), false);
    assert.equal(stable(state, at(DECK)), true);
  });

  test('off every pallet is not stable', () => {
    const state = standard();

    assert.equal(
      stable(state, {
        min: { x: 3, y: DECK, z: 3 },
        max: { x: 3.3, y: DECK + 0.3, z: 3.3 },
      }),
      false
    );
  });
});

describe('placement', () => {
  test('the first case goes flush in a corner of the empty buffer, on the boards', () => {
    const state = standard();
    const [id] = Object.keys(state.cases);
    const [best] = spots(state, id);

    assert.ok(best);
    assert.ok(Math.abs(best.at.y - state.cases[id].size[1] / 2 - DECK) < 0.001);
  });

  test('the next case packs against the first, with no gap to speak of', () => {
    let state = standard();
    const [a, b] = Object.values(state.cases).filter(
      ({ size }) => size[1] === 0.3
    );

    state = move(state, a.id, spots(state, a.id)[0].at);

    const next = spots(state, b.id)[0];
    const placed = extent(state.cases[a.id]);
    const half = (next.turned ? b.size[2] : b.size[0]) / 2;
    const gapX = Math.min(
      Math.abs(next.at.x - half - placed.max.x),
      Math.abs(placed.min.x - (next.at.x + half))
    );
    const halfZ = (next.turned ? b.size[0] : b.size[2]) / 2;
    const gapZ = Math.min(
      Math.abs(next.at.z - halfZ - placed.max.z),
      Math.abs(placed.min.z - (next.at.z + halfZ))
    );

    assert.ok(Math.min(gapX, gapZ) < 0.02, `gap ${gapX}, ${gapZ}`);
  });

  test('a place over a queued case comes after every place that buries nothing', () => {
    let state = standard();
    const [a, b] = Object.values(state.cases);

    state = move(state, a.id, spots(state, a.id)[0].at);

    const found = spots(state, b.id, [a.id]);
    const first = found.findIndex(({ buries }) => buries.length);

    assert.ok(
      first === -1 || found.slice(first).every(({ buries }) => buries.length)
    );
  });
});
