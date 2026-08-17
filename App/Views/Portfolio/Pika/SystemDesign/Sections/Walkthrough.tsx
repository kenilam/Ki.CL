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
          Most of this design falls out of one early decision:{' '}
          <strong>an App is data, not code.</strong> Every App is a versioned
          manifest — a document that declares what inputs it takes, which
          creative primitives it calls and in what order, and how to present the
          results. One orchestration engine runs all of them. The platform team
          maintains a single execution path, and anyone who can fill in a
          manifest can ship an App, whether or not they can write software.
        </Text>
        <Text>
          The second commitment is that generation is async everywhere. Video
          takes minutes and fails often, so the unit of work is a durable job
          that checkpoints at every step. Retries, idempotency, and provider
          fallbacks all live at the task level. When shot five of a five-shot
          film dies, we retry one shot — not the pipeline, and nobody gets
          billed twice for it.
        </Text>
        <Text>
          Part 2 asks how the design changes to support an agent, and the answer
          turned out to be: less than I expected when I started sketching it.
          The agent is just another client of the orchestration engine, and its
          tools are the same primitives and Apps the buttons already call. What
          is actually new is the agent runtime itself (the loop, session state,
          context management), a cost-governance layer (model routing,
          draft-before-final rendering, budgets), and an evaluation harness
          (judged golden briefs, replay-based regression). Jobs, assets,
          moderation — untouched. The credit ledger is unchanged too; the agent
          adds a governor on top of it — estimates and confirmations before
          spend — not a second billing system.
        </Text>
      </section>
    </Layout>
  );
};

export default Walkthrough;
