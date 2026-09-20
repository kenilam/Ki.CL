import React from 'react';

// Components
import { Text } from '@/Components';

// Providers
import radio from './Providers';

// Partials
import Gate from './Gate';

// Constants
import { toPath } from './constants';

const COPY = {
  lede: 'A radio for slow music, drawn as it plays. Chill, lo-fi and piano, chosen at random, one after another. Press play once and it keeps going.',
  title: 'Music Visualiser',
};

/**
 * The view's index: the title and a play control that goes to the first
 * station, which sends the listener down to its first type and its first
 * track.
 */
const Landing: React.FunctionComponent = () => (
  <Gate title={COPY.title} to={toPath({ group: radio.groups[0].group })}>
    <Text is='p' className='kicl-font-size-medium'>
      {COPY.lede}
    </Text>
  </Gate>
);

export default Landing;
