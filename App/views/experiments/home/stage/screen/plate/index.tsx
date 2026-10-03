import React from 'react';

// Libraries
import classNames from 'classnames';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

// Partials
import { Backdrop } from '@/views/experiments/image-agent/backdrop';
import { Visualiser } from '@/views/experiments/music-visualiser/groups/types/track/visualiser';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * The background: fades in and drifts. The visualiser draws its idle scene,
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
        'kicl-inset-inline-0',
        'kicl-position-absolute',
        // Only the photos need a scrim; on the other plates it darkens too much.
        { 'kicl-scrim': experiment.plate === 'image-agent' }
      )}
    >
      {experiment.plate === 'image-agent' ? <Backdrop /> : null}
      {experiment.plate === 'music-visualiser' ? (
        <Visualiser analyser={null} playing={false} track={CLASS_NAME} />
      ) : null}
    </div>
  );
};

export { Plate };
