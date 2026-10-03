import React from 'react';

// Components
import { Details, Heading, Text } from 'design/components';

/** What this is: the opening section, open on arrival. */
const WhatThisIs: React.FunctionComponent = () => (
  <Details
    gap='narrow'
    open
    summary={
      <Heading is='h3' className='kicl-font-size-large'>
        What this is
      </Heading>
    }
  >
    <Text is='p'>
      A small experiment I made for fun. The screen moves with whatever lo-fi
      track is playing.
    </Text>
    <Text is='p'>
      The browser listens to the track, pulls a few numbers out of the audio and
      feeds them into a shader. There’s no machine learning and no server doing
      the work.
    </Text>
  </Details>
);

export { WhatThisIs };
