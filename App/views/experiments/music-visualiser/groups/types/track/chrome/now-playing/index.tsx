import React from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Catalog
import {
  ATTRIBUTION,
  type Track,
} from '@/views/experiments/music-visualiser/catalog';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__now-playing`;

type Props = {
  error: string | null;
  track: Track;
};

/** The track's title, category and attribution, and any error playing it. */
const NowPlaying: React.FunctionComponent<Props> = ({ error, track }) => (
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

export { NowPlaying };
