import React, { useId } from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Constants
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { VERSION } from '@/views/experiments/tree-of-life/versions/v15/constants';

const WhatIGaveUp: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          What I gave up
        </Heading>

        <Text is='p'>
          The poster shows every tip at once, illustrated, on a single sheet.{' '}
          <HyperLink to={toVersionPath({ version: VERSION })}>
            v{VERSION}
          </HyperLink>{' '}
          shows one taxon, its lineage back to the origin and a sampled fan of
          its neighbours.
        </Text>

        <Text is='p'>
          Illustrations are made on demand, so most taxa have no plate until
          someone visits them and a provider has quota to spare. Deep fans show
          a representative sample instead of every child. The tree is assembled
          lazily from a cache in front of a public API, so the first visit to an
          unexplored clade is slow.
        </Text>

        <Text is='p'>
          A visitor can still{' '}
          <HyperLink to={toVersionPath({ version: VERSION })}>
            start at the origin of life
          </HyperLink>{' '}
          and walk to any living species to see how far it sits from there.
        </Text>
      </section>
    </Layout>
  );
};

export { WhatIGaveUp };
