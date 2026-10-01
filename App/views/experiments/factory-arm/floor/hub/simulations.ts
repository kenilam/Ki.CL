// Hub
import type { Cell, Floor, Target } from 'arm/hub';

// Grid
import { childCentre } from 'arm/grid/child';
import { centre, type Hex, neighbour, type Side } from 'arm/grid/hex';
import { line, onLine } from 'arm/grid/layout';

// Station
import type { Case } from 'arm/station/spec';

// Partials
import { box, rest } from './obstacles';
import { pile } from './pile';

/** Cases left on the floor where a pallet stood, relative to that spot. No arm touches them. */
type Loose = { at: { x: number; z: number }; cases: Case[] };

/**
 * A floor to play: the hub's configuration, with a name for the panel and,
 * for the scene alone, cases left loose where a pallet stood.
 */
type Simulation = Floor & {
  id: string;
  name: string;
  loose?: Loose[];
  /** Saved by the operator, so it can be removed again. */
  saved?: boolean;
};

/** `count` arms in a row along one belt line, named arm-a onward. */
const row = (count: number) => {
  const cells: Cell[] = [];
  let hex: Hex = { q: 0, r: 0 };

  for (let index = 0; index < count; index++) {
    cells.push({ hex, arm: `arm-${String.fromCharCode(97 + index)}` });
    hex = neighbour(hex, 0);
  }

  return {
    cells,
    lines: [{ id: 'line-1', cells: cells.map(({ hex: at }) => at) }],
  };
};

/** A pallet on `slot` of `parent`, its cases queued top layer first, bound for `to`. */
const pallet = (
  id: string,
  parent: Hex,
  slot: Side,
  to: Hex,
  seed: number,
  layers: number
): Omit<Target, 'claimed' | 'version'> => {
  const cases = pile(id, seed, layers);

  return {
    id,
    at: { parent, slot },
    to,
    cases,
    queue: [...cases].sort((a, b) => b.at.y - a.at.y).map((one) => one.id),
  };
};

const three = row(3);
const five = row(5);

/** The last cell of a row: where every pallet on it is bound. */
const end = ({ cells }: typeof three) => cells[cells.length - 1].hex;

/** Two loading arms on either side of one line, the end arm at its end. */
const sides = (() => {
  const [a, b, c] = three.cells.map(({ hex }) => hex);

  return {
    cells: [
      { hex: a, arm: 'arm-a' },
      // Across the belt from where the second cell of the row would be.
      { hex: neighbour(b, 1), arm: 'arm-b' },
      { hex: c, arm: 'arm-c' },
    ],
    lines: three.lines,
    end: c,
  };
})();

/** A row of three, and a fourth arm across the belt from the last, so two arms take cases off. */
const pair = (() => {
  const [a, b, c] = three.cells.map(({ hex }) => hex);

  return {
    cells: [
      { hex: a, arm: 'arm-a' },
      { hex: b, arm: 'arm-b' },
      { hex: c, arm: 'arm-c' },
      { hex: neighbour(c, 1), arm: 'arm-d' },
    ],
    lines: three.lines,
    end: c,
  };
})();

/**
 * Two lines from opposite directions, both ending beside one arm that
 * unloads them both, one belt on each side of it. The cells next to it
 * stay empty, so it has a slot of its own to stack on.
 */
const merge = (() => {
  const [a, b, e] = three.cells.map(({ hex }) => hex);
  const h = neighbour(e, 0);
  const g = neighbour(h, 0);

  return {
    cells: [
      { hex: a, arm: 'arm-a' },
      { hex: g, arm: 'arm-b' },
      { hex: e, arm: 'arm-c' },
    ],
    lines: [
      { id: 'line-1', cells: [a, b, e] },
      { id: 'line-2', cells: [g, h, e] },
    ],
    end: e,
  };
})();

/** A point `x`, `z` from the base of the arm in `hex`, on the floor. */
const from = (hex: Hex, x: number, z: number) => {
  const at = centre(hex);

  return { x: at.x + x, z: at.z + z };
};

/** The one-line row's belt, laid out as the hub will lay it. */
const belt = line(three.lines[0].id, three.lines[0].cells);

/**
 * The obstacles: each set a case up against one of the rules. In arm-a's
 * frame the belt runs past to its front right and its pallets stand
 * behind it, so a swing from pallet to belt sweeps out through +x and -z.
 */
