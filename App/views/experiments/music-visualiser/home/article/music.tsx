import React from 'react';

// Components
import { Details, Heading, HyperLink, Layout, Text } from '@/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';

/** The music: where the tracks come from, and why they are hosted here. */
const Music: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        The music
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          The tracks come from{' '}
          <HyperLink to={ATTRIBUTION.url} target='_blank' rel='noreferrer'>
            Open Lo-Fi
          </HyperLink>
          : 166 tracks Bilal Tahir generated with Suno and released into the
          public domain. I copied them into the site’s storage bucket and serve
          them from there.
        </Text>
        <Text is='p'>
          I host them because a page can only analyse audio from its own origin,
          or from a server that explicitly allows it. Streamed from anywhere
          else, the tracks would play but the analyser would get nothing.
        </Text>
        <Text is='p'>
          I looked at Audius and Jamendo first because their catalogues are much
          bigger. The machines I built this on couldn’t reach either service, so
          I went with a collection I could host myself.
        </Text>
        <Text is='p'>
          Before that, the page generated its own music: a seeded synth playing
          chords and a melody over sampled piano. It was a lot of code to keep
          one station running, and I never got the piano samples into the bucket
          anyway, so I cut it.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Music };
