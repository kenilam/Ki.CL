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
      An open-ended loop with video generation in its body can run up an
      enormous bill, so the design assumes the loop will misbehave and
      constrains it before it runs. By default the agent explores at draft tier
      - low resolution, short clips, cheaper models - converges with the user on
      drafts, and spends the expensive render once, on the approved direction.
      The hero pass is the full-resolution render on the top-tier model, the
      asset the user ships. It runs at the end of the session rather than inside
      the loop, and the governor enforces that: a draft-phase turn requesting a
      hero-tier render needs the user to confirm. The risk is fidelity. If
      drafts do not predict finals, users iterate at hero tier, which is the
      loop the ladder exists to prevent, so drafts use the same model at reduced
      resolution rather than a cheaper model. Hero re-render rate is the
      ladder&apos;s health metric.
    </Text>
    <Text>
      Budgets are hard limits. Each session carries a credit budget, and the
      governor prices every turn from the primitives&apos; declared cost models
      - the number comes from the platform, not the model it constrains - and
      blocks any call that would go past the remainder. A runaway detector halts
      the loop on repeated similar tool calls with no user message in between.
      LLM spend gets model routing, prompt caching and compaction, but LLM cost
      sits an order of magnitude below video cost. Most of the savings come from
      the draft ladder.
    </Text>
  </>
);

export { Cost };
