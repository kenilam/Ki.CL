import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Explore } from '@/views/explore';
import { useInverse } from '@/views/use-inverse';

import { Menu } from './menu';

const Footer: React.FunctionComponent = () => {
  const inverse = useInverse();

  return (
    <Layout alignContent='start' autoFlow='row'>
      <footer
        className={classNames(
          inverse,
          'kicl-background-color-body',
          'kicl-grid-template-columns-shrink',
          'kicl-inline-size-full',
          'kicl-min-block-size-screen',
          'kicl-padding-block-end-extreme',
          'kicl-position-relative',
          'kicl-scroll-enter',
          'kicl-scroll-enter-far',
          'kicl-scroll-snap-align-start'
        )}
      >
        <Explore />
        <Menu />
      </footer>
    </Layout>
  );
};

export { Footer };
