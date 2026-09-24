import React from 'react';

// Components
import { Details, Heading, Layout, Text } from '@/components';

/** Asking before drawing: what a picture needs, and the cap on questions. */
const Asking: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        Asking before drawing
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          Before drawing, a clarifier model checks whether it has enough to go
          on. My rule for enough is a subject, a style, and at least one of
          setting, lighting or framing. If something is missing, it asks about
          one thing at a time, in that order.
        </Text>
        <Text is='p'>
          Each question comes with two to four short answers to tap, plus
          “Something else” and “Just draw it”.
        </Text>
        <Text is='p'>
          The agent gets three questions per picture, and I enforce that in code
          instead of trusting the model with it. If the model tries a fourth, I
          ignore it and draw with what we have.
        </Text>
        <Text is='p'>
          Once it has enough, the clarifier writes a brief, usually a sentence
          or two, and picks a style: photography, illustration, minimal or 3D
          render. From there the drawing steps only see the brief, never the
          conversation.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Asking };
