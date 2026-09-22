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
          shows you one taxon, its lineage back to the origin, and a sampled fan
          of its neighbours.
        </Text>

        <Text is='p'>
          Three smaller compromises came with that. Illustrations are made on
          demand instead of drawn in advance, so most taxa have no plate until
          someone visits them and a provider has quota going spare. Deep fans
          are sampled rather than drawn whole, so you see a representative
          subset. And the tree is assembled lazily from a cache sitting in front
          of a public API, which makes the first visit to an unexplored clade
          slow in a way a printed sheet never is.
        </Text>

        <Text is='p'>
          You can still{' '}
          <HyperLink to={toVersionPath({ version: VERSION })}>
            start at the origin of life
          </HyperLink>{' '}
          and walk to any living species, and see how far it is from the origin.
        </Text>
      </section>
    </Layout>
  );
};

export { WhatIGaveUp };
