import React from 'react';

// Components
import { Details, Heading, Layout, Text } from '@/components';

/** The picture: the shader, its scenes, and what it reads from the audio. */
const Picture: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        The picture
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          Everything on screen is drawn by one fragment shader. It has thirteen
          scenes (pools, clouds, rings, bars, a tunnel, a hive, a bloom and a
          few others) and blends between two at a time.
        </Text>
        <Text is='p'>
          For each frame, the page reads a few values from the audio analyser:
          overall energy, low, mid and high frequency energy, brightness, and
          whether a note just landed. It also passes the shader a 128-band
          spectrum as a texture.
        </Text>
        <Text is='p'>
          A scene normally stays up for 24 to 38 seconds. If the music moves
          into a new section, it can change sooner, and the cut waits up to two
          and a half seconds for a note so it lands with the music.
        </Text>
        <Text is='p'>
          The next scene is random, and each track gets its own camera drift and
          a warmer or cooler lean. An earlier version picked scenes by genre. I
          dropped that because it was more code and the result didn’t look any
          better.
        </Text>
        <Text is='p'>
          The colours come from the stylesheet: six inks over a paper colour for
          each theme. A Bayer dither on top matches the rest of the site.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Picture };
