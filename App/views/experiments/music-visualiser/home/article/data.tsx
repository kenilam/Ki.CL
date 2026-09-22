import React from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

/** Where the data comes from: a catalogue compiled into the page. */
const Data: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
    <section>
      <Heading is='h2' className='kicl-font-size-large'>
        Where the data comes from
      </Heading>
      <Text is='p'>
        The rest of this site talks to its backend over GraphQL. This page
        doesn’t. The catalogue is a list compiled into the page, and the audio
        comes from the bucket through the site’s <code>/assets/static</code>{' '}
        route. A GraphQL query for the next track was the plan while Audius was,
        and it can come back with a bigger catalogue.
      </Text>
    </section>
  </Layout>
);

export { Data };
