import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/image-agent/constants';

const CLASS_NAME = `${VIEW}__backdrop`;

type Props = {
  /** Darken and mute the picture so text on it stays readable. */
  scrim?: boolean;
};

/** The preview picture. Fills the nearest positioned parent. */
const Backdrop: React.FunctionComponent<Props> = ({ scrim }) => {
  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        { 'kicl-scrim': scrim },
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
    />
  );
};

export { Backdrop };
