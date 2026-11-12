import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Intro } from '@/views/experiments/tree-of-life/home/banner/intro';
import { More } from '@/views/experiments/tree-of-life/home/banner/more';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as BANNER } from '@/views/experiments/tree-of-life/home/banner/constants';

const CLASS_NAME = `${BANNER}__default`;

const Default: React.FunctionComponent = () => (
  <Layout
    alignContent='center'
    autoFlow='row'
    gap='none'
    justifyItems='start'
    justifyContent='stretch'
  >
    <Frame grow>
      <header
        className={classNames(
          BANNER,
          CLASS_NAME,
          'kicl-background-repeat-no-repeat',
          'kicl-background-size-cover',
          'kicl-padding-block-frame',
          'kicl-position-relative'
        )}
      >
        <Intro />
        <More />
      </header>
    </Frame>
  </Layout>
);

export { Default };
