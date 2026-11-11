import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Attribution } from './attribution';
import { Back } from './back';
import { Category } from './category';
import { Failure } from './failure';
import { Title } from './title';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__now-playing`;

/** The track's title, category and attribution, and any error playing it. */
const NowPlaying: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrowest' justifyItems='start'>
      <header
        className={classNames(CLASS_NAME, 'kicl-max-inline-size-columns-4')}
      >
        <Back />
        <Title />
        <Category />
        <Attribution />
        <Failure />
      </header>
    </Layout>
  );
};

export { NowPlaying };
