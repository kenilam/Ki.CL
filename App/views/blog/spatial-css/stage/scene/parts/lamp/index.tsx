import React from 'react';

// Three
import { THREE } from '@/three';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';

// Constants
import { BASE, SHADE } from './constants';

const Lamp: React.FunctionComponent = () => {
  const { ink, paper, stone } = useColours();
  const rim = useRim();

  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[BASE, 64]} />
        <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={ink} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.05, 0.84, 12, 24]} />
        <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={stone} />
      </mesh>
      <mesh castShadow position={[0, 1.4, 0]} receiveShadow>
        <latheGeometry args={[SHADE, 64]} />
        <meshPhysicalMaterial
          onBeforeCompile={rim}
          {...GLOSS}
          color={paper}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color='#ffffff'
          emissive='#ffffff'
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
};

export { Lamp };
