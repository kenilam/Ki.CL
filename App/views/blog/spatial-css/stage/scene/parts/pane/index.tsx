import React from 'react';

// Three
import { THREE } from '@/three';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';
import { usePlate } from '@/views/blog/spatial-css/stage/scene/shapes/use-plate';

type Props = { kind: 'glass' | 'paper' };

const SIZE = { depth: 0.1, height: 3, radius: 0.36, width: 4.4 };
const REFLECTION = 7;

const Pane: React.FunctionComponent<Props> = ({ kind }) => {
  const geometry = usePlate(SIZE);
  const { glass, paper, sheet } = useColours();
  const rim = useRim();
  const opacity = { glass, paper: sheet };

  return (
    <group>
      <mesh geometry={geometry} receiveShadow renderOrder={1}>
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.04}
          color={paper}
          depthWrite={false}
          onBeforeCompile={rim}
          opacity={opacity[kind]}
          roughness={0.12}
          transparent
        />
      </mesh>
      <mesh geometry={geometry} renderOrder={2}>
        <meshPhysicalMaterial
          blending={THREE.AdditiveBlending}
          color='#000000'
          depthWrite={false}
          envMapIntensity={REFLECTION}
          roughness={0.05}
          transparent
        />
      </mesh>
    </group>
  );
};

export { Pane };
