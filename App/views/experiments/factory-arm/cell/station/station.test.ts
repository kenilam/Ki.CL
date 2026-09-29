import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Controller
import { local } from '../controller/local';

// Grid
import { neighbour, type Side } from '../grid/hex';
import { layout, line, stretch } from '../grid/layout';

// Hub
import type { Board, Target } from '../hub/board';

// Partials
import { create } from './station';

// Spec
import type { Case } from './spec';

/** A neat stack, relative to a pallet's centre: `layers` deep, four cases a layer. */
const stacked = (layers: number): Case[] => {
  const size: [number, number, number] = [0.5, 0.3, 0.4];
  const cases: Case[] = [];

  for (let layer = 0; layer < layers; layer++) {
    [-1, 1].forEach((sx) =>
      [-1, 1].forEach((sz) =>
        cases.push({
          id: `${layer}${sx > 0 ? 'r' : 'l'}${sz > 0 ? 'f' : 'b'}`,
          mass: 5,
          size,
          at: { x: sx * 0.28, y: 0.144 + 0.15 + layer * 0.3, z: sz * 0.23 },
          yaw: 0,
        })
      )
    );
  }

  return cases;
};

const HEX = { q: 0, r: 0 };

/** A board with one pallet on this arm's slot 3, bound for the cell out through side 0. */
const board = (queue: string[]) => {
  const target: Target = {
    id: 'p1',
    at: { parent: HEX, slot: 3 },
    to: { q: 1, r: 0 },
    queue,
    cases: stacked(2),
    version: 0,
    claimed: null,
  };
  const made: Board = {
    targets: () => [target],
    claim: (id, arm) => {
      if (id !== target.id || target.claimed) return null;
      target.claimed = arm;

      return target;
    },
    release: (_, cases, left) => {
      target.claimed = null;
      target.cases = cases;
      target.queue = left;
    },
  };

  return { target, board: made };
};

/**
 * Runs the arm and the station together until the pallet has been picked up
 * and put back and its last case has had time to cross, or `seconds` pass.
 */
const run = (
  wire: ReturnType<typeof local>,
  station: ReturnType<typeof create>,
  made: Board,
  target: Target,
  seconds = 90
) => {
  const events: ReturnType<typeof station.drain> = [];
  const frame = 1 / 60;
  let claimed = false;
  let linger = 6;

  for (let at = 0; at < seconds && linger > 0; at += frame) {
    claimed ||= target.claimed !== null;
    linger -= claimed && target.claimed === null ? frame : 0;
    wire.tick(frame);
    station.tick(frame, made, []);
    events.push(...station.drain());
  }

  return events;
};

const setup = (queue: string[]) => {
  const wire = local('arm-a');
  const station = create({
    id: 'arm-a',
    hex: HEX,
    layout: layout({
      belts: [
        stretch(line('a>b', [HEX, neighbour(HEX, 0)]), HEX, {
          end: false,
          downstream: [neighbour(HEX, 0)],
        }),
      ],
    }),
    link: wire,
  });
  const { board: made, target } = board(queue);

  station.load([]);

  return { wire, station, board: made, target };
};

/** A station at the end of a line, with `shared` sides it can't set a pallet on, and a case at its pick zone. */
const ending = (shared: Side[]) => {
  const wire = local('arm-c');
  const belt = stretch(line('b>c', [neighbour(HEX, 3), HEX]), HEX, {
    end: true,
    downstream: [],
  });
  const station = create({
    id: 'arm-c',
    hex: HEX,
    layout: layout({ belts: [belt], shared }),
    link: wire,
  });
  const own = stacked(1)[0];
  const rider = {
    id: own.id,
    own,
    belt: belt.id,
    distance: 0,
    yaw: 0,
    to: HEX,
  };

  station.load([]);

  return { station, rider };
};

/** Each note as one line: its headline, then its detail. */
const texts = (events: ReturnType<ReturnType<typeof create>['drain']>) =>
  events
    .filter((event) => event.type === 'note')
    .map((note) => [note.text, note.detail].filter(Boolean).join(' '));

describe('a station', () => {
  test('picks up a pallet on its slot, sends its queue out, and puts it back', () => {
    const { station, wire, board: made, target } = setup(['1rf', '1lf']);
    const events = run(wire, station, made, target);
    const notes = texts(events);

    assert.ok(
      notes.some((text) => text.startsWith('pallet p1')),
      notes.join('\n')
    );
    assert.ok(
      notes.some((text) => text.startsWith('Set case 1rf down on the belt')),
      notes.join('\n')
    );
    assert.ok(
      notes.some((text) => text.startsWith('Put pallet p1 back')),
      notes.join('\n')
    );
    assert.equal(events.filter((event) => event.type === 'placed').length, 2);
    assert.equal(target.cases.length, 6);
    assert.deepEqual(Object.keys(station.snapshot().cases), []);
  });

  test('moves what is on top of a buried case to the buffer first', () => {
    const { station, wire, board: made, target } = setup(['0rf']);
    const events = run(wire, station, made, target);
    const notes = texts(events);

    assert.ok(
      notes.some((text) => text.startsWith('Set case 1rf down on the buffer')),
      notes.join('\n')
    );
    assert.ok(target.cases.every(({ id }) => id !== '0rf'));
    assert.ok(
      target.cases.every(({ id }) => id !== '1rf'),
      'the case on the buffer stays with the arm'
    );
    assert.ok(station.snapshot().cases['1rf']);
  });

  test('follows a plan that changes while it works', () => {
    const { station, wire, board: made, target } = setup(['1rf', '1lf', '1rb']);

    const first = run(wire, station, made, target, 5);

    target.queue = ['1lb'];
    target.version += 1;

    const sent = [...first, ...run(wire, station, made, target)]
      .filter((event) => event.type === 'placed')
      .map((event) => event.rider.id);

    // The case under way finishes; after it, only the new plan is followed.
    assert.deepEqual(sent, ['1rf', '1lb']);
  });

  test('leaves a pallet alone when it has no belt toward its cell', () => {
    const { station, wire, board: made, target } = setup(['1rf']);

    target.to = { q: -1, r: 0 };

    const events = run(wire, station, made, target, 3);

    assert.equal(target.claimed, null);
    assert.ok(
      events.some(
        (event) =>
          event.type === 'note' && event.text.startsWith('Leaving pallet')
      )
    );
  });

  test('leaves a pallet alone when it is out of capacity', () => {
    const { station, wire, board: made, target } = setup(['1rf']);

    station.configure({ targets: 0, period: 60 });
    run(wire, station, made, target, 3);
    assert.equal(target.claimed, null);
  });

  test('at the end of a line, has no buffer and sets a pallet of its own on a free slot for what arrives', () => {
    const { station, rider } = ending([]);

    assert.equal(station.layout.buffer, null);
    assert.ok(station.receive(rider));

    const events = station.drain();

    assert.ok(events.some((event) => event.type === 'pallet'));
    assert.equal(station.layout.pallets.length, 1);
  });

  test('at the end of a line, stops with the alarm on when no slot is left for a pallet', () => {
    const { station, rider } = ending([0, 1, 2, 3, 4, 5]);

    assert.equal(station.receive(rider), false);

    const events = station.drain();

    assert.ok(events.some((event) => event.type === 'alarm'));
    assert.ok(
      texts(events).includes('Stopped no slot left for another pallet')
    );
    assert.equal(station.ready(rider.belt), false);
  });
});
