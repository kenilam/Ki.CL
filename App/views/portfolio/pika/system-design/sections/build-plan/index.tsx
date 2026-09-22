import React from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

// Partials
import { Phases } from './phases';
import { Prompts } from './prompts';

const BuildPlan: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Estimate &amp; build plan
        </Heading>
        <Text>
          These numbers assume me leading with coding agents doing the heavy
          lifting, Temporal Cloud so orchestration is bought rather than built,
          and one product engineer joining from week three, counted in calendar
          weeks rather than ideal engineering hours:
        </Text>
        <Phases />
        <Text>
          Roughly 9-12 weeks to a credible v1, with Part 1 alone at six to seven
          - and that number only holds because v1 is deliberately narrow: one
          region, two providers, an internal-only Studio, and generation kept
          behind vendor APIs. Provider-adapter edge cases are the long pole, not
          the happy path. Coding agents compress the skeleton and the agent
          loop, but they help much less with debugging a flaky third-party
          webhook, so the middle phases carry most of the schedule risk.
        </Text>

        <Prompts />
      </section>
    </Layout>
  );
};

export { BuildPlan };
