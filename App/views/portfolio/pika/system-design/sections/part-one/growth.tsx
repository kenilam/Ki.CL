import React from 'react';

// Components
import { Heading, Text } from '@/components';

/** App Studio and the guardrails around self-serve publishing. */
const Growth: React.FunctionComponent = () => (
  <>
    <Heading className='kicl-font-size-large' is='h4'>
      Growth ships an App without engineering
    </Heading>
    <Text>
      Manifests already make Apps no-code. What Growth needs is tooling and
      guardrails around it. App Studio is an internal builder that edits
      manifests through forms: pick inputs from the typed field library, compose
      steps from the primitive catalog, preview the rendered App live, and
      test-run it in a sandbox against capped credits. Under the hood it writes
      YAML, and a template gallery covers the common case, since most new Apps
      are 90% an existing one.
    </Text>
    <Text>
      Governance keeps self-serve safe: validation and a deliberately
      lightweight approval on publish, staged rollout with an automatic halt on
      error-rate or cost regression, one-click rollback via the version pointer,
      and per-App budgets to cap blast radius. Because Apps are rows rather than
      deployments, App #200 costs a review instead of a sprint.
    </Text>
  </>
);

export { Growth };
