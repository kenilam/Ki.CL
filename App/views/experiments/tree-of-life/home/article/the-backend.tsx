import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

const TheBackend: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          What the backend does
        </Heading>

        <Text is='p'>
          Open Tree answers questions about subtrees. A request for a node
          returns what hangs below it, up to a height limit, so the node arrives
          with no parent attached. Stored as-is, that records a genus as the
          root of all life.
        </Text>

        <Text is='p'>
          <em>Panthera</em> was once stored as the root, with nothing above it.
          It took a long time to find because the symptom showed up far from the
          cause. The fix was to stop recording “no parent” and “no parent yet”
          the same way. A cold fetch now also pulls the node’s rootward lineage,
          the whole spine back to the origin including unnamed internal nodes. A
          stored null means the origin and nothing else.
        </Text>

        <Text is='p'>
          Everything is cached in MongoDB as a parent-pointer model. Each node
          stores only its parent, and children come from a reverse lookup.
          Writes are idempotent upserts because lineages that share ancestors
          are written at the same time, and two requests will race for the same
          row. That happened the first time I emptied the database.
        </Text>
      </section>
    </Layout>
  );
};

export { TheBackend };
