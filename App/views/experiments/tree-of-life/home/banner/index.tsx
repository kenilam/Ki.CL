import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Partials
import { Attempts } from './attempts';
import { Intro } from './intro';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Stacks below `desktop` through a media query in `styles.scss`.
const Banner: React.FunctionComponent = () => (
  <Layout
    alignItems='center'
    alignContent='center'
    autoFlow='column'
    gap='extreme'
    justifyItems='start'
    justifyContent='start'
  >
    <header
      className={classNames(
        CLASS_NAME,
        'kicl-padding-block-start-widest',
        'kicl-position-relative'
      )}
    >
      <Intro />
      <Attempts />
    </header>
  </Layout>
);

export { CLASS_NAME, Banner };
