import React from 'react';

// Components
import { Dialog, Heading, Layout, List, ListItem, Text } from '@/components';

// Diagrams
import { Diagram } from '@/components';
import { sessionModel } from '@/views/portfolio/pika/system-design/diagrams/session-model';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** The agent runtime, its tables and its turn loop. */
const AgentHarness: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Agent harness
    </Heading>
    <Text>
      The agent runs in a new Agent Runtime service: stateless loop executors
      pulling from a session queue, with message history, working plan, media
      context and budget spent kept in the session store. A turn is a durable
      workflow on the same{' '}
      <Text is='code' variant='secondary'>
        Temporal
      </Text>{' '}
      machinery from Part 1, so a crash mid-turn resumes mid-turn.
    </Text>
    <Text>
      The agent plane adds three small tables that key into Part 1&apos;s. A
      tool call
      <em> is</em> an ordinary job, so it inherits cost tracking, retries, and
      lineage from the existing tables:
    </Text>
    <Diagram opens='diagram-session-model' spec={sessionModel} />
    <Dialog
      aria-label={sessionModel.title}
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-session-model'
    >
      <Layout alignItems='center' justifyContent='center'>
        <div>
          <Diagram spec={sessionModel} />
        </div>
      </Layout>
    </Dialog>
    <Text>
      Through <Text is='code'>TOOL_CALL.job_id</Text>, the agent&apos;s work
      lands in the same job, task, and asset tables a button press writes to, so
      replay and the governor&apos;s ledger bookkeeping need no new
      infrastructure.
    </Text>
    <List is='ol'>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Context assembly.
          </Text>{' '}
          The system prompt sets a creative-director persona; session assets
          arrive as structured summaries with thumbnails, captioned frames and
          lineage, never raw video. When the agent needs to look at something,
          inspect extracts keyframes for a vision model.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Tool selection.
          </Text>{' '}
          The tool registry projects Part 1&apos;s primitive schemas into tool
          definitions, so a new primitive becomes a new agent capability with no
          agent-side code. Published Apps become macro-tools too. Calling{' '}
          <Text is='code' variant='secondary'>
            character-creator
          </Text>{' '}
          is better than hand-orchestrating five primitives, because that path
          is already tested.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Execution.
          </Text>{' '}
          Tool calls become ordinary jobs with the same validation, credits and
          moderation as a button press. Long renders suspend the turn durably
          instead of parking a worker.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Observe and iterate.
          </Text>{' '}
          Results come back as asset refs plus a vision critique on request.
          Warm up the lighting on shot two becomes an{' '}
          <Text is='code'>image.edit</Text> cycle against lineage the agent can
          see, and approved-draft checkpoints keep iteration from wandering.
        </Text>
      </ListItem>
    </List>
    <Text>
      A new message from the user preempts the turn at the next tool boundary.
      Queued jobs that haven&apos;t started are cancelled, and renders already
      running finish and join the revised context.
    </Text>
  </>
);

export { AgentHarness };
