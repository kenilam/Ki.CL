import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Partials
import { childCentre } from './child';
import {
  centre,
  facing,
  heading,
  INRADIUS,
  neighbour,
  opposite,
  SIDES,
} from './hex';
import {
  free,
  layout,
  line,
  onBelt,
  PALLET,
  reaches,
  SLOT,
  slot,
  stretch,
} from './layout';

describe('the grid', () => {
  test('puts neighbours two inradii apart, one per side, each facing back', () => {
    const home = { q: 2, r: -1 };

    for (const side of SIDES) {
      const next = neighbour(home, side);
      const a = centre(home);
      const b = centre(next);

      assert.ok(
        Math.abs(Math.hypot(b.x - a.x, b.z - a.z) - 2 * INRADIUS) < 1e-9
      );
      assert.equal(facing(home, next), side);
      assert.equal(facing(next, home), opposite(side));
      assert.ok(
        Math.abs(Math.atan2(b.z - a.z, b.x - a.x) - heading(side)) < 1e-9
      );
    }

    assert.equal(facing(home, { q: 4, r: 0 }), undefined);
  });

  test('puts a child slot one slot out from its parent, through its side', () => {
    const parent = { q: 1, r: 1 };
    const at = childCentre({ parent, slot: 2 });
    const from = centre(parent);

    assert.ok(Math.abs(Math.hypot(at.x - from.x, at.z - from.z) - SLOT) < 1e-9);
    assert.ok(
      SLOT + PALLET.size[0] / 2 < 2.2,
      'a pallet on a slot is within reach'
    );
  });
});

describe('a station layout', () => {
  const footprint = ([x, , z]: [number, number, number]) => ({
    min: { x: x - PALLET.size[0] / 2, z: z - PALLET.size[2] / 2 },
    max: { x: x + PALLET.size[0] / 2, z: z + PALLET.size[2] / 2 },
  });

  const apart = (a: ReturnType<typeof footprint>, b: typeof a) =>
    a.max.x <= b.min.x ||
    b.max.x <= a.min.x ||
    a.max.z <= b.min.z ||
    b.max.z <= a.min.z;

  test('keeps the buffer and every free slot off one another and off the line', () => {
    for (const side of SIDES) {
      const home = { q: 0, r: 0 };
      const made = layout({
        belts: [
          stretch(line('line', [home, neighbour(home, side)]), home, {
            end: false,
            downstream: [],
          }),
        ],
      });
      const [belt] = made.belts;
      const boards = [
        ...(made.buffer ? [made.buffer] : []),
        ...SIDES.filter((each) => free(made, each)).map(slot),
      ].map(footprint);

      assert.ok(boards.length >= 4, `side ${side}: ${boards.length} slots`);
      boards.forEach((a, i) =>
        boards
          .slice(i + 1)
          .forEach((b) => assert.ok(apart(a, b), `side ${side}: slots overlap`))
      );

      for (const distance of [belt.zone[0], ...belt.drops, belt.zone[1]]) {
        const { x, z } = onBelt(belt, distance);

        boards.forEach((board) =>
          assert.ok(
            x < board.min.x - belt.width / 2 ||
              x > board.max.x + belt.width / 2 ||
              z < board.min.z - belt.width / 2 ||
              z > board.max.z + belt.width / 2,
            `line at ${heading(side)} crosses a pallet at ${distance} m`
          )
        );
      }

      belt.drops.forEach((distance) => {
        const { x, z } = onBelt(belt, distance);

        assert.ok(Math.hypot(x, z) < 2, 'a drop is within reach');
      });
    }
  });

  test('an arm works a line only beside it, not past either end', () => {
    const home = { q: 0, r: 0 };
    const next = neighbour(home, 0);
    const made = line('line', [home, next]);

    assert.ok(reaches(made, home));
    assert.ok(reaches(made, next));
    assert.ok(
      reaches(made, neighbour(home, 1)),
      'across the belt from the first arm'
    );
    assert.ok(!reaches(made, neighbour(next, 0)), 'past the end of the belt');
    assert.ok(!reaches(made, neighbour(home, 3)), 'before its start');
    assert.ok(!reaches(made, neighbour(home, 5)), 'too far to the side');
  });
});
