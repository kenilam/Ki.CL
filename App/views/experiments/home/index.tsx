import React from 'react';

// Components
import { Layout } from '@/components';

// Partials
import { More } from './more';
import { ScrollIndicator } from './scroll-indicator';
import { Stage } from './stage';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * The experiments index: a pinned stage of full-screen panels, then a
 * closing section in normal flow.
 */
const Home: React.FunctionComponent = () => (
  <Layout gap='none' justifyItems='stretch'>
    <div className={CLASS_NAME}>
      <ScrollIndicator />
      <Stage />
      <More />
    </div>
  </Layout>
);

export { Home };
