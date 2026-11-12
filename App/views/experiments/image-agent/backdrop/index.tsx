import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/image-agent/constants';

const CLASS_NAME = `${VIEW}__backdrop`;

/**
 * The preview picture, darkened and muted so text on it stays readable. Fills
 * the nearest positioned parent.
 */
const Backdrop: React.FunctionComponent = () => {
  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-background-position-center',
        'kicl-background-size-cover',
        'kicl-scrim',
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
    />
  );
};

export { Backdrop };
