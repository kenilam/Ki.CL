import React from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

/** What this is: the opening section, before how it was made. */
const WhatThisIs: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
    <header>
      <Heading is='h2' className='kicl-font-size-large'>
        What this is
      </Heading>
      <Text is='p'>
        A small experiment I made for fun. Put a lo-fi track on and the screen
        moves with it. There’s no machine learning and no server doing the work:
        the browser listens to the track, and a shader draws from what it hears.
      </Text>
    </header>
  </Layout>
);

export { WhatThisIs };
