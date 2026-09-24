import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

// Partials
import { Figure } from './figure';

// Constants
import { PERROT_1854 } from './constants';

const DrawingOrganisms: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          Drawing organisms nobody photographed
        </Heading>

        <Text is='p'>
          Most of those 2.3 million tips are bacteria, archaea and unnamed
          internal nodes. Nobody has photographed “uncultured Crater Lake
          bacterium CL500-11”, so the plates are generated in the style of a
          19th-century hand-coloured lithograph like the one below.
        </Text>

        <Figure
          data={PERROT_1854}
          alt='A hand-coloured 1854 natural-history plate by Perrot: animals arranged across a pale staged ground with fine engraved linework.'
          caption='Perrot, 1854. Every generated plate aims for this engraved linework, muted wash and plain staged ground.'
        />

        <Text is='p'>
          The pipeline is a fixed sequence of steps, with no agent deciding what
          to do next. It resolves the lineage, picks one real living specimen to
          stand in for the taxon, writes a prompt from that specimen’s
          morphology, generates an image and has a vision model score it. If the
          score fails, the prompt is tightened for one more try.
        </Text>
      </section>
    </Layout>
  );
};

export { DrawingOrganisms };
