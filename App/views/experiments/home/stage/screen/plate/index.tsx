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
        'kicl-inset-0',
        'kicl-position-absolute'
      )}
    >
      {experiment.plate === 'daylight' ? <DaylightPlate /> : null}
      {/* Only the photo needs a scrim; on the other plates it darkens too much. */}
      {experiment.plate === 'image-agent' ? <ImageAgentBackdrop scrim /> : null}
      {experiment.plate === 'kinetic-light' ? <KineticLightBackdrop /> : null}
      {experiment.plate === 'music-visualiser' ? (
        <MusicVisualiser analyser={null} playing={false} track={CLASS_NAME} />
      ) : null}
    </div>
  );
};

export { Plate };
