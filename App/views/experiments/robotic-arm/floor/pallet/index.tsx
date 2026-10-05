import React, { useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

// World
import type { Pallet as Plant } from '@/views/experiments/robotic-arm/floor/world';

// Partials
import { Deck } from './deck';

/** A pallet where the floor has it: in its slot, or on an AMR's deck. */
const Pallet: React.FunctionComponent<{ pallet: Plant }> = ({ pallet }) => {
  const group = useRef<Group>(null);

  useFrame(() => {
    const { heading, position } = pallet;

    group.current?.position.set(position.x, position.y, position.z);
    group.current?.rotation.set(0, heading, 0);
  });

  return (
    <group ref={group}>
      <Deck />
    </group>
  );
};

export { Pallet };
