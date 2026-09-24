import React from 'react';

// Components
import { Details, Heading, Layout, Text } from '@/components';

/** What this is: the opening section, open on arrival. */
const HowItWorks: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        How it works
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          Describe the picture you want and where it’s set.
        </Text>
        <Text is='p'>
          If something important is missing, the agent asks a follow-up question.
        </Text>
        <Text is='p'>
          Pick a suggested answer or let it choose.
        </Text>
        <Text is='p'>
          Violent or explicit requests are refused.
        </Text>
        <Text is='p'>
          Only one conversation can run at a time.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { HowItWorks };
