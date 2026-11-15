import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { useInverse } from '@/views/use-inverse';

import { Headline } from './headline';
import { Hint } from './hint';
import { Open } from './open';
import { Topics } from './topics';

import { CLASS_NAME, TITLE_ID } from './constants';

const Workshop: React.FunctionComponent = () => {
  const inverse = useInverse();

  return (
    <Layout
      alignContent='center'
      autoFlow='row'
      gap='wide'
      justifyItems='center'
    >
      <section
        aria-labelledby={TITLE_ID}
        className={classNames(
          CLASS_NAME,
          inverse,
          'kicl-background-color-body',
          'kicl-inline-size-full',
          'kicl-min-block-size-screen',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12',
          'kicl-position-relative',
          'kicl-scroll-leave',
          'kicl-scroll-snap-align-start',
          'kicl-scroll-snap-page'
        )}
      >
        <Headline />
        <Topics />
        <Open />
        <Hint />
      </section>
    </Layout>
  );
};

export { Workshop };
