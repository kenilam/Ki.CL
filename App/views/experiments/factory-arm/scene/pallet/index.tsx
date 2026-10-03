import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Three
import { THREE } from '@/three';

// Constants
import { PALLET } from '@/views/experiments/factory-arm/scene/constants';

const WOOD = new THREE.MeshStandardMaterial({
  color: '#c7a16a',
  roughness: 0.85,
});

const [WIDTH, HEIGHT, DEPTH] = PALLET.size;
const BOARD = 0.022;
const BLOCK = HEIGHT - BOARD * 3;

// Seven top boards across the depth, three rows of blocks and boards below.
const TOP = Array.from(
  { length: 7 },
  (_, index) => (index / 6 - 0.5) * (DEPTH - 0.1)
);
const ROWS = [-0.5, 0, 0.5].map((row) => row * (DEPTH - 0.1));
const COLUMNS = [-0.5, 0, 0.5].map((column) => column * (WIDTH - 0.1));

type Props = Pick<React.ComponentProps<typeof RigidBody>, 'position'>;

/** A wooden pallet, and one box collider over its whole volume. */
const Pallet: React.FunctionComponent<Props> = ({ position }) => (
  <RigidBody type='fixed' colliders={false} position={position}>
    <CuboidCollider
      args={[WIDTH / 2, HEIGHT / 2, DEPTH / 2]}
      friction={0.9}
      position={[0, HEIGHT / 2, 0]}
    />

    {TOP.map((z) => (
      <mesh
        castShadow
        receiveShadow
        key={z}
        material={WOOD}
        position={[0, HEIGHT - BOARD / 2, z]}
      >
        <boxGeometry args={[WIDTH, BOARD, 0.1]} />
      </mesh>
    ))}
    {ROWS.map((z) => (
      <group key={z}>
        <mesh
          castShadow
          receiveShadow
          material={WOOD}
          position={[0, BOARD * 1.5 + BLOCK, z]}
        >
          <boxGeometry args={[WIDTH, BOARD, 0.1]} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          material={WOOD}
          position={[0, BOARD / 2, z]}
        >
          <boxGeometry args={[WIDTH, BOARD, 0.1]} />
        </mesh>
        {COLUMNS.map((x) => (
          <mesh
            castShadow
            receiveShadow
            key={x}
            material={WOOD}
            position={[x, BOARD + BLOCK / 2, z]}
          >
            <boxGeometry args={[0.1, BLOCK, 0.1]} />
          </mesh>
        ))}
      </group>
    ))}
  </RigidBody>
);

export { Pallet };
