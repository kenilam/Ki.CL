import React from 'react';

// Components
import { Heading, List, ListItem, Text } from '@/components';

/** How task attempts fail and recover. */
const Resiliency: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Resiliency
    </Heading>
    <Text>
      Video providers time out, hand back corrupt files, and rate-limit without
      warning, so the unit of failure is the task attempt rather than the job.
    </Text>
    <List is='ul'>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Retries with a taxonomy.
          </Text>{' '}
          Adapters classify every error:{' '}
          <Text is='code' accent='warning'>
            retryable
          </Text>{' '}
          gets exponential backoff with jitter, permanent fails fast and tells
          the user why, and a provider browning out trips a circuit breaker that
          fails work over to an equivalent provider where the manifest allows
          it.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Checkpoint at every node.
          </Text>{' '}
          Task outputs persist before the next node schedules, so a crash
          resumes from the last completed step. A five-shot film that dies on
          shot five re-renders one shot.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Watchdogs and dead letters.
          </Text>{' '}
          Tasks that stop heartbeating are reaped and rescheduled; tasks that
          exhaust retries land in a dead-letter queue with full context, and
          jobs fail partially where the manifest allows, so four of five shots
          come back with a repair action instead of an error screen.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Task-level monitoring.
          </Text>{' '}
          Every attempt is a row carrying app, primitive, provider, latency,
          cost and error class, so dashboards answer operational questions
          directly, and cost-anomaly alerts catch runaway loops before they bill
          anyone.
        </Text>
      </ListItem>
      <ListItem>
        <Text dense>
          <Text is='strong' className='kicl-font-weight-bold'>
            Backpressure.
          </Text>{' '}
          Concurrency caps per user and per App, admission control keyed to
          queue depth, and the credit hold at job start, so a viral App slows to
          a queue position instead of overwhelming a provider.
        </Text>
      </ListItem>
    </List>
  </>
);

export { Resiliency };
