import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Explore } from '@/views/explore';
import { useInverse } from '@/views/use-inverse';

const Footer: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const inverse = useInverse();

  return (
    <Layout alignContent='start' autoFlow='row' gap='none'>
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
          'kicl-scroll-snap-align-start'
        )}
      >
        <Explore />
        {children}
      </footer>
    </Layout>
  );
};

export { Footer };
