import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Controller
import { local } from '../controller/local';

// Grid
import { centre, type Hex, neighbour } from '../grid/hex';

// Grid
import { alongBelt, onBelt, onLine } from '../grid/layout';

// Partials
import { type Cell, create, type Line } from './hub';

/** A hub over `cells` and `lines`, with an in-process controller for each arm, and a way to run it all. */
const build = (cells: Cell[], lines: Line[]) => {
  const wires = new Map<string, ReturnType<typeof local>>();
  const hub = create({
    cells,
    lines,
    connect: (arm) => {
      const wire = local(arm);

      wires.set(arm, wire);

      return wire;
    },
    feed: (arm, boxes) => wires.get(arm)?.feed(boxes),
  });
  const frame = 1 / 60;

  cells.forEach(({ hex }) => hub.load(hex));

  const run = (seconds: number, until: () => boolean) => {
    for (let at = 0; at < seconds && !until(); at += frame) {
      wires.forEach((wire) => wire.tick(frame));
      hub.tick(frame);
    }
  };

  const log = () =>
    hub
      .drain()
      .filter(({ event }) => event.type === 'note')
      .map(({ arm, event }) =>
        event.type === 'note'
          ? `${arm}: ${[event.text, event.detail].filter(Boolean).join(' ')}`
          : ''
      );

  return { hub, log, run };
};

const one = (to: Hex, parent: Hex) => ({
  id: 'p1',
  at: { parent, slot: 3 as const },
  to,
  queue: ['c1'],
  cases: [
    {
      id: 'c1',
      mass: 5,
      size: [0.5, 0.3, 0.4] as [number, number, number],
      at: { x: 0, y: 0.294, z: 0 },
      yaw: 0,
    },
  ],
});

