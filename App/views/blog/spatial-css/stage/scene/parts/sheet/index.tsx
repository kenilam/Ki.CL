import React from 'react';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';
import { usePlate } from '@/views/blog/spatial-css/stage/scene/shapes/use-plate';

const SIZE = { depth: 0.16, height: 3, radius: 0.36, width: 4.4 };

const Sheet: React.FunctionComponent = () => {
  const geometry = usePlate(SIZE);
  const { paper } = useColours();
  const rim = useRim();

  return (
    <mesh castShadow geometry={geometry} receiveShadow>
      <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={paper} />
    </mesh>
  );
};

export { Sheet };
