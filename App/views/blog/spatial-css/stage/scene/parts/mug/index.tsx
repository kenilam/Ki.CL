import React from 'react';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';

// Constants
import { PROFILE } from './constants';

const Mug: React.FunctionComponent = () => {
  const { paper, stone } = useColours();
  const rim = useRim();

  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[PROFILE, 64]} />
        <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={paper} />
      </mesh>
      <mesh
        castShadow
        position={[0.27, 0.24, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <torusGeometry args={[0.12, 0.045, 24, 48, Math.PI]} />
        <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={stone} />
      </mesh>
    </group>
  );
};

export { Mug };
