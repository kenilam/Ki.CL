import React from 'react';

import { EffectComposer, N8AO, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

import { useMark } from '@/views/mark/context';

const Effects: React.FunctionComponent = () => {
  const { occlusion } = useMark();

  return (
    <EffectComposer multisampling={occlusion.samples}>
      <N8AO
        aoRadius={0.8}
        distanceFalloff={0.5}
        halfRes={occlusion.halfRes}
        intensity={2}
        quality={occlusion.quality}
      />
      <ToneMapping mode={ToneMappingMode.NEUTRAL} />
    </EffectComposer>
  );
};

export { Effects };
