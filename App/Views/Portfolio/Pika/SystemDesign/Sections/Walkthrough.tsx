import React from 'react';

// Components
import { Heading, Layout, Text } from '@/Components';

const Walkthrough: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section>
        <header>
          <Heading className='kicl-font-size-larger' dense is='h3'>
            Walkthrough
          </Heading>
          <Heading is='h6'>Read this first</Heading>
        </header>
        <Text>
          Most of the design follows from one decision: every App is a versioned
          manifest - a document that declares what inputs it takes, which
          creative primitives it calls and in what order, and how to present the
          results. One orchestration engine runs all of them. The platform team
          maintains a single execution path, and anyone who can fill in a
          manifest can ship an App, whether or not they can write software.
        </Text>
        <Text>
          The second decision is that generation is async everywhere. Video
          takes minutes and fails often, so the unit of work is a durable job
          that checkpoints at every step. Retries, idempotency, and provider
          fallbacks all live at the task level. When shot five of a five-shot
          film dies, we re-render that shot and nothing else, and nobody is
          billed twice.
        </Text>
        <Text>
          It helps to walk one job through the system. A user fills in an
          App&apos;s form (rendered straight from the manifest), the Job Service
          validates the inputs, places a hold on credits, runs the moderation
          pre-check, and hands the orchestrator a pinned manifest version. The
          orchestrator expands the DAG into task rows; workers call providers
          through adapters, checkpoint every output, and emit events the client
          renders as live progress. When the last node lands, credits settle per
          completed task, the unconsumed hold flows back, and the gallery
          renders from CDN URLs.
        </Text>
        <Text>
          Part 2 asks how the design changes to support an agent. Not much. The
          agent is another client of the orchestration engine, and its tools are
          the same primitives and Apps the buttons already call. A turn is a
          durable workflow on the same <code>Temporal</code> machinery -
          assemble context, pick tools, execute them as ordinary jobs, observe,
          iterate - with a governor pricing every step before it runs. What is
          actually new is the agent runtime itself (the loop, session state,
          context management), a cost-governance layer (model routing,
          draft-before-final rendering, budgets), and an evaluation harness
          (judged golden briefs, replay-based regression). Jobs, assets and
          moderation are untouched. So is the credit ledger: the agent adds a
          governor over it that estimates and confirms before spend, rather than
          a second billing system.
        </Text>
      </section>
    </Layout>
  );
};

export { Walkthrough };
