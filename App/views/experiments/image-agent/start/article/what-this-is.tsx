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
          A person describes a picture and an agent draws it. If something
          important is missing, it asks about it first. After three questions it
          draws anyway. A second model reviews the result before the person sees
          it.
        </Text>
        <Text is='p'>
          I built this to learn how to put an AI feature in front of people
          without it running up a bill or drawing something it shouldn’t.
        </Text>
        <Text is='p'>
          The model calls were the easy part. Most of the code is checks, limits
          and fallbacks, and several of those are there because the first
          version got something wrong.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { WhatThisIs };
