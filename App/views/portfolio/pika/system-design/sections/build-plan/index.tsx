import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/components';

// Partials
import { Phases } from './phases';
import { Prompts } from './prompts';

// Constants
import { SECTION_ID } from '@/views/portfolio/pika/system-design/constants';

const BuildPlan: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.estimate}>
        <Heading
          className={classNames(
            'kicl-font-size-larger',
            'kicl-padding-block-start-narrow',
            'kicl-position-relative'
          )}
          id={SECTION_ID.estimate}
          is='h2'
        >
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
