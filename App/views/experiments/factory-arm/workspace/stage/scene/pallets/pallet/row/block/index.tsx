import React from 'react';

// Constants
import {
  BLOCK,
  BOARD,
  WOOD,
} from '@/views/experiments/factory-arm/workspace/stage/scene/pallets/pallet/constants';

type Props = {
  /** Where the block is across the pallet's width. */
  x: number;
};

const Block: React.FunctionComponent<Props> = ({ x }) => {
  return (
    <mesh
      castShadow
      receiveShadow
      material={WOOD}
      position={[x, BOARD + BLOCK / 2, 0]}
    >
      <boxGeometry args={[0.1, BLOCK, 0.1]} />
    </mesh>
  );
};

export { Block };
