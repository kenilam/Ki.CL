import React from 'react';

// Components
import {
  Details,
  Diagram,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Diagrams
import { drawing } from './diagrams/drawing';

const STEPS = [
  'Write an image prompt from the brief',
  'Generate the picture',
  'Review it',
  'If the review fails, rewrite the prompt with up to three of the reviewer’s notes',
  'Draw once more',
];

/** Drawing: the fixed loop, the reviewer, and where pictures are kept. */
const Drawing: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        Drawing
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          My first version, in Python, let the model pick which tool to call
          next. Its prompt spelled out the order anyway, and tool calling didn’t
          fit steps that can switch provider halfway through. So here the order
          is code:
        </Text>
        <List gap='narrower' is='ol'>
          {STEPS.map((step) => (
            <ListItem key={step}>
              <Text is='span'>{step}</Text>
            </ListItem>
          ))}
        </List>
        <Diagram spec={drawing} />
        <Heading is='h3' className='kicl-font-size-medium'>
          Prompt writing
        </Heading>
        <Text is='p'>
          The prompt writer is asked for 60 to 120 words describing only what
          should be in the picture. Telling an image model what to leave out
          tends to put it in.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Review
        </Heading>
        <Text is='p'>
          The reviewer is a vision model. It scores relevance, quality, style
          match and composition out of 10, plus an overall score and
          suggestions. A picture passes with 7 overall and at least 6 for
          relevance. I keep the better of the two attempts.
        </Text>
        <Text is='p'>
          My first reviewer failed on every image, and the fallback saved each
          failure as a pass with made-up scores. That was worse than having no
          review. Now, if no reviewer can be reached, the picture goes out with
          no score and a note saying it wasn’t checked.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Storage
        </Heading>
        <Text is='p'>
          Pictures go into a storage bucket, named with a hash of the file’s
          contents. The same image always gets the same URL, so browsers can
          cache it for a year.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Drawing };
