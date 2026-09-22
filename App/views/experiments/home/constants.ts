import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { PATH as TREE_OF_LIFE } from '@/views/experiments/tree-of-life/constants';
import { toPath as toMusicVisualiserPath } from '@/views/experiments/music-visualiser/constants';

/** Root of every class and custom property in this view. */
const CLASS_NAME = 'kicl--views--experiments__home';

export type Experiment = {
  description: string;
  /** Which background Stage/Screen paints; a class modifier. */
  plate: string;
  title: string;
  to: string;
};

/** In the order they were made; the number shown is this order. */
const EXPERIMENTS: readonly Experiment[] = [
  {
    description:
      'Every living thing on one globe, drawn from the Open Tree of Life. Start at the origin of life and walk to any species alive now; every organism you pass has a portrait drawn for it.',
    plate: 'tree-of-life',
    title: 'Tree of Life',
    to: `/${EXPERIMENTS_PATH}/${TREE_OF_LIFE}`,
  },
  {
    description:
      '166 lo-fi tracks from a public-domain collection, each drawn while it plays in one of thirteen scenes.',
    plate: 'music-visualiser',
    title: 'Music Visualiser',
    to: toMusicVisualiserPath(),
  },
];

export { CLASS_NAME, EXPERIMENTS };
