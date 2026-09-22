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
          Most of those 2.3 million tips are bacteria, archaea, and unnamed
          internal nodes. Nobody has photographed “uncultured Crater Lake
          bacterium CL500-11”. So the plates are generated, aiming at the look
          of a 19th-century hand-coloured lithograph, the same register as the
          plate below.
        </Text>

        <Figure
          data={PERROT_1854}
          alt='A hand-coloured 1854 natural-history plate by Perrot: animals arranged across a pale staged ground with fine engraved linework.'
          caption='Perrot, 1854. Fine engraved linework, muted washes, a plain staged ground. This is what every generated plate is aiming at.'
        />

        <Text is='p'>
          The pipeline is a fixed sequence of steps, with no agent deciding what
          to do next. It resolves the lineage, picks one real living specimen to
          stand in for the taxon, writes a prompt from that specimen’s
          morphology, generates an image, then hands the result to a vision
          model for scoring. Fail the score and the prompt gets tightened for
          one more try.
        </Text>
      </section>
    </Layout>
  );
};

export { DrawingOrganisms };
