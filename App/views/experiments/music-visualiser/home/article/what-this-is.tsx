import React from 'react';

// Components
import { Details, Heading, Layout, Text } from '@/components';

/** What this is: the opening section, open on arrival. */
const WhatThisIs: React.FunctionComponent = () => (
  <Details
    open
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        What this is
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          A small experiment I made for fun. The screen moves with whatever
          lo-fi track is playing.
        </Text>
        <Text is='p'>
          The browser listens to the track, pulls a few numbers out of the audio
          and feeds them into a shader. There’s no machine learning and no
          server doing the work.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { WhatThisIs };
