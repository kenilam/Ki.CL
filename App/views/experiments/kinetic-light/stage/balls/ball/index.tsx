import React from 'react';

// Three
import { THREE } from '@/three';

// Hooks
import { useBall } from './use-ball';

// Constants
import { RADIUS } from './constants';

type Props = Parameters<typeof useBall>[0];

const Ball: React.FunctionComponent<Props> = (props) => {
  const {
    glow,
    halo,
    mirror,
    mirrored,
    reflection,
    ribbon,
    sphere,
    streak,
    trail,
    tube,
  } = useBall(props);

  return (
    <>
      <mesh ref={sphere}>
        <sphereGeometry args={[RADIUS, 24, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </mesh>
      <sprite ref={halo}>
        <spriteMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          map={glow}
          toneMapped={false}
        />
      </sprite>
      <sprite ref={streak}>
        <spriteMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          map={glow}
          toneMapped={false}
        />
      </sprite>
      <mesh
        frustumCulled={false}
        geometry={ribbon}
        material={tube}
        ref={trail}
      />
      <mesh
        frustumCulled={false}
        geometry={reflection}
        material={mirrored}
        ref={mirror}
        scale-y={-1}
      />
    </>
  );
};

export { Ball };
