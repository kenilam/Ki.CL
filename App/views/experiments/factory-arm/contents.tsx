import React from 'react';

// Components
import { Frame, Heading } from '@/components';

// Context
import { FactoryArmProvider } from './context';

// Partials
import { Alert } from './alert';
import { Scene } from './scene';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME, COPY } from './constants';

/** Kept in the lazy chunk so three.js ships only with this route. */
const FactoryArm: React.FunctionComponent = () => (
  <FactoryArmProvider>
    <Heading is='h1' className='kicl-hidden'>
      {COPY.title}
    </Heading>

    <Frame>
      <div aria-label={COPY.scene} className={CLASS_NAME} role='img'>
        <Scene />
      </div>
    </Frame>

    <Alert />
  </FactoryArmProvider>
);

export { FactoryArm };
