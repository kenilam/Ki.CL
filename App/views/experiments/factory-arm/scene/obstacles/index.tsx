import React, { useMemo } from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { OBSTACLES } from './constants';

const UNSEEN = new THREE.Color('#e3b52b');
const FOUND = new THREE.Color('#d9482b');

/**
 * The obstacles, as fixed bodies a carried case can't pass through. Each one
 * turns from yellow to red once a sensor has found it.
 */
const Obstacles: React.FunctionComponent = () => {
  const { known } = useFactoryArmContext();

  const materials = useMemo(
    () =>
      OBSTACLES.map(
        () => new THREE.MeshStandardMaterial({ color: UNSEEN, roughness: 0.6 })
      ),
    []
  );

  Fiber.useFrame(() => {
    OBSTACLES.forEach(({ id }, index) => {
      materials[index].color.copy(known.current.has(id) ? FOUND : UNSEEN);
    });
  });

  return (
    <>
      {OBSTACLES.map(({ id, min, max }, index) => {
        const size: [number, number, number] = [
          max.x - min.x,
          max.y - min.y,
          max.z - min.z,
        ];
        const centre: [number, number, number] = [
          (min.x + max.x) / 2,
          (min.y + max.y) / 2,
          (min.z + max.z) / 2,
        ];

        return (
          <RigidBody key={id} type='fixed' colliders={false} position={centre}>
            <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
            <mesh material={materials[index]}>
              <boxGeometry args={size} />
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
};

export { Obstacles };
