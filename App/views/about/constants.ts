const PATH = 'about';

const CLASS_NAME = 'kicl--views--about';

const OPENING = 'opening';

const CHAPTERS = [
  'art_school',
  'web',
  'engineer',
  'stores',
  'people',
  'systems',
  'platforms',
  'mentoring',
] as const;

const GLYPHS = {
  art_school: [
    '..###..',
    '.#...#.',
    '#.....#',
    '#..#..#',
    '#.....#',
    '.#...#.',
    '..###..',
  ],
  engineer: [
    '.......',
    '#......',
    '.#.....',
    '..#....',
    '.#.....',
    '#...###',
    '.......',
  ],
  mentoring: [
    '.#####.',
    '#.....#',
    '#.###.#',
    '#.....#',
    '.##.##.',
    '..##...',
    '.#.....',
  ],
  opening: [
    '#..#..#',
    '.#.#.#.',
    '..###..',
    '#######',
    '..###..',
    '.#.#.#.',
    '#..#..#',
  ],
  people: [
    '.#####.',
    '.#...#.',
    '.#...#.',
    '.#####.',
    '...#...',
    '...#...',
    '.#####.',
  ],
  platforms: [
    '#.....#',
    '.#...#.',
    '..###..',
    '..###..',
    '..###..',
    '.#...#.',
    '#.....#',
  ],
  stores: [
    '..#.#..',
    '.#.#.#.',
    '#.#.#.#',
    '.#.#.#.',
    '#.#.#.#',
    '.#.#.#.',
    '..#.#..',
  ],
  systems: [
    '.......',
    '...#...',
    '...#...',
    '..#.#..',
    '##..#.#',
    '....##.',
    '.......',
  ],
  web: [
    '#######',
    '#######',
    '#.....#',
    '#.....#',
    '#.....#',
    '#.....#',
    '#######',
  ],
} as const;

type Chapter = (typeof CHAPTERS)[number];

type Moment = keyof typeof GLYPHS;

export {
  CHAPTERS,
  CLASS_NAME,
  GLYPHS,
  OPENING,
  PATH,
  type Chapter,
  type Moment,
};
