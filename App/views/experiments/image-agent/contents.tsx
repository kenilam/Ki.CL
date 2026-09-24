import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from '@/router';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/** Root element. Holds the shared tokens and renders the child routes. */
const ImageAgent: React.FunctionComponent = () => (
  <div className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
    <Outlet />
  </div>
);

export { ImageAgent };
