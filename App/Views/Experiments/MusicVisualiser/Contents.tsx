import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from '@/Router';

// Components
import { Layout } from '@/Components';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/** The view's root: sized to the viewport, the routes beneath draw into it. */
const MusicVisualiser: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none'>
    <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
      <Outlet />
    </section>
  </Layout>
);

export default MusicVisualiser;
