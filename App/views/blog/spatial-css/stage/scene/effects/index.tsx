import React from 'react';

// Libraries
import { EffectComposer, N8AO, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

const Effects: React.FunctionComponent = () => {
  return (
    <EffectComposer multisampling={4}>
      <N8AO
        aoRadius={0.6}
        distanceFalloff={0.5}
        halfRes
        intensity={1.6}
        quality='medium'
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
};

export { Effects };
