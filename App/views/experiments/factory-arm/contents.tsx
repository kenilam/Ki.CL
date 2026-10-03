import React from 'react';

// Components
import { Heading } from 'design/components';

// Partials
import { SetupProvider } from './setup';
import { Workspace } from './workspace';

// Constants
import { COPY } from './constants';

/** Kept in the lazy chunk so three.js ships only with this route. */
const FactoryArm: React.FunctionComponent = () => (
  <SetupProvider>
    <Heading is='h1' className='kicl-hidden'>
      {COPY.title}
    </Heading>

    <Workspace />
  </SetupProvider>
);

export { FactoryArm };
