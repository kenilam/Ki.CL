import type { ButtonProps } from 'design/components';
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { PATH as TREE_OF_LIFE } from '@/views/experiments/tree-of-life/constants';
import { toPath as toMusicVisualiserPath } from '@/views/experiments/music-visualiser/constants';
import { toPath as toImageAgentPath } from '@/views/experiments/image-agent/constants';
import { toPath as toDaylightPath } from '@/views/experiments/daylight/constants';

/** Root of every class and custom property in this view. */
const CLASS_NAME = 'kicl--views--experiments__home';

/** `level` is the accent of the panel's button. */
export type Experiment = Pick<ButtonProps, 'level'> & {
  /** Names it in `common` (`experiment_<context>`) and describes it here (`description_<context>`). */
  context: 'daylight' | 'image_agent' | 'music_visualiser' | 'tree_of_life';
  /** Which background Stage/Screen paints; a class modifier. */
  plate: string;
  to: string;
};

/** In the order they were made; the number shown is this order. */
const EXPERIMENTS: readonly Experiment[] = [
  {
    context: 'tree_of_life',
    level: 'confirm',
    plate: 'tree-of-life',
    to: `/${EXPERIMENTS_PATH}/${TREE_OF_LIFE}`,
  },
  {
    context: 'music_visualiser',
    level: 'warning',
    plate: 'music-visualiser',
    to: toMusicVisualiserPath(),
  },
  {
    context: 'image_agent',
    plate: 'image-agent',
    to: toImageAgentPath(),
  },
  {
    context: 'daylight',
    level: 'warning',
    plate: 'daylight',
    to: toDaylightPath(),
  },
];

export { CLASS_NAME, EXPERIMENTS };
