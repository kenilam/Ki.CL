import React from 'react';

// Three
import { THREE } from '@/three';

// Grid
import { PALLET } from '@/views/experiments/factory-arm/cell/grid/layout';

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

type Props = { position: [number, number, number] };

/** A wooden pallet. */
const Pallet: React.FunctionComponent<Props> = ({ position }) => (
  <group position={position}>
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
  </group>
);

export { Pallet };
