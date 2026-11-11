import React from 'react';

// Constants
import {
  BOARD,
  HEIGHT,
  WIDTH,
  WOOD,
} from '@/views/experiments/factory-arm/workspace/stage/scene/pallets/pallet/constants';

type Props = {
  /** Where the board is across the pallet's depth. */
  z: number;
};

/** One of the top boards. */
const Board: React.FunctionComponent<Props> = ({ z }) => {
  return (
    <mesh
      castShadow
      receiveShadow
      material={WOOD}
      position={[0, HEIGHT - BOARD / 2, z]}
    >
      <boxGeometry args={[WIDTH, BOARD, 0.1]} />
    </mesh>
  );
};

export { Board };
