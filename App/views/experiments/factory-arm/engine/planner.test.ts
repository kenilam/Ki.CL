import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Kinematics
import {
  forward,
  HOME,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Obstacles
import { OBSTACLES } from '@/views/experiments/factory-arm/scene/obstacles/constants';
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Stack
import { stack } from '@/views/experiments/factory-arm/scene/pallet/stack';

// Partials
import { clears, order, plan } from './planner';
import { stable } from './stability';
import { extent, place, remove, world } from './world';

const standard = (obstacles: Solid[] = OBSTACLES) =>
  world(stack({ layers: 4, seed: 7 }), obstacles);

const rest = forward(HOME);

/** The top case at the front of the stack. */
const front = (state: ReturnType<typeof standard>) =>
  Object.values(state.cases).reduce((a, b) =>
    b.at.y > a.at.y + 0.01 ||
    (Math.abs(b.at.y - a.at.y) < 0.01 && b.at.z > a.at.z)
      ? b
      : a
  );

/** A case in the bottom layer, at the front. */
const buried = (state: ReturnType<typeof standard>) =>
  Object.values(state.cases)
    .filter(({ id }) => id.startsWith('0-'))
    .reduce((a, b) => (b.at.z > a.at.z ? b : a));

describe('planner', () => {
  test('a free case on top goes straight to the belt', () => {
    const state = standard();
    const result = plan(state, front(state).id, rest);

    assert.ok('moves' in result, JSON.stringify(result));
    assert.equal(result.moves.length, 1);
    assert.equal(result.moves[0].to, 'belt');
    assert.equal(result.world.cases[front(state).id], undefined);
  });

  test('a buried case has the cases above it moved to the buffer first, each set down stable', () => {
    const state = standard();
    const target = buried(state);
    const result = plan(state, target.id, rest);

    assert.ok('moves' in result, JSON.stringify(result));
    assert.ok(result.moves.length > 1);
    assert.ok(result.moves.slice(0, -1).every(({ to }) => to === 'buffer'));
    assert.equal(result.moves.at(-1)?.to, 'belt');

    result.moves.slice(0, -1).forEach(({ id }) => {
      const placed = result.world.cases[id];

      assert.ok(stable(result.world, extent(placed), id), `${id} unstable`);
    });
  });

  test('every move picks, then places, and ends on the case set down', () => {
    const state = standard();
    const result = plan(state, buried(state).id, rest);

    assert.ok('moves' in result);
    result.moves.forEach(({ waypoints }) => {
      const actions = waypoints.flatMap(({ action }) =>
        action ? [action] : []
      );

      assert.deepEqual(actions, ['pick', 'place']);
      assert.equal(waypoints.at(-1)?.action, 'place');
    });
  });

  test('a beam lowered onto the stack refuses the cases under it, and names the beam', () => {
    const state = standard();
    const target = front(state);
    const box = extent(target);
    const beam: Solid = {
      id: 'beam',
      min: { x: box.min.x - 0.3, y: box.max.y + 0.02, z: box.min.z },
      max: { x: box.max.x + 0.3, y: box.max.y + 0.17, z: box.max.z },
    };
    const result = plan({ ...state, obstacles: [beam] }, target.id, rest);

    assert.ok('refused' in result, JSON.stringify(result));
    assert.deepEqual(result.refused.across, ['beam']);
  });

  test('a case moved out of the way never goes back in it, so every pick is clear', () => {
    // Digging the lowest cases in turn fills the buffer, until a case's own old spot is the last free one.
    let state = world(stack({ layers: 4, seed: 1 }), OBSTACLES);
    let pad = rest;

    for (let round = 0; round < 9; round++) {
      const target = Object.keys(state.cases).sort(
        (a, b) => state.cases[a].at.y - state.cases[b].at.y
      )[round];
      const result = plan(state, target, pad);

      if ('refused' in result) {
        continue;
      }

      let cell = state;

      result.moves.forEach(({ at, id, to, turned }) => {
        assert.deepEqual(
          order(cell, id),
          [id],
          `${id} picked from under a case`
        );

        const own = cell.cases[id];

        cell = remove(cell, id);

        if (to === 'buffer') {
          cell = place(
            { ...cell, cases: { ...cell.cases, [id]: own } },
            id,
            at,
            turned
          );
        }
      });

      state = result.world;
      pad = result.moves.at(-1)?.waypoints.at(-1)?.target ?? pad;
    }
  });

  test('a queued case in the way goes straight to the belt, not the buffer', () => {
    const state = standard();
    const target = buried(state);
    const first = plan(state, target.id, rest);

    assert.ok('moves' in first);

    const [above] = first.moves;
    const result = plan(state, target.id, rest, { reserved: [above.id] });

    assert.ok('moves' in result, JSON.stringify(result));
    assert.equal(result.moves.find(({ id }) => id === above.id)?.to, 'belt');
  });
  test('a job clears the obstacles it was planned for, and not one moved onto its way', () => {
    const state = standard();
    const target = front(state);
    const result = plan(state, target.id, rest);

    assert.ok('moves' in result);

    const check = (obstacles: Solid[]) =>
      clears(
        result.moves,
        { move: 0, step: 0 },
        rest,
        undefined,
        state.cases,
        obstacles
      );
    const box = extent(target);
    const onIt: Solid = {
      id: 'moved',
      min: { x: box.min.x, y: box.max.y + 0.3, z: box.min.z },
      max: { x: box.max.x, y: box.max.y + 0.45, z: box.max.z },
    };

    assert.ok(check(state.obstacles));
    assert.ok(!check([...state.obstacles, onIt]));
  });
});