describe('the hub', () => {
  test('refuses a line no arm can reach', () => {
    const a = { q: 0, r: 0 };
    const far = { q: 4, r: 4 };

    assert.throws(() =>
      build(
        [{ hex: a, arm: 'arm-a' }],
        [{ id: 'line', cells: [far, neighbour(far, 0)] }]
      )
    );
  });

  test('a pallet bound for the next cell is sent over the belt and delivered there', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const { hub, log, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
      ],
      [{ id: 'line', cells: [a, b] }]
    );
    const lines: string[] = [];

    hub.place(one(b, a));
    run(90, () => {
      lines.push(...log());

      return lines.some((line) => line.includes('down on its own pallet'));
    });

    assert.ok(
      lines.some((line) => line.startsWith('arm-b: new pallet on slot')),
      lines.join('\n')
    );
    assert.ok(
      hub.stations.get('1,0')!.snapshot().cases.c1,
      'stacked on a pallet at the end of the line'
    );
    assert.deepEqual(hub.board.targets()[0].queue, []);
    assert.equal(hub.board.targets()[0].claimed, null);
  });

  test('an arm finds a wall its camera cannot see with its sensors, and plans again', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const { hub, log, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
      ],
      [{ id: 'line', cells: [a, b] }]
    );
    const at = centre(a);
    const lines: string[] = [];

    // Across the arm's swing from its pallet to the belt, beside its stand: over no pallet, so unseen from above.
    hub.block(
      [
        {
          id: 'wall',
          min: { x: at.x - 1, y: 0, z: at.z + 0.6 },
          max: { x: at.x + 1, y: 2, z: at.z + 0.7 },
        },
      ],
      false
    );
    hub.load(a);
    hub.place(one(b, a));
    run(40, () => {
      lines.push(...log());

      return lines.some((line) => line.includes('No clear path'));
    });

    assert.ok(
      lines.some((line) => line.startsWith('arm-a: Arm found wall in its way')),
      lines.join('\n')
    );
    assert.ok(
      lines.some((line) => line.includes('No clear path for case c1')),
      lines.join('\n')
    );
  });

  test('an obstacle put through an arm sets its alarm off, red, till it is moved clear', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const { hub, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
      ],
      [{ id: 'line', cells: [a, b] }]
    );
    const at = centre(a);
    const events = () =>
      hub
        .drain()
        .filter(({ arm }) => arm === 'arm-a')
        .map(({ event }) => event);

    // The arm settles at rest, its pad about a metre out along z.
    run(5, () => false);
    events();

    // A partition across the forearm.
    hub.block(
      [
        {
          id: 'wall',
          min: { x: at.x - 1, y: 0, z: at.z + 0.75 },
          max: { x: at.x + 1, y: 2, z: at.z + 0.85 },
        },
      ],
      true
    );
    // The station's word reaches the hub on the next tick.
    run(0.1, () => false);

    const struck = events();

    assert.ok(
      struck.some(
        (event) => event.type === 'struck' && event.obstacles.join() === 'wall'
      ),
      JSON.stringify(struck)
    );
    assert.ok(struck.some((event) => event.type === 'alarm'));

    run(1, () => false);
    assert.equal(hub.running.get('line'), false, 'the floor stands still');

    hub.block([], true);
    run(0.1, () => false);

    const clear = events();

    assert.ok(
      clear.some(
        (event) => event.type === 'struck' && event.obstacles.length === 0
      )
    );
    assert.ok(clear.some((event) => event.type === 'calm'));
  });

  test('an obstacle on a belt stops the line until it is taken off', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const { hub, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
      ],
      [{ id: 'line', cells: [a, b] }]
    );
    const riding = () => hub.riders.get('line')!;

    hub.place(one(b, a));
    run(60, () => riding().length > 0);
    assert.equal(riding().length, 1, 'the case is on the belt');

    // A pillar on the belt a metre ahead of the case.
    const rider = riding()[0];
    const ahead = onLine(hub.floor[0], rider.at + 1);
    const pillar = {
      id: 'pillar',
      min: { x: ahead.x - 0.1, y: 0, z: ahead.z - 0.1 },
      max: { x: ahead.x + 0.1, y: 2, z: ahead.z + 0.1 },
    };

    hub.block([pillar], true);

    const notes = hub
      .drain()
      .filter(({ arm, event }) => arm === 'hub' && event.type === 'note');

    assert.ok(
      notes.some(
        ({ event }) =>
          event.type === 'note' && event.text === 'Line line stopped'
      ),
      'the log says the line stopped'
    );

    const was = rider.at;

    run(3, () => false);
    assert.equal(riding()[0]?.at, was, 'the case has not moved');
    assert.equal(hub.running.get('line'), false);

    hub.block([], true);
    run(60, () => riding().length === 0);
    assert.equal(
      riding().length,
      0,
      'the case rides on once the belt is clear'
    );
    assert.equal(hub.running.get('line'), false, 'nothing left to carry');
  });

  test('a pallet bound for the end of a line rides past the arm between, untouched', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const c = neighbour(b, 0);
    const { hub, log, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
        { hex: c, arm: 'arm-c' },
      ],
      [{ id: 'line', cells: [a, b, c] }]
    );
    const lines: string[] = [];

    hub.place(one(c, a));
    run(150, () => {
      lines.push(...log());

      return lines.some((line) => line.includes('down on its own pallet'));
    });

    assert.ok(
      !lines.some((line) => line.startsWith('arm-b: picked')),
      lines.join('\n')
    );
    assert.ok(
      lines.some(
        (line) => line === 'arm-c: Set case c1 down on its own pallet'
      ),
      lines.join('\n')
    );
    assert.ok(!hub.stations.get('1,0')!.snapshot().cases.c1);
    assert.ok(hub.stations.get('2,0')!.snapshot().cases.c1);
  });

  test('a busy line keeps its cases apart and its arms clear of what rides it', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const c = neighbour(b, 0);
    const { hub, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
        { hex: c, arm: 'arm-c' },
      ],
      [{ id: 'line', cells: [a, b, c] }]
    );
    const stack = (prefix: string, count: number) =>
      Array.from({ length: count }, (_, index) => ({
        id: `${prefix}${index}`,
        mass: 5,
        size: [0.5, 0.3, 0.4] as [number, number, number],
        at: {
          x: index % 2 ? 0.28 : -0.28,
          y: 0.294 + Math.floor(index / 2) * 0.3,
          z: 0,
        },
        yaw: 0,
      }));
    const queue = (prefix: string, count: number) =>
      Array.from(
        { length: count },
        (_, index) => `${prefix}${count - 1 - index}`
      );

    hub.configure('arm-a', { targets: 2, period: 1 });
    hub.place({
      id: 'p1',
      at: { parent: a, slot: 3 },
      to: c,
      queue: queue('a', 4),
      cases: stack('a', 4),
    });
    hub.place({
      id: 'p2',
      at: { parent: b, slot: 3 },
      to: c,
      queue: queue('b', 4),
      cases: stack('b', 4),
    });
    hub.place({
      id: 'p4',
      at: { parent: a, slot: 4 },
      to: c,
      queue: queue('d', 2),
      cases: stack('d', 2),
    });

    let gap = Infinity;
    let collisions = 0;

    run(300, () => {
      for (const station of hub.stations.values()) {
        const { holding, pad, riders } = station.snapshot();
        const [belt] = station.layout.belts;

        riders.forEach((rider) =>
          riders.forEach((other) => {
            if (rider !== other) {
              gap = Math.min(gap, Math.abs(rider.distance - other.distance));
            }
          })
        );

        // A held case low over the belt with a rider beside it.
        if (holding && pad && pad.at.y - holding.size[1] < belt.height + 0.3) {
          const along = alongBelt(belt, pad.at);
          const line = onBelt(belt, along);

          if (
            Math.hypot(line.x - pad.at.x, line.z - pad.at.z) < 0.5 &&
            riders.some((rider) => Math.abs(rider.distance - along) < 0.5)
          ) {
            collisions += 1;
          }
        }
      }

      return (
        Object.keys(hub.stations.get('2,0')!.snapshot().cases).length === 10
      );
    });

    assert.equal(collisions, 0);
    assert.ok(gap > 0.55, `riders came within ${gap.toFixed(2)} m`);
    assert.equal(
      Object.keys(hub.stations.get('2,0')!.snapshot().cases).length,
      10
    );
  });

  test('refuses a pallet on the slot facing one across the edge to the next cell', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const { hub } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
      ],
      [{ id: 'line', cells: [a, b] }]
    );

    hub.place({ ...one(b, a), id: 'p1', at: { parent: a, slot: 0 } });
    hub.place({ ...one(b, a), id: 'p2', at: { parent: b, slot: 3 } });

    assert.deepEqual(
      hub.board.targets().map(({ id }) => id),
      ['p1']
    );
    assert.ok(
      hub
        .drain()
        .some(
          ({ event }) =>
            event.type === 'note' && event.text === 'No room for pallet p2'
        )
    );
  });

  test('two arms at the end of a line, on either side, both take cases off it', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const c = neighbour(b, 0);
    const across = neighbour(c, 1);
    const { hub, log, run } = build(
      [
        { hex: a, arm: 'arm-a' },
        { hex: b, arm: 'arm-b' },
        { hex: c, arm: 'arm-c' },
        { hex: across, arm: 'arm-d' },
      ],
      [{ id: 'line', cells: [a, b, c] }]
    );
    const lines: string[] = [];
    const cases = Array.from({ length: 4 }, (_, index) => ({
      id: `c${index}`,
      mass: 5,
      size: [0.5, 0.3, 0.4] as [number, number, number],
      at: {
        x: index % 2 ? 0.28 : -0.28,
        y: 0.294 + Math.floor(index / 2) * 0.3,
        z: 0,
      },
      yaw: 0,
    }));

    hub.place({
      id: 'p1',
      at: { parent: a, slot: 3 },
      to: c,
      queue: ['c3', 'c2', 'c1', 'c0'],
      cases,
    });
    hub.place({
      id: 'p2',
      at: { parent: b, slot: 3 },
      to: c,
      queue: ['d3', 'd2', 'd1', 'd0'],
      cases: cases.map((one) => ({ ...one, id: one.id.replace('c', 'd') })),
    });
    run(300, () => {
      lines.push(...log());

      return (
        lines.filter((line) => line.includes('down on its own pallet'))
          .length === 8
      );
    });

    const by = (arm: string) =>
      lines.filter(
        (line) =>
          line.startsWith(`${arm}: Set case`) && line.includes('own pallet')
      ).length;

    assert.ok(
      hub.stations.get('3,-1')!.layout.belts[0].end,
      'the arm across is at the end too'
    );
    assert.ok(
      by('arm-c') > 0 && by('arm-d') > 0,
      `${by('arm-c')} by arm-c, ${by('arm-d')} by arm-d:\n${lines.join('\n')}`
    );
  });

  test('refuses two belt lines that cross', () => {
    const a = { q: 0, r: 0 };
    const b = neighbour(a, 0);
    const c = neighbour(b, 0);
    const above = neighbour(b, 5);
    const below = neighbour(b, 2);

    assert.throws(
      () =>
        build(
          [
            { hex: a, arm: 'arm-a' },
            { hex: c, arm: 'arm-c' },
            { hex: above, arm: 'arm-d' },
            { hex: below, arm: 'arm-e' },
          ],
          [
            { id: 'one', cells: [a, b, c] },
            { id: 'two', cells: [above, b, below] },
          ]
        ),
      /cross/
    );
  });
});
