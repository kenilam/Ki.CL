const PATH = 'about';

const CLASS_NAME = 'kicl--views--about';

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

type Chapter = (typeof CHAPTERS)[number];

export { CHAPTERS, CLASS_NAME, PATH, type Chapter };
