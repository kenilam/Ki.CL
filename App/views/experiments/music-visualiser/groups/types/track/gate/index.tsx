import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Fa } from '@/icons';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Catalog
import {
  ATTRIBUTION,
  NAME,
} from '@/views/experiments/music-visualiser/catalog';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPlayPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__gate`;

const COPY = {
  play: 'Play',
};

/**
 * A track's gate: its title, where it is from, and a link to its `/play`.
 * The press on that link is the gesture the browser needs before audio.
 */
const Gate: React.FunctionComponent = () => {
  const { track } = useTrackContext();

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
          {NAME} · {track.category}
        </Text>
        <HyperLink className='kicl-font-size-small' to={ATTRIBUTION.url}>
          {ATTRIBUTION.label}
        </HyperLink>
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

export { Gate };
