import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/components';

// Constants
import { SECTION_ID } from '@/views/portfolio/pika/system-design/constants';

const Walkthrough: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.walkthrough}>
        <header>
          <Heading
            className={classNames(
              'kicl-font-size-larger',
              'kicl-padding-block-start-narrow',
              'kicl-position-relative'
            )}
            dense
            id={SECTION_ID.walkthrough}
            is='h2'
          >
            Walkthrough
          </Heading>
          <Text lookLike='h6'>Read this first</Text>
        </header>
        <Text>
          Most of the design follows from one decision. Every App is a versioned
          manifest, a document that declares its inputs, which creative
          primitives it calls and in what order, and how to present the results.
          One orchestration engine runs all of them, so the platform team
          maintains a single execution path, and anyone who can fill in a
          manifest can ship an App without writing code.
        </Text>
        <Text>
          The second decision is that generation is async everywhere. Video
          takes minutes and fails often, so the unit of work is a durable job
          that checkpoints at every step. Retries, idempotency, and provider
          fallbacks all live at the task level. When shot five of a five-shot
          film dies, only that shot re-renders, and nobody is billed twice.
        </Text>
        <Text>
          A user fills in an App&apos;s form (rendered straight from the
          manifest), the Job Service validates the inputs, places a hold on
          credits, runs the moderation pre-check, and hands the orchestrator a
          pinned manifest version. The orchestrator expands the DAG into task
          rows; workers call providers through adapters, checkpoint every
          output, and emit events the client renders as live progress. When the
          last node lands, credits settle per completed task, the unconsumed
          hold flows back, and the gallery renders from CDN URLs.
        </Text>
        <Text>
          Part 2 adds an agent, and the design changes little to support it. The
          agent is another client of the orchestration engine, and its tools are
          the same primitives and Apps the buttons already call. A turn is a
          durable workflow on the same{' '}
          <Text is='code' variant='secondary'>
            Temporal
          </Text>{' '}
          machinery. It assembles context, picks tools, runs them as ordinary
          jobs, observes the results and iterates, with a governor pricing every
          step before it runs. What&apos;s new is the agent runtime (the loop,
          session state, context management), a cost-governance layer (model
          routing, draft-before-final rendering, budgets), and an evaluation
          harness (judged golden briefs, replay-based regression). Jobs, assets,
          moderation and the credit ledger are untouched. The governor sits over
          the ledger and estimates and confirms before anything is spent.
        </Text>
      </section>
    </Layout>
  );
};

export { Walkthrough };
