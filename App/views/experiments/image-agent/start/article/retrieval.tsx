import React from 'react';

// Components
import { Details, Diagram, Heading, Layout, Text } from '@/components';

// Diagrams
import { context } from './diagrams/context';

/** Retrieval: what the models are given, and the one lookup that retrieves. */
const Retrieval: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        Retrieval, without a vector store
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          I assumed I’d need embeddings and a vector database. I didn’t.
          Everything a model sees comes from the conversation it’s working on.
        </Text>
        <Diagram spec={context} />
        <Heading is='h3' className='kicl-font-size-medium'>
          The conversation
        </Heading>
        <Text is='p'>
          The classifier and the clarifier get the conversation as plain text,
          one line per turn starting with <Text is='code'>Person:</Text> or{' '}
          <Text is='code'>Agent:</Text>. Progress updates, pictures and refusals
          are left out.
        </Text>
        <Text is='p'>
          The brief and style are stored on the conversation. When the person
          asks for a change after a picture, the clarifier reads the old brief
          alongside the conversation and writes a new one, and the drawing steps
          only get those two fields. Going back to an earlier message rolls the
          brief and style back to what they were for the picture from that
          point.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Similar conversations
        </Heading>
        <Text is='p'>
          The only real retrieval is finding similar conversations, which an
          earlier version showed under the text field while the person typed. It
          splits the text into words and drops short and common ones, then
          scores their 50 most recent conversations by the fraction of those
          words each one contains. Up to three that reach 60% come back.
        </Text>
        <Text is='p'>
          It ran on every keystroke, so it had to be cheap, and counting shared
          words costs one database read. The start page has since switched to
          filtering past conversations in the browser.
        </Text>
        <Text is='p'>
          I’d add a vector store once there’s something worth searching outside
          the current conversation, like the briefs behind other people’s
          pictures that scored well. For a handful of conversations each,
          matching words is enough.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Retrieval };
