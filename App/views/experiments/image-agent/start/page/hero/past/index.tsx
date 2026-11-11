import React from 'react';

// API
import { Kicl_ImageAgentThreadsDocument, useQuery } from 'api/provider';

// Components
import { Animation, Layout } from 'design/components';

// Hooks
import { usePast } from './use-past';

// Partials
import { Threads } from './threads';
import { Title } from './title';

// Constants
import { PAST_ID } from '@/views/experiments/image-agent/start/constants';
import { VARIABLES } from './constants';

/**
 * Earlier conversations to go back to. Fetched again on every mount, so one
 * that just finished shows up. Renders nothing when none match the field.
 */
const Past: React.FunctionComponent = () => {
  useQuery(Kicl_ImageAgentThreadsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: VARIABLES,
  });

  const { threads } = usePast();

  if (!threads.length) {
    return null;
  }

  return (
    <Animation property='slide-from-bottom'>
      <Layout autoFlow='row' gap='none' justifyItems='start'>
        <section aria-labelledby={PAST_ID}>
          <Title />
          <Threads />
        </section>
      </Layout>
    </Animation>
  );
};

export { Past };
