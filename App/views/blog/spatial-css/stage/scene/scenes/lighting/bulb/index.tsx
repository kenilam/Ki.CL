import React from 'react';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';

const Bulb: React.FunctionComponent = () => {
  const { accent } = useColours();

  return (
    <>
      <pointLight color={accent} decay={1.6} distance={9} intensity={80} />
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={3}
        />
      </mesh>
    </>
  );
};

export { Bulb };
