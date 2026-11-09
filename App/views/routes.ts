import type { IconType } from 'react-icons';
import * as Bs from 'react-icons/bs';

// Components
import type { ButtonProps } from 'design/components';

// Paths
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { toPath as toDaylightPath } from '@/views/experiments/daylight/constants';
import { toPath as toImageAgentPath } from '@/views/experiments/image-agent/constants';
import { toPath as toKineticLightPath } from '@/views/experiments/kinetic-light/constants';
import { toPath as toMusicVisualiserPath } from '@/views/experiments/music-visualiser/constants';
import { PATH as TREE_OF_LIFE } from '@/views/experiments/tree-of-life/constants';
import { toPath as toPlatePath } from '@/views/experiments/tree-of-life/explorer/details-path';
import { PATH as HOME_PATH } from '@/views/home/constants';
import { PATH as ME_PATH } from '@/views/me/constants';
import { PAGE_PATH as PASSWORD_PATH } from '@/views/me/password/constants';
import { PATH as RESUME_PATH } from '@/views/resume/constants';
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { PATH as DESIGN_SYSTEM } from '@/views/workshop/design-system/constants';
import { PATH as I18N } from '@/views/workshop/i18n/constants';

const PAGES = {
  experiments: `/${EXPERIMENTS_PATH}`,
  home: `/${HOME_PATH}`,
  me: `/${ME_PATH}`,
  password: PASSWORD_PATH,
  resume: `/${RESUME_PATH}`,
  workshop: `/${WORKSHOP_PATH}`,
};

/** The top routes, in the order every menu lists them. */
const ROUTES = [
  { key: 'experiments', to: PAGES.experiments },
  { key: 'workshop', to: PAGES.workshop },
  { key: 'resume', to: PAGES.resume },
] as const;

/** `level` is the accent of the panel's button. */
type Experiment = Pick<ButtonProps, 'level'> & {
  /** Names it in `common` (`experiment_<context>`) and describes it here (`description_<context>`). */
  context:
    | 'daylight'
    | 'image_agent'
    | 'kinetic_light'
    | 'music_visualiser'
    | 'tree_of_life';
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
  {
    context: 'kinetic_light',
    level: 'neutral',
    plate: 'kinetic-light',
    to: toKineticLightPath(),
  },
];

type Topic = {
  /**
   * Its name is this key in `common`, which the menu reads too. Its
   * description is `description_<context>` in `workshop`.
   */
  context: 'design_system' | 'internationalisation';
  /** Drawn as a triangle on its card, the first on top. */
  icons: readonly [IconType, IconType, IconType];
  to: string;
};

const TOPICS: readonly Topic[] = [
  {
    context: 'design_system',
    // The design system's own sections: components, tokens and patterns.
    icons: [Bs.BsBoundingBoxCircles, Bs.BsPalette, Bs.BsPuzzle],
    to: `/${WORKSHOP_PATH}/${DESIGN_SYSTEM}`,
  },
  {
    context: 'internationalisation',
    icons: [Bs.BsTranslate, Bs.BsGlobe, Bs.BsChatDots],
    to: `/${WORKSHOP_PATH}/${I18N}`,
  },
];

/** Cards that stand for topics still to be written, after the real ones. */

const RECORD_PATHS: Record<string, (documentId: string) => string> = {
  image_agent_threads: toImageAgentPath,
  kinetic_light_readings: toKineticLightPath,
  password_changes: () => PASSWORD_PATH,
  tree_of_life: toPlatePath,
};

export {
  EXPERIMENTS,
  PAGES,
  RECORD_PATHS,
  ROUTES,
  TOPICS,
  type Experiment,
  type Topic,
};
