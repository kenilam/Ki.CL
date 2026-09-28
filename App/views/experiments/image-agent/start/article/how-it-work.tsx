import React from 'react';

// Components
import { Details, Heading, Text } from '@/components';

/** How it works: what to write, and what the agent does with it. */
const HowItWorks: React.FunctionComponent = () => (
  <Details
    gap='narrow'
    summary={
      <Heading is='h3' className='kicl-font-size-large'>
        How it works
      </Heading>
    }
  >
    <Text is='p'>Describe the picture you want and where it’s set.</Text>
    <Text is='p'>
      If something important is missing, the agent asks a follow-up question.
    </Text>
    <Text is='p'>Pick a suggested answer or let it choose.</Text>
    <Text is='p'>Violent or explicit requests are refused.</Text>
    <Text is='p'>Only one conversation can run at a time.</Text>
  </Details>
);

export { HowItWorks };
