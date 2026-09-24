import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from '@/components';

// Partials
import { Visualiser } from '@/views/experiments/music-visualiser/groups/types/track/visualiser';
import { More } from './more';
import { Words } from './words';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/music-visualiser/home/constants';

const CLASS_NAME = `${HOME}__banner`;

/**
 * One screen tall, over the picture drawing a scene with nothing playing:
 * the title, a line about it, a link to a random track, and a chevron down
 * to the article.
 */
const Banner: React.FunctionComponent = () => (
  <Layout alignContent='center' justifyContent='stretch' justifyItems='center'>
    <Frame grow hold>
      <header className={classNames(CLASS_NAME, 'kicl-position-relative')}>
        <Visualiser analyser={null} playing={false} track={CLASS_NAME} />
        <Words />
        <More />
      </header>
    </Frame>
  </Layout>
);

export { Banner };
