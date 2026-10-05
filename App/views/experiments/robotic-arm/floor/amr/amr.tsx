import React, { useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';

// World
import { ACROSS, DECK, PALLET, type Amr as Plant } from '@/views/experiments/robotic-arm/floor/world';

// Constants
import { COLOURS } from '@/views/experiments/robotic-arm/floor/constants';

/** A low chassis the size of a pallet, with a lift plate on top. */
const BODY = { width: PALLET.width, height: 0.14, depth: PALLET.depth };
const PLATE = 0.04;
const WHEEL = 0.08;

/** The plate's top, lowered and raised. */
const DOWN = WHEEL + BODY.height + PLATE;

/** A delivery robot. Its plate rises to the deck height to carry a pallet. */
const Amr: React.FunctionComponent<{ amr: Plant }> = ({ amr }) => {
  const group = useRef<Group>(null);
  const plate = useRef<Mesh>(null);

  useFrame(() => {
    group.current?.position.set(amr.position.x, 0, amr.position.z);
    group.current?.rotation.set(0, amr.heading + ACROSS, 0);
    plate.current?.position.setY((amr.lifted ? DECK : DOWN) - PLATE / 2);
  });

  return (
    <group ref={group}>
      <mesh castShadow position-y={WHEEL + BODY.height / 2} receiveShadow>
        <boxGeometry args={[BODY.width, BODY.height, BODY.depth]} />
        <meshStandardMaterial color={COLOURS.amr} />
      </mesh>
      <mesh castShadow ref={plate}>
        <boxGeometry args={[BODY.width * 0.9, PLATE, BODY.depth * 0.9]} />
        <meshStandardMaterial color={COLOURS.joint} />
      </mesh>
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`${x}${z}`}
            position={[x * BODY.width * 0.35, WHEEL, z * BODY.depth * 0.45]}
            rotation-x={Math.PI / 2}
          >
            <cylinderGeometry args={[WHEEL, WHEEL, 0.06, 16]} />
            <meshStandardMaterial color={COLOURS.pad} />
          </mesh>
        ))
      )}
    </group>
  );
};

export { Amr };
