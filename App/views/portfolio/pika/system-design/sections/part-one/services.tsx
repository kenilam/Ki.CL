import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Dialog, Heading, Layout, Text } from '@/components';

// Diagrams
import { Diagram } from '@/views/portfolio/pika/system-design/diagrams';
import { requestFlow } from '@/views/portfolio/pika/system-design/diagrams/request-flow';
import { services } from '@/views/portfolio/pika/system-design/diagrams/services';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** The services behind a job, with the request flow. */
const Services: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h4'>
      Services &amp; components
    </Heading>
    <Layout alignItems='center' justifyContent='stretch'>
      <Button
        aria-label='Services and components diagram. Open the full image.'
        className={classNames(
          'kicl-inline-size-full',
          `${CLASS_NAME}__preview`
        )}
        command='show-modal'
        commandFor='diagram-services'
        unstyled
      >
        <Diagram spec={services} />
      </Button>
    </Layout>
    <Dialog className={`${CLASS_NAME}__full`} fullScreen id='diagram-services'>
      <Layout alignItems='center' justifyContent='center'>
        <section>
          <Diagram spec={services} />
        </section>
      </Layout>
    </Dialog>
    <Text>
      The App Registry owns manifests: CRUD, versioning, validation, publish and
      rollback. The Job Service is the front door for execution - it validates
      inputs against the pinned manifest, places a hold on credits (a hold, not
      a charge), writes the job row, and hands off to the orchestrator.
    </Text>
    <Text>
      The Orchestrator expands the manifest&apos;s DAG into task rows, schedules
      whatever is ready onto per-primitive-class queues, records every state
      transition, and drives retries and timeouts from durable state. I would
      build it on <code>Temporal</code> rather than hand-rolling it.
      Checkpointed workflow state, timers and retries are what{' '}
      <code>Temporal</code> is for, and hand-rolled DAG engines accumulate the
      reliability bugs it prevents. The manifest interpreter is a single generic
      workflow, which means launching a new App deploys no orchestration code at
      all.
    </Text>
    <Text>
      Stateless workers pull typed tasks and reach providers through an adapter
      layer that smooths over the differences: auth, request shape, webhook
      versus polling completion, error taxonomy, per-provider rate limits. Every
      task transition emits an event, and a realtime gateway fans job progress
      out to clients over <code>SSE</code>, so the UI can say three of five
      shots rendered instead of showing a spinner for four minutes.
    </Text>
    <Text>
      Credits are held when a job starts and settled per task as work completes,
      never per attempt, so failed retries cost the platform rather than the
      user. When a job fails partway the unconsumed hold flows back, with no
      special-case refund logic. Moderation runs before generation and after.
      Every task attempt is labeled for observability: success rate, p95
      latency, retry count and cost, each sliced by app, primitive and provider.
    </Text>
    <Text>
      Rough numbers for a single <code>Postgres</code> box: at 100k jobs a day
      averaging six tasks each, task and attempt rows land under a million a
      day, partitionable by month and years from being the bottleneck. Assets
      are the larger problem: video at that volume is terabytes a day, which is
      why bytes live in content-addressed <code>S3</code> behind a CDN and never
      near the database. The real ceiling is provider rate limits, which is what
      the per-provider admission control is for.
    </Text>
    <Layout alignItems='center' justifyContent='stretch'>
      <Button
        aria-label='Request flow diagram. Open the full image.'
        className={classNames(
          'kicl-inline-size-full',
          `${CLASS_NAME}__preview`
        )}
        command='show-modal'
        commandFor='diagram-request-flow'
        unstyled
      >
        <Diagram spec={requestFlow} />
      </Button>
    </Layout>
    <Dialog
      className={`${CLASS_NAME}__full`}
      fullScreen
      id='diagram-request-flow'
    >
      <Layout alignItems='center' justifyContent='center'>
        <section>
          <Diagram spec={requestFlow} />
        </section>
      </Layout>
    </Dialog>
  </>
);

export { Services };
