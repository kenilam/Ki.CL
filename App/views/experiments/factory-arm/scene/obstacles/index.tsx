import React, { useMemo } from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { OBSTACLES } from './constants';

const GREY = new THREE.Color('#8f9398');
const GLOW = new THREE.Color('#f07d1a');
const DARK = new THREE.Color('#000000');

/** How long an obstacle stays lit after it last stood in the way, in milliseconds. */
const LIT = 2500;

/**
 * The obstacles, as fixed bodies a carried case can't pass through. They're
 * grey, and light up orange while they stand in the way of a move.
 */
const Obstacles: React.FunctionComponent = () => {
  const { obstructing } = useFactoryArmContext();

  const materials = useMemo(
    () =>
      OBSTACLES.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: GREY,
            emissive: DARK,
            roughness: 0.6,
          })
      ),
    []
  );

  Fiber.useFrame(() => {
    const now = performance.now();

    OBSTACLES.forEach(({ id }, index) => {
      const since = now - (obstructing.current.get(id) ?? -Infinity);

      materials[index].emissive.copy(since < LIT ? GLOW : DARK);
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
            <mesh castShadow receiveShadow material={materials[index]}>
              <boxGeometry args={size} />
            </mesh>
          </RigidBody>
        );
      })}
    </>
  );
};

export { Obstacles };
