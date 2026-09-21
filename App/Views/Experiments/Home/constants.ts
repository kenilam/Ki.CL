import { PATH as EXPERIMENTS_PATH } from '@/Views/Experiments/constants';
import { PATH as TREE_OF_LIFE } from '@/Views/Experiments/TreeOfLife/constants';
import { toPath as toMusicVisualiserPath } from '@/Views/Experiments/MusicVisualiser/constants';

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
      'Slow music, drawn as it plays. Chill, lo-fi and piano picked at random, with visuals that react to the sound.',
    plate: 'music-visualiser',
    title: 'Music Visualiser',
    to: toMusicVisualiserPath(),
  },
];

export { CLASS_NAME, EXPERIMENTS };
