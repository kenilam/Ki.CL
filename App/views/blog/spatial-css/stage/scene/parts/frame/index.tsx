import React from 'react';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';
import { usePlate } from '@/views/blog/spatial-css/stage/scene/shapes/use-plate';

const SIZE = {
  depth: 0.06,
  height: 1.9,
  hole: { height: 1.76, radius: 0.24, width: 2.56 },
  radius: 0.3,
  width: 2.7,
};

const Frame: React.FunctionComponent = () => {
  const geometry = usePlate(SIZE);
  const { stone } = useColours();
  const rim = useRim();

  return (
    <mesh castShadow geometry={geometry} receiveShadow>
      <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={stone} />
    </mesh>
  );
};

export { Frame };
