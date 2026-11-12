import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Intro } from '@/views/experiments/tree-of-life/home/banner/intro';

// Constants
import { CLASS_NAME as BANNER } from '@/views/experiments/tree-of-life/home/banner/constants';

/** As on the experiments list: the picture centred with no wash, the words at the bottom. */
const Normal: React.FunctionComponent = () => (
  <Layout
    alignContent='end'
    alignItems='start'
    autoFlow='row'
    gap='none'
    justifyItems='start'
    justifyContent='start'
  >
    <Frame grow>
      <header
        className={classNames(
          BANNER,
          'kicl-background-position-center',
          'kicl-background-repeat-no-repeat',
          'kicl-background-size-cover',
          'kicl-padding-block-frame',
          'kicl-position-relative'
        )}
      >
        <Intro />
      </header>
    </Frame>
  </Layout>
);

export { Normal };
