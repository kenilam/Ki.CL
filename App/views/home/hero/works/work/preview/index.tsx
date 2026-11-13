import React from 'react';

import classNames from 'classnames';

import { DARK_THEME_CLASS_NAME } from 'design/hooks';

import {
  DaylightPreview,
  KineticLightBackdrop,
  MusicVisualiser,
} from '@/views/experiments/previews';

import type { Props } from '@/views/home/hero/works/work';

import { CLASS_NAME as WORK } from '@/views/home/hero/works/work/constants';

const CLASS_NAME = `${WORK}__preview`;

const PREVIEWS: Record<Props['plate'], React.ReactNode> = {
  daylight: <DaylightPreview />,
  'kinetic-light': <KineticLightBackdrop />,
  'music-visualiser': <MusicVisualiser />,
};

const Preview: React.FunctionComponent<Props> = ({ plate }) => {
  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        DARK_THEME_CLASS_NAME,
        'kicl-aspect-ratio-video',
        'kicl-background-color-body',
        'kicl-display-block',
        'kicl-overflow-hidden',
        'kicl-pointer-events-none',
        'kicl-position-relative'
      )}
    >
      {PREVIEWS[plate]}
    </span>
  );
};

export { Preview };
