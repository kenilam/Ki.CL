import React from 'react';

// Libraries
import classNames from 'classnames';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

// Partials
import { Mosaic } from './mosaic';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/** The background: fades in and drifts. Screen's modifier picks the picture. */
const Plate: React.FunctionComponent = () => {
  const { experiment } = useScreenContext();

  return (
    <div
      aria-hidden
      className={classNames(CLASS_NAME, 'kicl-position-absolute')}
    >
      {experiment.plate === 'image-agent' ? <Mosaic /> : null}
    </div>
  );
};

export { Plate };
