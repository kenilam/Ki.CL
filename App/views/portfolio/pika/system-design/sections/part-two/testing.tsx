import React from 'react';

// Components
import { Heading, Text } from '@/components';

/** Rubric-based evaluation and replay. */
const Testing: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h3'>
      Testing &amp; evaluation
    </Heading>
    <Text>
      A non-deterministic agent with subjective output can&apos;t be tested for
      exact answers, so it&apos;s evaluated on distributions against rubrics. A
      golden suite of around a hundred briefs covers App-adjacent tasks,
      open-ended creation, iteration sequences (make it warmer, then check it
      edited the right asset), and adversarial cases like impossible asks and
      budget pressure.
    </Text>
    <Text>
      Scoring has two layers. Process checks are deterministic (did the agent
      keep drafts before finals, stay inside budget, preserve character lineage,
      finish in a sane number of turns) and run on stubbed providers with zero
      GPU spend. They catch most regressions. Output quality is scored by an
      LLM-and-vision judge against a decomposed rubric, calibrated quarterly
      against human panels. The judge is consistent but its absolute scores
      aren&apos;t reliable, so gating uses deltas.
    </Text>
    <Text>
      Every production session logs its full trace, so a prompt or model change
      is replayed against history first. Process metrics diff deterministically,
      divergence gets judge-scored, and the change ships through a 5% canary
      watched on process metrics, thumbs-down rate and cost per session. Live
      user signals (regeneration rate, abandonment, explicit feedback) are the
      online eval.
    </Text>
  </>
);

export { Testing };
