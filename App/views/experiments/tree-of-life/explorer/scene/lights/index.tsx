import React from 'react';

// Helpers
import { tokenColor } from '@/helper';

const Lights: React.FunctionComponent = () => (
  <>
    <ambientLight intensity={0.88} />
    <hemisphereLight
      args={[tokenColor('white-pure'), tokenColor('grey-200'), 0.46]}
    />
    <directionalLight position={[4, 8, 6]} intensity={0.19} />
    <directionalLight
      position={[-6, -3, -5]}
      intensity={0.1}
      color={tokenColor('black-50')}
    />
  </>
);

export { Lights };
