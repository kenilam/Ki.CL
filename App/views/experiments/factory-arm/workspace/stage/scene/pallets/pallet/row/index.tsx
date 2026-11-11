import React from 'react';

// Partials
import { Block } from './block';

// Constants
import {
  BLOCK,
  BOARD,
  COLUMNS,
  WIDTH,
  WOOD,
} from '@/views/experiments/factory-arm/workspace/stage/scene/pallets/pallet/constants';

type Props = {
  /** Where the row is across the pallet's depth. */
  z: number;
};

/** A row of blocks between two boards. */
const Row: React.FunctionComponent<Props> = ({ z }) => {
  return (
    <group position={[0, 0, z]}>
      <mesh
        castShadow
        receiveShadow
        material={WOOD}
        position={[0, BOARD * 1.5 + BLOCK, 0]}
      >
        <boxGeometry args={[WIDTH, BOARD, 0.1]} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        material={WOOD}
        position={[0, BOARD / 2, 0]}
      >
        <boxGeometry args={[WIDTH, BOARD, 0.1]} />
      </mesh>
      {COLUMNS.map((x) => {
        return <Block key={x} x={x} />;
      })}
    </group>
  );
};

export { Row };
