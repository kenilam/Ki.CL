import React from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';

/** The music: where the tracks come from, and why they are hosted here. */
const Music: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
    <section>
      <Heading is='h2' className='kicl-font-size-large'>
        The music
      </Heading>
      <Text is='p'>
        The tracks are{' '}
        <HyperLink to={ATTRIBUTION.url} target='_blank' rel='noreferrer'>
          Open Lo-Fi
        </HyperLink>
        , 166 pieces Bilal Tahir generated with Suno and released into the
        public domain. I copied them into the site’s own storage bucket and
        serve them from this address. A page can only analyse audio from its own
        origin, or from a server that says it may, so streaming from someone
        else’s host would have played fine and drawn nothing.
      </Text>
      <Text is='p'>
        I looked at Audius and Jamendo first, for the bigger catalogues. The
        machines I built this on couldn’t reach either of them, so I went with a
        collection I could host.
      </Text>
      <Text is='p'>
        Before that, the page wrote its own music: a synth playing chords and a
        melody from a seed, over a sampled piano. It was a lot of code to keep
        one station going, and the piano samples never made it into the bucket,
        so I took it out.
      </Text>
    </section>
  </Layout>
);

export { Music };
