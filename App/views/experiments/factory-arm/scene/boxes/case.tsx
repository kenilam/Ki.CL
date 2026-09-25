import React, { useCallback } from 'react';

// Physics
import {
  CuboidCollider,
  RigidBody,
  type RapierRigidBody,
} from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Order
import { jobs } from '@/views/experiments/factory-arm/scene/grasp/order';

// Spec
import type { Box } from './spec';

const TAPE = 0.06;

/** Pixels the pointer may move between press and release and still click. */
const DRAG = 4;

const MATERIAL = {
  cardboard: new THREE.MeshStandardMaterial({
    color: '#c69a64',
    roughness: 0.9,
  }),
  tape: new THREE.MeshStandardMaterial({ color: '#a97c47', roughness: 0.5 }),
};

type Props = { box: Box };

/**
 * One case as a physics body. It registers itself so the gripper and the belt
 * can move it. Clicking it queues it for the arm to move to the belt; what is
 * in the way goes to the buffer pallet first and follows it after.
 */
const Case: React.FunctionComponent<Props> = ({ box }) => {
  const { bodies, held, queue } = useFactoryArmContext();

  const [width, height, depth] = box.size;

  // Empty when it's queued already, or it or a case in its way is off the pallets.
  const moves = () =>
    jobs(box.id, bodies.current, queue.current, held.current?.id);

  const select = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on a case isn't a click on it.
    if (event.delta > DRAG) {
      return;
    }
    queue.current.push(...moves());
  };

  const hover = (event: Fiber.ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = moves().length ? 'pointer' : 'not-allowed';
  };

  const register = useCallback(
    (body: RapierRigidBody | null) => {
      if (!body) {
        return;
      }

      bodies.current.set(box.id, { body, box });

      return () => {
        bodies.current.delete(box.id);
      };
    },
    [bodies, box]
  );

  return (
    <RigidBody
      ref={register}
      colliders={false}
      position={box.position}
      rotation={[0, box.yaw, 0]}
    >
      <CuboidCollider
        args={[width / 2, height / 2, depth / 2]}
        friction={0.8}
        mass={box.mass}
        restitution={0}
      />
      <group
        onClick={select}
        onPointerOver={hover}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <mesh material={MATERIAL.cardboard}>
          <boxGeometry args={box.size} />
        </mesh>
        <mesh material={MATERIAL.tape} position-y={height / 2 + 0.001}>
          <boxGeometry args={[width + 0.002, 0.002, TAPE]} />
        </mesh>
      </group>
    </RigidBody>
  );
};

export { Case };
