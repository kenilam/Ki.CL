import React from 'react';

// Components
import { Dialog, Heading, Layout, Text } from '@/components';

// Diagrams
import { Diagram } from '@/components';
import { requestFlow } from '@/views/portfolio/pika/system-design/diagrams/request-flow';
import { services } from '@/views/portfolio/pika/system-design/diagrams/services';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** The services behind a job, with the request flow. */
const Services: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Services &amp; components
    </Heading>
    <Diagram opens='diagram-services' spec={services} />
    <Dialog
      aria-label={services.title}
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-services'
    >
      <Layout alignItems='center' justifyContent='center'>
        <div>
          <Diagram spec={services} />
        </div>
      </Layout>
    </Dialog>
    <Text>
      The App Registry owns manifests: CRUD, versioning, validation, publish and
      rollback. The Job Service is the front door for execution. It validates
      inputs against the pinned manifest, places a hold on credits, writes the
      job row, and hands off to the orchestrator.
    </Text>
    <Text>
      The Orchestrator expands the manifest&apos;s DAG into task rows, schedules
      whatever is ready onto per-primitive-class queues, records every state
      transition, and drives retries and timeouts from durable state. I&apos;d
      build it on{' '}
      <Text is='code' variant='secondary'>
        Temporal
      </Text>{' '}
      rather than hand-roll it, because checkpointed workflow state, timers and
      retries are what{' '}
      <Text is='code' variant='secondary'>
        Temporal
      </Text>{' '}
      is for. The manifest interpreter is a single generic workflow, so
      launching a new App deploys no orchestration code.
    </Text>
    <Text>
      Stateless workers pull typed tasks and reach providers through an adapter
      layer that handles the differences: auth, request shape, webhook versus
      polling completion, error taxonomy, per-provider rate limits. Every task
      transition emits an event, and a realtime gateway fans job progress out to
      clients over{' '}
      <Text is='code' variant='secondary'>
        SSE
      </Text>
      , so the UI can say three of five shots rendered instead of showing a
      spinner for four minutes.
    </Text>
    <Text>
      Credits are held when a job starts and settled per task as work completes,
      never per attempt, so failed retries cost the platform rather than the
      user. When a job fails partway, the unconsumed hold flows back without
      special-case refund logic. Moderation runs before and after generation.
      Every task attempt is labeled, so success rate, p95 latency, retry count
      and cost can each be sliced by app, primitive and provider.
    </Text>
    <Text>
      Rough numbers for a single{' '}
      <Text is='code' variant='secondary'>
        Postgres
      </Text>{' '}
      box: at 100k jobs a day averaging six tasks each, task and attempt rows
      stay under a million a day, partitionable by month and years from being
      the bottleneck. Assets are the bigger problem. Video at that volume is
      terabytes a day, so bytes live in content-addressed{' '}
      <Text is='code' variant='secondary'>
        S3
      </Text>{' '}
      behind a CDN, away from the database. The real ceiling is provider rate
      limits, which per-provider admission control handles.
    </Text>
    <Diagram opens='diagram-request-flow' spec={requestFlow} />
    <Dialog
      aria-label={requestFlow.title}
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-request-flow'
    >
      <Layout alignItems='center' justifyContent='center'>
        <div>
          <Diagram spec={requestFlow} />
        </div>
      </Layout>
    </Dialog>
  </>
);

export { Services };
