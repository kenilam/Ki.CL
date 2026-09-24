import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

// Partials
import { Figure } from './figure';

// Constants
import { ORIGINAL_VISION } from './constants';

const ThePicture: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          The picture I was chasing
        </Heading>

        <Text is='p'>
          I wanted every branch of life on one sheet, with something
          recognisable at the end of each branch, like a horse, a nautilus or a
          fly agaric.
        </Text>

        <Text is='p'>
          The Open Tree of Life holds about 2.3 million tips. That’s too many to
          draw, illustrate or fetch, and almost every decision below comes from
          that number. So I stopped trying to draw the whole tree and started
          choosing what to show at any one point.
        </Text>

        <Figure
          data={ORIGINAL_VISION}
          alt='A printed tree of life poster: coloured branches radiating from “Origin of life” at the base, each tip ending in a painted organism.'
          caption='Where I started. Around 250 tips, every one illustrated by hand.'
        />
      </section>
    </Layout>
  );
};

export { ThePicture };
