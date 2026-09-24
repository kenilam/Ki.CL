import React from 'react';

// Components
import { Details, Heading, Layout, Text } from '@/components';

/** Where the data comes from: a catalogue compiled into the page. */
const Data: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        Where the data comes from
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          This page doesn’t use GraphQL like the rest of the site. The catalogue
          is compiled into the page, and the audio comes from the storage bucket
          through the site’s{' '}
          <Text is='code' variant='secondary'>
            /assets/static
          </Text>{' '}
          route.
        </Text>
        <Text is='p'>
          The original plan, while I was still using Audius, was to query
          GraphQL for the next track. That can come back if the catalogue grows.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Data };
