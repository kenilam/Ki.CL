import React from 'react';

// Libraries
import { FiberProvider } from 'its-fine';

// Partials
import { Scene } from './scene';

const Canvas: React.FunctionComponent<React.ComponentProps<typeof Scene>> = (
  props
) => {
  return (
    <FiberProvider>
      <Scene {...props} />
    </FiberProvider>
  );
};

export { Canvas };
