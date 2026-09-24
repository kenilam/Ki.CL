import React from 'react';

// Components
import { Heading, Text } from '@/components';

/** The decisions that shaped Part 1. */
const KeyTradeOffs: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Key trade-offs
    </Heading>
    <Text>
      <Text is='strong' className='kicl-font-weight-bold'>
        Async everywhere versus a sync fast-path.
      </Text>{' '}
      I went back and forth on giving cheap image calls a synchronous endpoint
      and decided against it. Even fast models have p99s bad enough to stall
      HTTP connections, and a second execution path means a second set of
      failure modes. Everything returns a job id and streams events. Primitives
      declare a latency class, and only provider-class calls become checkpointed
      task rows. The UI still feels synchronous, since the composer stays open
      and renders progress as it arrives.
    </Text>
    <Text>
      <Text is='strong' className='kicl-font-weight-bold'>
        Declarative manifests versus Apps-as-code.
      </Text>{' '}
      In the code-first version every App is its own service. Authors get more
      power, and the platform team gets N deploy pipelines, N failure modes, no
      shared retry story, and an engineer in the loop for every new App.
      Manifests avoid that at the cost of expressiveness, so the format stays
      declarative with one escape hatch, a <Text is='code'>custom.step</Text>{' '}
      primitive that calls a team-owned sandboxed function.
    </Text>
    <Text>
      <Text is='strong' className='kicl-font-weight-bold'>
        <Text is='code' variant='secondary'>
          Temporal
        </Text>{' '}
        versus hand-rolling.
      </Text>{' '}
      Hand-rolling a queue and state machine on Redis and{' '}
      <Text is='code' variant='secondary'>
        Postgres
      </Text>{' '}
      takes about six weeks, then keeps producing edge cases: workers dying
      mid-callback, retry storms, clock skew on timeouts.{' '}
      <Text is='code' variant='secondary'>
        Temporal
      </Text>{' '}
      gives durable timers, exactly-once state transitions, and workflow
      visibility off the shelf. For a company whose product is long-running jobs
      that&apos;s worth it, and lock-in stays manageable because workers only
      speak the task schema.
    </Text>
    <Text>
      <Text is='strong' className='kicl-font-weight-bold'>
        Webhooks versus polling.
      </Text>{' '}
      Adapters prefer webhooks but keep a polling reconciler behind them,
      because webhooks get lost. Every provider call carries an idempotency key
      scoped to the logical task and stable across retries, so a redelivered
      webhook or a rescheduled attempt maps back to the same generation. The
      ledger settles each task at most once, so a duplicate generation
      can&apos;t become a duplicate charge.
    </Text>
  </>
);

export { KeyTradeOffs };
