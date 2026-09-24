import type { ButtonProps } from '@/components';
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { PATH as TREE_OF_LIFE } from '@/views/experiments/tree-of-life/constants';
import { toPath as toMusicVisualiserPath } from '@/views/experiments/music-visualiser/constants';
import {
  DESCRIPTION as IMAGE_AGENT_DESCRIPTION,
  toPath as toImageAgentPath,
} from '@/views/experiments/image-agent/constants';

/** Root of every class and custom property in this view. */
const CLASS_NAME = 'kicl--views--experiments__home';

const COPY = {
  title: 'Experiments',
};

export type Experiment = {
  description: string;
  /** Accent of the panel's button, from the palette. */
  level?: ButtonProps['level'];
  /** Which background Stage/Screen paints; a class modifier. */
  plate: string;
  title: string;
  to: string;
};

/** In the order they were made; the number shown is this order. */
const EXPERIMENTS: readonly Experiment[] = [
  {
    description:
      'Every living thing on one globe, drawn from the Open Tree of Life. Start at the origin of life and walk to any species alive today; every organism along the way has a portrait.',
    level: 'confirm',
    plate: 'tree-of-life',
    title: 'Tree of Life',
    to: `/${EXPERIMENTS_PATH}/${TREE_OF_LIFE}`,
  },
  {
    description:
      '166 lo-fi tracks from a public-domain collection, each visualised as it plays across thirteen scenes.',
    level: 'warning',
    plate: 'music-visualiser',
    title: 'Music Visualiser',
    to: toMusicVisualiserPath(),
  },
  {
    description: IMAGE_AGENT_DESCRIPTION,
    plate: 'image-agent',
    title: 'Image Agent',
    to: toImageAgentPath(),
  },
];

export { CLASS_NAME, COPY, EXPERIMENTS };
