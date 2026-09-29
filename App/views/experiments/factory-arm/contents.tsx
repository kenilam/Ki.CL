import React from 'react';

// Components
import { Heading } from '@/components';

// Partials
import { Floor } from './floor';

// Constants
import { COPY } from './floor/constants';

/** Kept in the lazy chunk so three.js ships only with this route. */
const FactoryArm: React.FunctionComponent = () => (
  <>
    <Heading is='h1' className='kicl-hidden'>
      {COPY.title}
    </Heading>

    <Floor />
  </>
);

export { FactoryArm };
