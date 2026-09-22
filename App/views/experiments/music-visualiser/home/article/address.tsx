import React from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

/** The address is the player: `/play`, pause and skip as links. */
const Address: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
    <section>
      <Heading is='h2' className='kicl-font-size-large'>
        The address is the player
      </Heading>
      <Text is='p'>
        <code>/play</code> on the end of a track’s address means it’s playing.
        Pause is a link back to the track, and skip is a link to the next one,
        picked as soon as the current one starts. Back and forward work, and a
        copied link opens on the same track.
      </Text>
      <Text is='p'>
        Browsers won’t make sound before you’ve clicked something, so a{' '}
        <code>/play</code> link opened from outside lands on the track’s page
        and waits for one press. When a track changes, the old one keeps playing
        until the new one has loaded, then they cross over three seconds.
      </Text>
    </section>
  </Layout>
);

export { Address };
