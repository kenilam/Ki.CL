import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa, Ri } from '@/icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Catalog
import { draw } from '@/views/experiments/music-visualiser/catalog';

// Styles
import './styles.scss';

// Constants
import {
  COPY as EXPERIMENTS_COPY,
  toPath as toExperimentsPath,
} from '@/views/experiments/constants';
import { CLASS_NAME as HOME } from '@/views/experiments/music-visualiser/home/constants';
import {
  PATH,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${HOME}__banner__words`;

const COPY = {
  lede: '166 lo-fi tracks from a public-domain collection, each drawn while it plays in one of thirteen scenes. Press play once and it keeps going.',
  play: 'Play a random song',
  title: 'Music Visualiser',
};

/** The title, a line about it, and a link to a random track. */
const Words: React.FunctionComponent = () => {
  const [track] = useState(() => draw());

  return (
    <Layout autoFlow='row' gap='none' justifyItems='center'>
      <div
        className={classNames(
          CLASS_NAME,
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-start-header',
          'kicl-position-relative',
          'kicl-text-align-center'
        )}
      >
        <HyperLink
          before={<Ri.RiArrowLeftSFill aria-hidden />}
          to={toExperimentsPath(PATH)}
        >
          {EXPERIMENTS_COPY.back}
        </HyperLink>
        <Heading is='h1' dense className='kicl-font-size-huge'>
          {COPY.title}
        </Heading>
        <Text
          is='p'
          className={classNames(
            'kicl-font-size-medium',
            'kicl-margin-block-start-wide'
          )}
        >
          {COPY.lede}
        </Text>
        <HyperLink
          after={<Fa.FaPlay aria-hidden />}
          className='kicl-margin-block-start-wide'
          lookLikeButton
          size='small'
          to={toTrackPath(track)}
        >
          {COPY.play}
        </HyperLink>
      </div>
    </Layout>
  );
};

export { Words };
