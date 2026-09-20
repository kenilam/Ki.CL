import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa } from '@/Icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Context
import { useTrackContext } from '@/Views/Experiments/MusicVisualiser/Context';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPlayPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${VIEW}__track`;

const COPY = {
  play: 'Play',
};

/**
 * A track's index: its title, its station and type, and the play control,
 * a link to the play route. The press on it is the gesture the browser
 * needs before that route may sound. On the play route the same control
 * shows pause and links back here.
 */
const Home: React.FunctionComponent = () => {
  const track = useTrackContext();

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
          {track.title}
        </Heading>
        <Text
          is='p'
          dense
          variant='secondary'
          className='kicl-font-size-medium'
        >
          {track.station} · {track.artist}
        </Text>
        {track.attribution.url ? (
          <HyperLink
            className='kicl-font-size-small'
            to={track.attribution.url}
          >
            {track.attribution.label}
          </HyperLink>
        ) : (
          <Text
            is='p'
            dense
            variant='secondary'
            className='kicl-font-size-small'
          >
            {track.attribution.label}
          </Text>
        )}
        <HyperLink
          aria-label={COPY.play}
          lookLikeButton
          size='small'
          to={toPlayPath(track)}
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
