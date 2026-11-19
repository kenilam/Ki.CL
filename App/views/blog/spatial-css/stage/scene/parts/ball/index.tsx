import React from 'react';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';

type Props = { kind: 'chrome' | 'satin' };

const Ball: React.FunctionComponent<Props> = ({ kind }) => {
  const { paper } = useColours();
  const rim = useRim();
  const chrome = kind === 'chrome';

  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[0.55, 96, 96]} />
      <meshPhysicalMaterial
        onBeforeCompile={rim}
        {...GLOSS}
        color={chrome ? '#ffffff' : paper}
        metalness={chrome ? 0.55 : 0}
        roughness={chrome ? 0.12 : GLOSS.roughness}
      />
    </mesh>
  );
};

export { Ball };
