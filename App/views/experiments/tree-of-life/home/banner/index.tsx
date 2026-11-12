import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Intro } from './intro';

// Styles
import '@/views/experiments/tree-of-life/styles.scss';
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Stacks at the `normal` breakpoint and below, through `styles.scss`.
const Banner: React.FunctionComponent = () => (
  <Layout
    alignContent='center'
    autoFlow='row'
    gap='none'
    justifyItems='start'
    justifyContent='start'
  >
    <Frame grow>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-padding-block-frame',
          'kicl-position-relative'
        )}
      >
        <Intro />
      </header>
    </Frame>
  </Layout>
);

export { CLASS_NAME, Banner };
