import React from 'react';

// World
import { PALLET } from '@/views/experiments/robotic-arm/floor/world';

// Constants
import { COLOURS } from '@/views/experiments/robotic-arm/floor/constants';

const BOARD = 0.03;
const BLOCK = 0.12;

/**
 * The pallet's own mesh, from its underside up: three runners under a deck.
 */
const Deck: React.FunctionComponent = () => (
  <group>
    {[-1, 0, 1].map((side) => (
      <mesh
        castShadow
        key={side}
        position={[side * (PALLET.width / 2 - BLOCK / 2), BLOCK / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[BLOCK, BLOCK, PALLET.depth]} />
        <meshStandardMaterial color={COLOURS.pallet} />
      </mesh>
    ))}
    <mesh castShadow position-y={PALLET.height - BOARD / 2} receiveShadow>
      <boxGeometry args={[PALLET.width, BOARD, PALLET.depth]} />
      <meshStandardMaterial color={COLOURS.pallet} />
    </mesh>
  </group>
);

export { Deck };
