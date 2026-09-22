import React from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

// Partials
import { AgentHarness } from './agent-harness';
import { Cost } from './cost';
import { Testing } from './testing';
import { WhatChanges } from './what-changes';

const PartTwo: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Part 2 - The agent experience
        </Heading>
        <Text variant='secondary'>
          Part 2 of the brief adds a Claude Code-style agent for creative work:
          the user describes what they want in natural language, and the agent
          iteratively creates and edits media using the same primitives that
          power the Apps.
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
