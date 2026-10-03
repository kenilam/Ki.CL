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
import { transfer } from './motion';
import { extent, world } from './world';

const standard = (obstacles: Solid[] = OBSTACLES) =>
  world(stack({ layers: 4, seed: 7 }), obstacles);

/** The top case at the front of the stack, nothing on it and clear of the beam. */
const front = (state: ReturnType<typeof standard>) =>
  Object.values(state.cases).reduce((a, b) =>
    b.at.y > a.at.y + 0.01 ||
    (Math.abs(b.at.y - a.at.y) < 0.01 && b.at.z > a.at.z)
      ? b
      : a
  );

const around = (state: ReturnType<typeof standard>) => ({
  cases: Object.values(state.cases).map((one) => ({
    id: one.id,
    ...extent(one),
  })),
  obstacles: state.obstacles,
});

const highest = (state: ReturnType<typeof standard>) =>
  Math.max(...Object.values(state.cases).map((one) => extent(one).max.y));

describe('motion', () => {
  test('from rest, the pad reaches down onto the top case at the front', () => {
    const state = standard();
    const target = front(state);
    const top = { ...target.at, y: extent(target).max.y };
    const others = around(state);
    const result = transfer(
      forward(HOME),
      top,
      [0, 0],
      undefined,
      { ...others, cases: others.cases.filter(({ id }) => id !== target.id) },
      highest(state),
      { rise: false, fall: true }
    );

    assert.ok('waypoints' in result, JSON.stringify(result));
    assert.deepEqual(result.waypoints.at(-1)?.target, top);
  });

  test('walled in on both sides, the move is blocked and names both walls', () => {
    // Two tall walls either side of the base, reaching past the arm's reach.
    const walls: Solid[] = [
      { id: 'left', min: { x: -3, y: 0, z: 0.5 }, max: { x: 3, y: 3, z: 0.6 } },
      {
        id: 'right',
        min: { x: -3, y: 0, z: -0.6 },
        max: { x: 3, y: 3, z: -0.5 },
      },
    ];
    const state = standard(walls);
    const result = transfer(
      forward(HOME),
      { x: 1.35, y: 1, z: -1 },
      [0, 0],
      undefined,
      around(state),
      highest(state),
      { rise: false, fall: false }
    );

    assert.ok('blocked' in result);
  });

  test('a swing that the short way round is blocked goes the long way', () => {
    // A pillar near the base on the short way from the stack to the belt side.
    const pillar: Solid = {
      id: 'pillar',
      min: { x: -0.2, y: 0, z: 0.55 },
      max: { x: 0.2, y: 3, z: 0.75 },
    };
    const state = standard([pillar]);
    const result = transfer(
      { x: -1.2, y: 1.6, z: 0.3 },
      { x: 1.35, y: 1.2, z: 0.2 },
      [0, 0],
      undefined,
      around(state),
      highest(state),
      { rise: false, fall: false }
    );

    assert.ok('waypoints' in result, JSON.stringify(result));
  });
});
