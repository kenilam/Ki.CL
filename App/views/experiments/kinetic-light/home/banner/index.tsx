import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Backdrop } from '@/views/experiments/kinetic-light/backdrop';
import { Generate } from './generate';
import { Header } from './header';
import { More } from './more';
import { Privacy } from './privacy';
import { SongsSheet } from './songs-sheet';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/kinetic-light/home/constants';

const CLASS_NAME = `${HOME}__banner`;

const Banner: React.FunctionComponent = () => (
  <Layout alignContent='end' justifyContent='stretch' justifyItems='start'>
    <Frame grow>
      <section
        className={classNames(
          CLASS_NAME,
          'kicl--theme--dark',
          'kicl-position-relative'
        )}
      >
        <Backdrop />
        <Layout autoFlow='row' gap='wide' justifyItems='start'>
          <article
            className={classNames(
              `${CLASS_NAME}__words`,
              'kicl-padding-block-extreme',
              'kicl-padding-inline-frame-columns-12',
              'kicl-position-relative',
              'kicl-z-index-raised'
            )}
          >
            <Header />
            <Generate />
            <Privacy />
            <SongsSheet />
            <More />
          </article>
        </Layout>
      </section>
    </Frame>
  </Layout>
);

export { Banner };
