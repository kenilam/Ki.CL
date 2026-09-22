import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SCREEN } from '../constants';

const CLASS_NAME = `${SCREEN}__plate`;

/** The background: fades in and drifts. Screen's modifier picks the picture. */
const Plate: React.FunctionComponent = () => (
  <div
    aria-hidden
    className={classNames(CLASS_NAME, 'kicl-position-absolute')}
  />
);

export { Plate };
