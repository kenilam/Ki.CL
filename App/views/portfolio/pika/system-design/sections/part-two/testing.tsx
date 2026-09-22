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
      A non-deterministic agent producing subjective output cannot be tested for
      exact answers, so the strategy is to evaluate distributions against
      rubrics instead. A golden suite of around a hundred briefs covers
      App-adjacent tasks, open-ended creation, iteration sequences - make it
      warmer, then check whether it edited the right asset - and adversarial
      cases like impossible asks and budget pressure.
    </Text>
    <Text>
      Scoring has two layers. Process checks are fully deterministic - did the
      agent keep drafts before finals, stay inside budget, preserve character
      lineage, finish in a sane number of turns - and run on stubbed providers
      with zero GPU spend, which in practice catches most regressions. Output
      quality is scored by an LLM-and-vision judge working through a decomposed
      rubric, calibrated quarterly against human panels. Judge scores gate on
      deltas rather than absolute scores, because the judge is consistent, but
      its absolute scores are not reliable.
    </Text>
    <Text>
      Every production session already logs its full trace, so a prompt or model
      change replays history: process metrics diff deterministically, divergence
      gets judge-scored, and changes ship through a 5% canary watched on process
      metrics, thumbs-down rate and cost per session. Live user signals -
      regeneration rate, abandonment, explicit feedback - are the online eval.
    </Text>
  </>
);

export { Testing };
