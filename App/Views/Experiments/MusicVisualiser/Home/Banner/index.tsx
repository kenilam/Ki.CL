import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa, Ri } from '@/Icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Catalog
import { draw } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Partials
import { Visualiser } from '@/Views/Experiments/MusicVisualiser/Groups/Types/Track/Visualiser';

// Styles
import './Styles.scss';

// Constants
import {
  ARTICLE_ID,
  CLASS_NAME as HOME,
} from '@/Views/Experiments/MusicVisualiser/Home/constants';
import { toTrackPath } from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${HOME}__banner`;

const COPY = {
  lede: '166 lo-fi tracks from a public-domain collection, each drawn while it plays in one of thirteen scenes. Press play once and it keeps going.',
  more: 'How it was made',
  play: 'Play a random song',
  title: 'Music Visualiser',
};

/**
 * One screen tall, over the picture drawing a scene with nothing playing:
 * the title, a line about it, a link to a random track, and a chevron down
 * to the article.
 */
const Banner: React.FunctionComponent = () => {
  const [track] = useState(() => draw());

  return (
    <Layout
      alignContent='center'
      justifyContent='stretch'
      justifyItems='center'
    >
      <header className={classNames(CLASS_NAME, 'kicl-position-relative')}>
        <Visualiser analyser={null} playing={false} track={CLASS_NAME} />
        <Layout autoFlow='row' gap='wide' justifyItems='center'>
          <div
            className={classNames(
              `${CLASS_NAME}__words`,
              'kicl-position-relative',
              'kicl-text-align-center'
            )}
          >
            <Heading is='h1' dense className='kicl-font-size-huge'>
              {COPY.title}
            </Heading>
            <Text is='p' className='kicl-font-size-medium'>
              {COPY.lede}
            </Text>
            <HyperLink
              after={<Fa.FaPlay aria-hidden />}
              lookLikeButton
              size='small'
              to={toTrackPath(track)}
              variant='ghost'
            >
              {COPY.play}
            </HyperLink>
          </div>
        </Layout>
        <Layout justifyItems='center'>
          <aside
            className={classNames(
              'kicl-inset-block-end-wide',
              'kicl-inset-inline-0',
              'kicl-position-absolute'
            )}
          >
            <HyperLink
              aria-label={COPY.more}
              lookLikeButton
              size='large'
              title={COPY.more}
              to={`#${ARTICLE_ID}`}
              variant='secondary'
            >
              <Ri.RiArrowDownSLine aria-hidden />
            </HyperLink>
          </aside>
        </Layout>
      </header>
    </Layout>
  );
};

export { Banner };
