import React from 'react';

import classNames from 'classnames';

import { Animation, Layout } from 'design/components';

import { TOPICS } from '@/views/routes';

import { useInverse } from '@/views/home/use-inverse';

import { Anchors } from './anchors';
import { Headline } from './headline';
import { Icons } from './icons';
import { Open } from './open';
import { Topics } from './topics';

import './styles.scss';

import { CLASS_NAME, TITLE_ID } from './constants';

const Workshop: React.FunctionComponent = () => {
  const inverse = useInverse();

  return (
    <section
      aria-labelledby={TITLE_ID}
      className={classNames(
        CLASS_NAME,
        inverse,
        'kicl-background-color-body',
        'kicl-inline-size-full',
        'kicl-overflow-x-clip',
        'kicl-padding-inline-frame-columns-12',
        'kicl-position-relative'
      )}
      style={
        {
          '--kicl--views--home__workshop--topics': TOPICS.length,
        } as never
      }
    >
      <Layout
        alignContent='center'
        autoFlow='row'
        gap='wide'
        justifyItems='center'
      >
        <Animation delay={1000}>
          <div
            className={classNames(
              `${CLASS_NAME}__stage`,
              'kicl-inset-block-start-0',
              'kicl-min-block-size-screen',
              'kicl-padding-block-wider',
              'kicl-position-sticky'
            )}
          >
            <Headline />
            <Topics />
            <Icons />
            <Open />
          </div>
        </Animation>
      </Layout>
      <Anchors />
    </section>
  );
};

export { Workshop };
