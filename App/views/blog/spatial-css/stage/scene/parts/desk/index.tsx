import React from 'react';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';
import { usePlate } from '@/views/blog/spatial-css/stage/scene/shapes/use-plate';

const TOP = { depth: 0.2, height: 1.2, radius: 0.28, width: 3.3 };
const BASE = { depth: 0.08, height: 1.24, radius: 0.3, width: 3.34 };

const Desk: React.FunctionComponent = () => {
  const top = usePlate(TOP);
  const base = usePlate(BASE);
  const { paper, stone } = useColours();
  const rim = useRim();

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh castShadow geometry={base} position={[0, 0, -0.13]} receiveShadow>
        <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={stone} />
      </mesh>
      <mesh castShadow geometry={top} receiveShadow>
        <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={paper} />
      </mesh>
    </group>
  );
};

export { Desk };
