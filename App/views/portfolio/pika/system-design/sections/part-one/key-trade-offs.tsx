import React from 'react';

// Components
import { Heading, Text } from '@/components';

/** The decisions that shaped Part 1. */
const KeyTradeOffs: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h4'>
      Key trade-offs
    </Heading>
    <Text>
      <Text is='span' className='kicl-font-weight-bold'>
        Async everywhere versus a sync fast-path.
      </Text>{' '}
      I went back and forth on giving cheap image calls a synchronous endpoint
      and decided against it. Even fast models have p99s ugly enough to stall
      HTTP connections, and a second execution path is a second set of failure
      modes to maintain. So everything returns a job id and streams events, and
      the line between queued and inline work is mechanical: primitives declare
      a latency class, and only provider-class calls become checkpointed task
      rows. In the UI it still reads as synchronous: the composer stays open and
      renders progress as it arrives.
    </Text>
    <Text>
      <Text is='span' className='kicl-font-weight-bold'>
        Declarative manifests versus Apps-as-code.
      </Text>{' '}
      The code-first version of this platform - every App its own service -
      gives authors more power and the platform team N deploy pipelines, N
      failure modes, no shared retry story, and an engineer in the loop for
      every new App. Manifests avoid all of that. What you give up is
      expressiveness, so the format stays declarative and keeps one escape
      hatch: a <code>custom.step</code> primitive that calls out to a team-owned
      sandboxed function.
    </Text>
    <Text>
      <Text is='span' className='kicl-font-weight-bold'>
        <code>Temporal</code> versus hand-rolling.
      </Text>{' '}
      Hand-rolling a queue and state machine on Redis and <code>Postgres</code>{' '}
      takes about six weeks, then keeps producing edge cases: workers dying
      mid-callback, retry storms, clock skew on timeouts. <code>Temporal</code>{' '}
      buys durable timers, exactly-once state transitions, and workflow
      visibility off the shelf. For a company whose product is long-running
      jobs, that trade is clearly right, and lock-in stays manageable because
      workers only ever speak the task schema.
    </Text>
    <Text>
      <Text is='span' className='kicl-font-weight-bold'>
        Webhooks versus polling.
      </Text>{' '}
      Adapters prefer webhooks but keep a polling reconciler behind them,
      because webhooks get lost. Every provider call carries an idempotency key
      scoped to the logical task - stable across retry attempts - so a
      redelivered webhook or a re-scheduled attempt maps back to the same
      generation. Billing has its own guarantee: the ledger settles each task at
      most once, so a duplicate generation cannot become a duplicate charge.
    </Text>
  </>
);

export { KeyTradeOffs };
