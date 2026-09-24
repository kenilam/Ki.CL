import React from 'react';

// Components
import {
  Details,
  Diagram,
  DiagramLegend,
  Heading,
  Layout,
  Text,
  type DiagramLegendItem,
} from '@/components';

// Diagrams
import { overview } from './diagrams/overview';
import { turn } from './diagrams/turn';

const QUIET: DiagramLegendItem[] = [
  { accent: 'warning', label: 'THINKING', value: 'Two minutes' },
  { accent: 'info', label: 'DRAWING', value: 'Eight minutes' },
];

/** Sending a message: the mutation, the subscription, the statuses, and recovery. */
const SendingAMessage: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        Sending a message
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          When a message is sent, the{' '}
          <Text is='code' accent='info'>
            ImageAgentSend
          </Text>{' '}
          mutation checks the person’s limits, saves the message, starts the
          agent and returns right away.
        </Text>
        <Text is='p'>
          A turn with a drawing in it takes about a minute, which is too long to
          hold a request open. Everything after that comes over a GraphQL
          subscription,{' '}
          <Text is='code' accent='info'>
            ImageAgentThreadUpdated
          </Text>
          , which sends the whole conversation again whenever anything in it
          changes.
        </Text>
        <Diagram spec={overview} />
        <Diagram spec={turn} />
        <Text is='p'>
          A conversation can only have one turn running at a time. When a
          message arrives, we save it and mark the conversation as{' '}
          <Text is='code' accent='warning'>
            THINKING
          </Text>{' '}
          in the same database write. If another request arrives while it’s
          already{' '}
          <Text is='code' accent='warning'>
            THINKING
          </Text>{' '}
          or{' '}
          <Text is='code' accent='info'>
            DRAWING
          </Text>
          , it can’t start another turn. The conversation returns to{' '}
          <Text is='code' accent='confirm'>
            IDLE
          </Text>{' '}
          when the turn finishes.
        </Text>
        <Text is='p'>
          While the agent works, it streams back a short message anyone can
          understand, whether it’s thinking, rewriting the prompt or drawing the
          picture.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Pub/sub
        </Heading>
        <Text is='p'>
          The subscription uses an in-memory pub/sub inside the Node process.
          That’s fine with one server. With two, a turn running on one server
          can’t reach a browser connected to the other, and I’d need a Message
          Broker, Redis for instance.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Recovering from restarts
        </Heading>
        <Text is='p'>
          A deploy kills whatever turn is running and leaves its conversation on{' '}
          <Text is='code' accent='warning'>
            THINKING
          </Text>
          . Since only one turn can run at a time, the person would be locked
          out. So every time a conversation is read, the server looks for a turn
          that has gone quiet for:
        </Text>
        <DiagramLegend items={QUIET} />
        <Text is='p'>
          It marks that turn failed with “I stopped before I could finish the
          last request.” and the person can carry on.
        </Text>
        <Text is='p'>
          I do this on read instead of at startup because with several servers,
          a new one can’t tell a dead turn from one another server is still
          working on.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { SendingAMessage };