const OBSTACLES = {
  // Beside the stand, across the swing to the belt: out of the camera's view, so the arm's sensors find it.
  swing: [box('o1', 'pillar', from(three.cells[0].hex, 0.6, -0.7))],
  // Hanging over the near edge of the pallet on slot 3: the camera sees it, and cases under it can't be lifted straight out.
  beam: (() => {
    const at = childCentre({ parent: three.cells[0].hex, slot: 3 });

    return [box('o1', 'beam', { x: at.x + 0.45, z: at.z })];
  })(),
  // Standing between the arm and the belt, too tall to reach over: every case is refused till it is moved.
  crate: [box('o1', 'crate', from(three.cells[0].hex, 0, -0.75))],
  // Across the belt between the first two arms, resting on it: the belt stands still till it is moved off.
  partition: [
    rest(
      box('o1', 'partition', onLine(belt, (belt.start + belt.span) / 2 - 1)),
      [belt]
    ),
  ],
};

/** A single arm with no belt, and where it stands. */
const alone = { cells: [{ hex: { q: 0, r: 0 }, arm: 'arm-a' }], lines: [] };

const SIMULATIONS: Simulation[] = [
  {
    id: 'one-arm',
    name: 'One arm, pallet to pallet',
    ...alone,
    // Bound for its own cell: the arm restacks it onto a pallet of its own.
    pallets: [pallet('p1', alone.cells[0].hex, 3, alone.cells[0].hex, 83, 2)],
  },
  {
    id: 'one-line',
    name: 'One line',
    ...three,
    pallets: [
      pallet('p1', three.cells[0].hex, 3, end(three), 7, 3),
      pallet('p2', three.cells[0].hex, 4, end(three), 11, 2),
      pallet('p3', three.cells[1].hex, 3, end(three), 5, 2),
    ],
  },
  {
    id: 'three-at-once',
    name: 'Three pallets at once',
    ...three,
    pallets: [
      pallet('p1', three.cells[0].hex, 0, end(three), 3, 2),
      pallet('p2', three.cells[0].hex, 3, end(three), 9, 2),
      pallet('p3', three.cells[0].hex, 4, end(three), 13, 2),
    ],
    capacities: { 'arm-a': { targets: 3, period: 60 } },
  },
  {
    id: 'long-line',
    name: 'Long line',
    ...five,
    pallets: [
      pallet('p1', five.cells[0].hex, 3, end(five), 17, 2),
      pallet('p2', five.cells[1].hex, 3, end(five), 19, 2),
      pallet('p3', five.cells[2].hex, 4, end(five), 23, 3),
    ],
  },
  {
    id: 'both-sides',
    name: 'Both sides of the belt',
    cells: sides.cells,
    lines: sides.lines,
    pallets: [
      pallet('p1', sides.cells[0].hex, 3, sides.end, 29, 2),
      pallet('p2', sides.cells[1].hex, 2, sides.end, 31, 2),
    ],
  },
  {
    id: 'two-unloading',
    name: 'Two arms unloading',
    cells: pair.cells,
    lines: pair.lines,
    pallets: [
      pallet('p1', pair.cells[0].hex, 3, pair.end, 47, 3),
      pallet('p2', pair.cells[0].hex, 4, pair.end, 53, 2),
      pallet('p3', pair.cells[1].hex, 3, pair.end, 59, 2),
    ],
    capacities: { 'arm-a': { targets: 2, period: 60 } },
  },
  {
    id: 'two-lines',
    name: 'Two lines into one arm',
    cells: merge.cells,
    lines: merge.lines,
    pallets: [
      pallet('p1', merge.cells[0].hex, 3, merge.end, 37, 1),
      pallet('p2', merge.cells[0].hex, 4, merge.end, 41, 1),
      pallet('p3', merge.cells[1].hex, 1, merge.end, 43, 1),
    ],
    capacities: { 'arm-a': { targets: 2, period: 60 } },
  },
  {
    id: 'pillar-in-the-swing',
    name: 'Pillar in the swing',
    ...three,
    pallets: [pallet('p1', three.cells[0].hex, 3, end(three), 61, 2)],
    obstacles: OBSTACLES.swing,
  },
  {
    id: 'beam-over-the-pallet',
    name: 'Beam over the pallet',
    ...three,
    pallets: [pallet('p1', three.cells[0].hex, 3, end(three), 67, 3)],
    obstacles: OBSTACLES.beam,
  },
  {
    id: 'crate-in-the-way',
    name: 'Crate in the way',
    ...three,
    pallets: [
      pallet('p1', three.cells[0].hex, 3, end(three), 71, 2),
      pallet('p2', three.cells[0].hex, 4, end(three), 73, 2),
    ],
    obstacles: OBSTACLES.crate,
  },
  {
    id: 'partition-on-the-belt',
    name: 'Partition on the belt',
    ...three,
    pallets: [pallet('p1', three.cells[0].hex, 3, end(three), 79, 2)],
    obstacles: OBSTACLES.partition,
  },
];

export { SIMULATIONS };
export type { Loose, Simulation };
