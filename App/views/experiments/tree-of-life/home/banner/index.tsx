import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Intro } from './intro';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Stacks below `desktop` through a media query in `styles.scss`.
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
          'kicl-padding-block-start-widest',
          'kicl-position-relative'
        )}
      >
        <Intro />
      </header>
    </Frame>
  </Layout>
);

export { CLASS_NAME, Banner };
