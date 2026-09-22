import React from 'react';

// Components
import { Heading, Text } from '@/components';

const TheBackend: React.FunctionComponent = () => (
  <>
    <Heading is='h2' className='kicl-font-size-large'>
      What the backend does
    </Heading>

    <Text is='p'>
      Open Tree answers questions about subtrees. Ask it for a node and you get
      whatever hangs below that node, up to a height limit, which means the node
      you asked for arrives with no parent attached. Store that as-is and you’ve
      just recorded that a genus is the root of all life.
    </Text>

    <Text is='p'>
      That happened: <em>Panthera</em> was stored as the root, with nothing
      above it. It took a long time to find, because the symptom showed up far
      from the cause. The fix was to stop recording “no parent” and “no parent
      yet” the same way. A cold fetch now pulls the node’s rootward lineage too:
      the whole spine back to the origin, unnamed internal nodes included. A
      stored null means the origin, and nothing else.
    </Text>

    <Text is='p'>
      It all caches in MongoDB as a parent-pointer model. Each node stores its
      own ancestor and nothing more; children come from a reverse lookup. Writes
      are idempotent upserts, because lineages that share ancestors get written
      at the same time and two requests will race for the same row. That
      happened the first time I emptied the database.
    </Text>
  </>
);

export { TheBackend };
