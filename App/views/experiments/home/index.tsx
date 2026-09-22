import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from '@/components';

// Partials
import { More } from './more';
import { ScrollIndicator } from './scroll-indicator';
import { Stage } from './stage';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME, COPY } from './constants';

/**
 * The experiments index: a pinned stage of full-screen panels, then a
 * closing section in normal flow.
 */
const Home: React.FunctionComponent = () => (
  <Layout gap='none' justifyItems='stretch'>
    <div className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
      <Heading className='kicl-hidden'>{COPY.title}</Heading>
      <ScrollIndicator />
      <Stage />
      <More />
    </div>
  </Layout>
);

export { Home };
