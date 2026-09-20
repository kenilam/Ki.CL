import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa } from '@/Icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPath,
  toTrackPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${VIEW}__home`;

const COPY = {
  lede: 'A radio for slow music, drawn as it plays. Chill, lo-fi and piano, chosen at random, one after another. Press play once and it keeps going.',
  play: 'Play',
  title: 'Music Visualiser',
};

/**
 * The view's index: the title, a line about it, and a play control that
 * links to a track drawn at random - a station at random, then one of its
 * tracks - so every visit starts somewhere else. Until the draw settles
 * the link goes to the first station, which redirects down to a track.
 */
const Home: React.FunctionComponent = () => {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const station =
      radio.groups[Math.floor(Math.random() * radio.groups.length)];

    void radio
      .next([], station.group)
      .then((track) => {
        if (!cancelled) {
          setPath(toTrackPath(track));
        }
      })
      .catch(() => {
        /* The link's fallback stands. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
          aria-label={COPY.play}
          lookLikeButton
          to={path ?? toPath({ group: radio.groups[0].group })}
          variant='ghost'
        >
          <Fa.FaPlay aria-hidden />
        </HyperLink>
      </section>
    </Layout>
  );
};

export { CLASS_NAME };
export default Home;
