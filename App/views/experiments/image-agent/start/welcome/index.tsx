import React, { useId } from 'react';

// Components
import { Heading, Layout, List, ListItem, Text } from '@/components';

const COPY = {
  more: 'How it was made',
  title: 'How it works',
  points: [
    'Describe the picture you want and where it’s set.',
    'If something important is missing, the agent asks a follow-up question.',
    'Pick a suggested answer or let it choose.',
    'Violent or explicit requests are refused.',
    'Only one conversation can run at a time.',
  ],
};

/** What to expect, shown until the first message. */
const Welcome: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout
      alignContent='start'
      autoFlow='row'
      gap='narrow'
      justifyItems='start'
    >
      <section aria-labelledby={id} className='kicl-padding-block-wide'>
        <Heading id={id} is='h2' dense>
          {COPY.title}
        </Heading>
        <List gap='narrower'>
          {COPY.points.map((point) => (
            <ListItem key={point}>
              <Text is='span'>{point}</Text>
            </ListItem>
          ))}
        </List>
      </section>
    </Layout>
  );
};

export { Welcome };
