import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Intro } from '@/views/experiments/tree-of-life/home/banner/intro';
import { More } from '@/views/experiments/tree-of-life/home/banner/more';
import { Plate } from '@/views/experiments/tree-of-life/plate';

// Constants
import { CLASS_NAME as BANNER } from '@/views/experiments/tree-of-life/home/banner/constants';

/** As on the experiments list: the picture centred with no wash, the words at the bottom. */
const Normal: React.FunctionComponent = () => (
  <Layout
    alignContent='end'
    alignItems='start'
    autoFlow='row'
    gap='narrow'
    justifyItems='start'
    justifyContent='stretch'
  >
    <Frame grow>
      <header
        className={classNames(
          BANNER,
          'kicl-padding-block-frame',
          'kicl-position-relative'
        )}
      >
        <Plate />
        <Intro />
        <More />
      </header>
    </Frame>
  </Layout>
);

export { Normal };
