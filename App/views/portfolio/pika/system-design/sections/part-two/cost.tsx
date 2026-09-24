import React from 'react';

// Components
import { Heading, Text } from '@/components';

/** Draft tiers and hard budgets. */
const Cost: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Cost
    </Heading>
    <Text>
      The agent spends the expensive render once, on the approved direction. An
      open-ended loop with video generation in it can run up a huge bill, so the
      design assumes the loop will misbehave and constrains it up front. By
      default the agent explores at draft tier (low resolution, short clips,
      cheaper models) and converges with the user on drafts. The hero pass, the
      full-resolution render on the top-tier model that the user ships, runs at
      the end of the session, outside the loop. If a draft-phase turn asks for a
      hero-tier render, the governor holds it until the user confirms. The risk
      is fidelity. If drafts don&apos;t predict finals, people iterate at hero
      tier, which is what the ladder is meant to prevent, so drafts use the same
      model at reduced resolution rather than a cheaper model. Hero re-render
      rate is the ladder&apos;s health metric.
    </Text>
    <Text>
      Each session carries a hard credit budget. Before a turn runs, the
      governor prices it from the primitives&apos; declared cost models, so the
      number comes from the platform rather than the model it constrains, and
      blocks any call that would go past what&apos;s left. A runaway detector
      halts the loop on repeated similar tool calls with no user message in
      between. LLM spend gets model routing, prompt caching and compaction, but
      it sits an order of magnitude below video cost, so most of the savings
      come from the draft ladder.
    </Text>
  </>
);

export { Cost };
