import React from 'react';

// Materials
import { GLOSS } from '@/views/blog/spatial-css/stage/scene/materials';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';
import { useRim } from '@/views/blog/spatial-css/stage/scene/use-rim';

const Spot: React.FunctionComponent = () => {
  const { ink } = useColours();
  const rim = useRim();

  return (
    <mesh position={[0, 0.08, 0]}>
      <sphereGeometry args={[0.11, 32, 32]} />
      <meshPhysicalMaterial onBeforeCompile={rim} {...GLOSS} color={ink} />
    </mesh>
  );
};

export { Spot };
