import React from 'react';

// Components
import { Heading, Text } from '@/components';

// Partials
import { Figure } from './figure';

// Constants
import { ORIGINAL_VISION } from './constants';

const ThePicture: React.FunctionComponent = () => (
  <>
    <Heading is='h2' className='kicl-font-size-large'>
      The picture I was chasing
    </Heading>

    <Text is='p'>
      I wanted every branch of life on one sheet, and at the end of each branch
      something you’d actually recognise: a horse, a nautilus, a fly agaric. The
      shape of the tree and the creatures it made, in one picture.
    </Text>

    <Text is='p'>
      Then there’s the number. The Open Tree of Life holds about 2.3 million
      tips. Almost every decision below comes out of that one figure, because
      you can’t draw that many, you can’t illustrate them, and you certainly
      can’t fetch them. So I stopped trying to draw the whole tree and started
      choosing what to show at any one point.
    </Text>

    <Figure
      data={ORIGINAL_VISION}
      alt='A printed tree of life poster: coloured branches radiating from “Origin of life” at the base, each tip ending in a painted organism.'
      caption='Where I started. Around 250 tips, every one illustrated by hand.'
    />
  </>
);

export { ThePicture };
