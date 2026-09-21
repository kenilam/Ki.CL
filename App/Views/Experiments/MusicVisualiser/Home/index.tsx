import React, { useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa } from '@/Icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Catalog
import { draw } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toTrackPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${VIEW}__home`;

const COPY = {
  lede: '166 lo-fi tracks from a public-domain collection, each drawn while it plays in one of twelve scenes. Press play once and it keeps going.',
  play: 'Play a random song',
  title: 'Music Visualiser',
};

/** The view's index: the title, a line about it, and a link to a track drawn at random. */
const Home: React.FunctionComponent = () => {
  const [track] = useState(() => draw());

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='row'
      gap='wide'
      justifyContent='center'
      justifyItems='center'
    >
      <section
        className={classNames(
          CLASS_NAME,
          'kicl-inset-0',
          'kicl-position-absolute',
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
      </section>
    </Layout>
  );
};

export { CLASS_NAME };
export default Home;
