import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/components';

// Partials
import { AgentHarness } from './agent-harness';
import { Cost } from './cost';
import { Testing } from './testing';
import { WhatChanges } from './what-changes';

// Constants
import { SECTION_ID } from '@/views/portfolio/pika/system-design/constants';

const PartTwo: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.partTwo}>
        <Heading
          className={classNames(
            'kicl-font-size-larger',
            'kicl-padding-block-start-narrow',
            'kicl-position-relative'
          )}
          id={SECTION_ID.partTwo}
          is='h2'
        >
          Part 2 - The agent experience
        </Heading>
        <Text variant='secondary'>
          Part 2 of the brief adds a Claude Code-style agent for creative work.
          A user describes what they want in natural language, and the agent
          creates and edits media with the same primitives the Apps use.
        </Text>
        <WhatChanges />
        <AgentHarness />
        <Cost />
        <Testing />
      </section>
    </Layout>
  );
};

export { PartTwo };
