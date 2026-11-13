import React from 'react';

import { EffectComposer, N8AO, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

const Effects: React.FunctionComponent = () => {
  return (
    <EffectComposer multisampling={8}>
      <N8AO aoRadius={0.8} distanceFalloff={0.5} intensity={2} quality='high' />
      <ToneMapping mode={ToneMappingMode.NEUTRAL} />
    </EffectComposer>
  );
};

export { Effects };
