import React from 'react';

import { SIZE } from '@/views/mark/constants';

import { useVoxels } from './use-voxels';

const Voxels: React.FunctionComponent = () => {
  const { geometry, group, material, mesh } = useVoxels();

  return (
    <group ref={group}>
      <instancedMesh
        args={[geometry, material, SIZE * SIZE]}
        castShadow
        receiveShadow
        ref={mesh}
      />
    </group>
  );
};

export { Voxels };
