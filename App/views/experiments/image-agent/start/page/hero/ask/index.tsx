import React from 'react';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import { Layout } from 'design/components';

// Partials
import { Allowance } from '@/views/experiments/image-agent/allowance';
import { Composer } from '@/views/experiments/image-agent/composer';

// Context
import { useComposerContext } from '@/views/experiments/image-agent/composer';

const Ask: React.FunctionComponent = () => {
  const { busy } = useComposerContext();

  // Shares the allowance badge's cached query.
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const spent = data?.imageAgentAllowance.remaining === 0;

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <section className='kicl-inline-size-columns-8'>
        <Allowance />
        {busy || spent ? null : <Composer />}
      </section>
    </Layout>
  );
};

export { Ask };
