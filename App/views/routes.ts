import * as Tb from 'react-icons/tb';

// Icons
import type { IconType } from 'design/icons';

// Components
import type { ButtonProps } from 'design/components';

// Paths
import { PATH as ABOUT_PATH } from '@/views/about/constants';
import { PATH as BLOG_PATH } from '@/views/blog/constants';
import { TO as SPATIAL_CSS } from '@/views/blog/spatial-css/constants';
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments/constants';
import { toPath as toDaylightPath } from '@/views/experiments/daylight/constants';
import { toPath as toImageAgentPath } from '@/views/experiments/image-agent/constants';
import { toPath as toKineticLightPath } from '@/views/experiments/kinetic-light/constants';
import { toPath as toMusicVisualiserPath } from '@/views/experiments/music-visualiser/constants';
import { toPath as toSwatchPath } from '@/views/experiments/swatch/constants';
import { PATH as TREE_OF_LIFE } from '@/views/experiments/tree-of-life/constants';
import { PATH as HOME_PATH } from '@/views/home/constants';
import { PATH as ME_PATH } from '@/views/me/constants';
import { PAGE_PATH as PASSWORD_PATH } from '@/views/me/password/constants';
import { PATH as RESUME_PATH } from '@/views/resume/constants';
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { PATH as ARCHITECTURE } from '@/views/workshop/architecture/constants';
import { PATH as DESIGN_SYSTEM } from '@/views/workshop/design-system/constants';
import { PATH as I18N } from '@/views/workshop/i18n/constants';

const PAGES = {
  about: `/${ABOUT_PATH}`,
  blog: `/${BLOG_PATH}`,
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
  { key: 'about', to: PAGES.about },
] as const;

/** `level` is the accent of the panel's button. */
type Experiment = Pick<ButtonProps, 'level'> & {
  /** Names it in `common` (`experiment_<context>`) and describes it here (`description_<context>`). */
  context:
    | 'daylight'
    | 'image_agent'
    | 'kinetic_light'
    | 'music_visualiser'
    | 'swatch'
    | 'tree_of_life';
  /** Which background Stage/Screen paints. */
  plate:
    | 'daylight'
    | 'image-agent'
    | 'kinetic-light'
    | 'music-visualiser'
    | 'swatch'
    | 'tree-of-life';
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
  {
    context: 'swatch',
    plate: 'swatch',
    to: toSwatchPath(),
  },
];

type Topic = {
  /**
   * Its name is this key in `common`, which the menu reads too. Its
   * description is `description_<context>` in `workshop`.
   */
  context: 'architecture' | 'design_system' | 'internationalisation';
  /** Drawn as a triangle on its card, the first on top. */
  icons: readonly [IconType, IconType, IconType];
  to: string;
};

const TOPICS: readonly Topic[] = [
  {
    context: 'design_system',
    // The design system's own sections: components, tokens and patterns.
    icons: [Tb.TbVector, Tb.TbPalette, Tb.TbPuzzle],
    to: `/${WORKSHOP_PATH}/${DESIGN_SYSTEM}`,
  },
  {
    context: 'internationalisation',
    icons: [Tb.TbLanguage, Tb.TbWorld, Tb.TbMessageDots],
    to: `/${WORKSHOP_PATH}/${I18N}`,
  },
  {
    context: 'architecture',
    icons: [Tb.TbTopologyStar3, Tb.TbServer, Tb.TbPlug],
    to: `/${WORKSHOP_PATH}/${ARCHITECTURE}`,
  },
];

type Post = {
  /** Its title is `title_<context>` in `blog`, and its description `description_<context>`. */
  context: 'spatial_css';
  /** The day it was published, as `YYYY-MM-DD`. */
  published: string;
  to: string;
};

/** Newest first. */
const POSTS: readonly Post[] = [
  {
    context: 'spatial_css',
    published: '2026-11-18',
    to: SPATIAL_CSS,
  },
];

export {
  EXPERIMENTS,
  PAGES,
  POSTS,
  ROUTES,
  TOPICS,
  type Experiment,
  type Post,
  type Topic,
};
