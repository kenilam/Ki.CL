import React from 'react';

// Libraries
import classNames from 'classnames';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

// Partials
import {
  DaylightPlate,
  ImageAgentBackdrop,
  KineticLightBackdrop,
  MusicVisualiser,
  TreeOfLifePlate,
} from '@/views/experiments/previews';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * The background: fades in as the page scrolls. The visualiser draws its idle scene,
 * as on its own home; the other experiments show a picture.
 */
const Plate: React.FunctionComponent = () => {
  const { experiment } = useScreenContext();

  return (
    <div
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-animation-none-reduced-motion',
        'kicl-background-color-body',
        'kicl-inset-0',
        'kicl-position-absolute'
      )}
    >
      {experiment.plate === 'daylight' ? <DaylightPlate /> : null}
      {experiment.plate === 'image-agent' ? <ImageAgentBackdrop /> : null}
      {experiment.plate === 'kinetic-light' ? <KineticLightBackdrop /> : null}
      {experiment.plate === 'music-visualiser' ? <MusicVisualiser /> : null}
      {experiment.plate === 'tree-of-life' ? <TreeOfLifePlate /> : null}
    </div>
  );
};

export { Plate };
