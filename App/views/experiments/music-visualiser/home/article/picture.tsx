import React from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

/** The picture: the shader, its scenes, and what it reads from the audio. */
const Picture: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
    <section>
      <Heading is='h2' className='kicl-font-size-large'>
        The picture
      </Heading>
      <Text is='p'>
        Everything on screen is one fragment shader. It holds thirteen scenes
        (pools, clouds, rings, bars, a tunnel, a hive, a bloom and more) and
        blends between two at a time. Each frame the page reads the analyser for
        a handful of numbers: overall energy, how much sits in the low, mid and
        high bands, how bright the sound is, and whether a note just landed.
        Those, and a 128-band spectrum passed in as a texture, are all the
        shader gets.
      </Text>
      <Text is='p'>
        A scene stays for 24 to 38 seconds, less if the music moves into a new
        section, and the cut waits up to two and a half seconds for a note so it
        lands on one. Which scene comes next is random, and each track gets its
        own camera drift and a warmer or cooler lean. An earlier version picked
        scenes by genre; I dropped that to keep the code small.
      </Text>
      <Text is='p'>
        The colours come from the stylesheet: six inks over a paper colour, per
        theme, with a Bayer dither over the top so it matches the home page.
      </Text>
    </section>
  </Layout>
);

export { Picture };
