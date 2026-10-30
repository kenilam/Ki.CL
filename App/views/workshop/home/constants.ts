import type { IconType } from 'react-icons';
import * as Ri from 'react-icons/ri';

import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { PATH as DESIGN_SYSTEM } from '@/views/workshop/design-system/constants';
import { PATH as INTERNATIONALISATION } from '@/views/workshop/internationalisation/constants';

/** Root of every class in this view. */
const CLASS_NAME = 'kicl--views--workshop__home';

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
    icons: [Ri.RiShapesLine, Ri.RiPaletteLine, Ri.RiPuzzle2Line],
    to: `/${WORKSHOP_PATH}/${DESIGN_SYSTEM}`,
  },
  {
    context: 'internationalisation',
    icons: [Ri.RiTranslate2, Ri.RiGlobalLine, Ri.RiSpeakLine],
    to: `/${WORKSHOP_PATH}/${INTERNATIONALISATION}`,
  },
];

/** Cards that stand for topics still to be written, after the real ones. */
const PLACEHOLDERS = 2;

export { CLASS_NAME, PLACEHOLDERS, TOPICS };
