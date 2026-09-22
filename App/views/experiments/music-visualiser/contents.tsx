import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from '@/router';

// Components
import { Layout } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/** The view's root: sized to the viewport, the routes beneath draw into it. */
const MusicVisualiser: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none'>
    <div
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-position-relative'
      )}
    >
      <Outlet />
    </div>
  </Layout>
);

export { MusicVisualiser };
