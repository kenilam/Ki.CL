import React from 'react';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import { Animation, Layout } from 'design/components';

// Partials
import { Threads } from './threads';
import { Title } from './title';

// Constants
import { RUNNING_ID } from '@/views/experiments/image-agent/start/constants';

/**
 * Conversations with a turn still running. Renders nothing when there are none.
 */
const Running: React.FunctionComponent = () => {
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const allowance = data?.imageAgentAllowance;

  if (!allowance?.busy) {
    return null;
  }

  return (
    <Animation property='slide-from-bottom'>
      <Layout autoFlow='row' gap='none' justifyItems='start'>
        <section aria-labelledby={RUNNING_ID}>
          <Title />
          <Threads />
        </section>
      </Layout>
    </Animation>
  );
};

export { Running };
