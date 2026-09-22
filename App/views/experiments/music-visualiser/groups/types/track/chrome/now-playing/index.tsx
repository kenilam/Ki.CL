import React from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__now-playing`;

/** The track's title, category and attribution, and any error playing it. */
const NowPlaying: React.FunctionComponent = () => {
  const {
    control: { error },
    track,
  } = useTrackContext();

  return (
    <Layout autoFlow='row' gap='narrowest' justifyItems='start'>
      <div className={CLASS_NAME} aria-live='polite'>
        <Heading is='h2' dense className='kicl-font-size-large'>
          {track.title}
        </Heading>
        <Text is='p' dense variant='secondary' className='kicl-font-size-small'>
          {track.category}
        </Text>
        <HyperLink className='kicl-font-size-smaller' to={ATTRIBUTION.url}>
          {ATTRIBUTION.label}
        </HyperLink>
        {error ? (
          <Text is='p' dense className='kicl-color-error kicl-font-size-small'>
            {error}
          </Text>
        ) : null}
      </div>
    </Layout>
  );
};

export { NowPlaying };
