import React from 'react';

// Components
import { Details, Heading, Layout, Text } from '@/components';

/** The address is the player: `/play`, pause and skip as links. */
const Address: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        The address is the player
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          <Text is='code' variant='secondary'>
            /play
          </Text>{' '}
          at the end of a track’s address means it’s playing. Pause is a link
          back to the track. Skip links to the next one, which is picked as soon
          as the current track starts. Back and forward work, and a copied link
          opens the same track.
        </Text>
        <Text is='p'>
          Browsers won’t start audio until the person has interacted with the
          page, so a{' '}
          <Text is='code' variant='secondary'>
            /play
          </Text>{' '}
          link opened from somewhere else lands on the track and waits for one
          click.
        </Text>
        <Text is='p'>
          When the track changes, the old one keeps playing until the new one
          has loaded. Then they crossfade over three seconds.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Address };
