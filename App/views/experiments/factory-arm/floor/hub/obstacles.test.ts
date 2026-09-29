import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Grid
import { childCentre } from '@/views/experiments/factory-arm/cell/grid/child';
import {
  centre,
  neighbour,
} from '@/views/experiments/factory-arm/cell/grid/hex';
import { covers, line } from '@/views/experiments/factory-arm/cell/grid/layout';

// Partials
import { box, clear, moved, rest, shape, solids, turned } from './obstacles';

const a = { q: 0, r: 0 };
const b = neighbour(a, 0);
const one = {
  id: 'c1',
  mass: 5,
  size: [0.5, 0.3, 0.4] as [number, number, number],
  at: { x: 0, y: 0.294, z: 0 },
  yaw: 0,
};

/** A floor of two arms on one line, a pallet with a case on the first, and one loose case. */
const floor = () =>
  solids({
    cells: () => ({ cases: [], holding: null }),
    extras: {},
    lines: [line('line', [a, b])],
    loose: [{ at: { x: 5, z: 5 }, cases: [one] }],
    obstacles: [],
    riders: () => [],
    stations: [
      { arm: 'arm-a', hex: a },
      { arm: 'arm-b', hex: b },
    ],
    targets: [
      {
        id: 'p1',
        at: { parent: a, slot: 3 },
        to: b,
        queue: [],
        cases: [one],
        version: 0,
        claimed: null,
      },
    ],
  });

describe('obstacles on the floor', () => {
  test('a shape is a box of its size centred where it is put, and is known by it', () => {
    const pillar = box('o1', 'pillar', { x: 1, z: 2 });

    const near = (got: number, want: number) =>
      assert.ok(Math.abs(got - want) < 1e-9, `${got} is not ${want}`);

    near(pillar.min.x, 0.93);
    near(pillar.min.z, 1.93);
    near(pillar.max.x, 1.07);
    near(pillar.max.y, 2.3);
    near(pillar.max.z, 2.07);
    assert.equal(shape(pillar), 'pillar');
    assert.equal(shape(moved(pillar, { x: -3, z: 0 })), 'pillar');
  });

  test("a quarter turn swaps a box's width and depth about its middle, and it is still its shape", () => {
    const beam = box('o1', 'beam', { x: 3, z: 4 });
    const across = turned(beam);
    const near = (got: number, want: number) =>
      assert.ok(Math.abs(got - want) < 1e-9, `${got} is not ${want}`);

    near(across.max.x - across.min.x, 0.13);
    near(across.max.z - across.min.z, 1);
    near((across.min.x + across.max.x) / 2, 3);
    near((across.min.z + across.max.z) / 2, 4);
    assert.equal(across.min.y, beam.min.y);
    assert.equal(shape(across), 'beam');
  });

  test('an obstacle may not stand on an arm, a pallet, a case on it, or a loose case', () => {
    const on = (at: { x: number; z: number }) =>
      clear(box('o1', 'crate', at), floor());

    assert.equal(on(centre(a)), false, 'on the arm');
    assert.equal(
      on(childCentre({ parent: a, slot: 3 })),
      false,
      'on the pallet'
    );
    assert.equal(on({ x: 5, z: 5 }), false, 'on the loose case');
    assert.equal(on({ x: 20, z: 20 }), true, 'on open floor');
  });

  test('a beam hangs over a pallet but not over its case', () => {
    const at = childCentre({ parent: a, slot: 3 });

    assert.equal(
      clear(box('o1', 'beam', at), floor()),
      true,
      'above the stack'
    );
    assert.equal(
      clear(box('o1', 'crate', { x: at.x + 0.5, z: at.z + 0.6 }), floor()),
      false,
      'on the boards'
    );
  });

  test('a box set down over a belt rests on top of it, and still stops it', () => {
    const found = line('line', [a, b]);
    const mid = found.span / 2;
    const point = {
      x: found.origin.x + mid * Math.cos(found.heading),
      z: found.origin.z + mid * Math.sin(found.heading),
    };
    const pillar = rest(box('o1', 'pillar', point), [found]);
    const beam = rest(box('o2', 'beam', point), [found]);

    assert.equal(pillar.min.y, found.height, 'lifted onto the belt');
    assert.ok(Math.abs(pillar.max.y - pillar.min.y - 2.3) < 1e-9, 'as tall');
    assert.equal(covers(found, pillar), true, 'the belt stops for it');
    assert.equal(beam.min.y, 1.3, 'already above it, left alone');
    assert.equal(
      rest(box('o3', 'pillar', { x: 20, z: 20 }), [found]).min.y,
      0,
      'over no belt, on the floor'
    );
  });

  test('a box stands on a belt only when it reaches it', () => {
    const found = line('line', [a, b]);
    const mid = found.span / 2;
    const point = {
      x: found.origin.x + mid * Math.cos(found.heading),
      z: found.origin.z + mid * Math.sin(found.heading),
    };

    assert.equal(covers(found, box('o1', 'pillar', point)), true, 'on it');
    assert.equal(covers(found, box('o1', 'beam', point)), false, 'above it');
    assert.equal(
      covers(
        found,
        box('o1', 'pillar', {
          x: point.x + 2 * Math.cos(found.heading - Math.PI / 2),
          z: point.z + 2 * Math.sin(found.heading - Math.PI / 2),
        })
      ),
      false,
      'beside it'
    );
  });
});
