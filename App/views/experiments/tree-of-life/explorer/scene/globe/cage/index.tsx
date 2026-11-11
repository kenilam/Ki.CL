import React from 'react';

// Context
import { useGlobeContext } from '@/views/experiments/tree-of-life/explorer/scene/globe/context';

// Partials
import { Shell } from './shell';

// Constants
import { ORIGIN } from '@/views/experiments/tree-of-life/explorer/constants';
import {
  AXIAL_TILT,
  BLUR_SHELLS,
  OPACITY,
} from '@/views/experiments/tree-of-life/explorer/scene/globe/constants';

// Helpers
import { tokenColor } from '@/helper';

const Cage: React.FunctionComponent = () => {
  const { geometry, materialRef, meshRef } = useGlobeContext();

  return (
    <group position={ORIGIN} rotation={[0, 0, AXIAL_TILT]}>
      <mesh ref={meshRef} scale={0} raycast={() => null} geometry={geometry}>
        <meshBasicMaterial
          ref={materialRef}
          color={tokenColor('black-100')}
          wireframe
          transparent
          // Out of the haze: the cage is mostly "distant", so it would go flat.
          fog={false}
          opacity={OPACITY}
          depthWrite={false}
        />
      </mesh>

      {BLUR_SHELLS.map((side) => {
        return <Shell key={side} side={side} />;
      })}
    </group>
  );
};

export { Cage };
