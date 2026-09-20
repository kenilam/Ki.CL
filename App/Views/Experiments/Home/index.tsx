import React from 'react';

// Components
import { Layout } from '@/Components';

// Partials
import More from './More';
import Stage from './Stage';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * The experiments index: a pinned stage of full-screen panels, then a
 * closing section in normal flow.
 */
const Home: React.FunctionComponent = () => (
  <Layout gap='none' justifyItems='stretch'>
    <div className={CLASS_NAME}>
      <Stage />
      <More />
    </div>
  </Layout>
);

export default Home;
