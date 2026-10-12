import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

/** Route segment for this view. */
const PATH = 'css-only';

/** Root of every class this view owns. */
const CLASS_NAME = 'kicl--views--experiments--css-only';

/** The width and padding every section of the page takes. */
const SECTION = [
  'kicl-margin-inline-auto',
  'kicl-max-inline-size-columns-8',
  'kicl-padding-block-start-extreme',
  'kicl-padding-inline-frame',
];

/** How many rows the last section fades in. */
const ROWS = 8;

const toPath = (): string => `/${EXPERIMENTS}/${PATH}`;

export { CLASS_NAME, PATH, ROWS, SECTION, toPath };
