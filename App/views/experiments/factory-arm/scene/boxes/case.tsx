import React, { useMemo } from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Obstacles
import { OBSTACLES } from '@/views/experiments/factory-arm/scene/obstacles/constants';

// Grasp
import { jobs } from '@/views/experiments/factory-arm/scene/grasp/order';
import { hopeless } from '@/views/experiments/factory-arm/scene/grasp/start';

// Spec
import type { Box } from './spec';

const TAPE = 0.06;

/** Pixels the pointer may move between press and release and still click. */
const DRAG = 4;

const CARDBOARD = '#c69a64';
const TAPE_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#a97c47',
  roughness: 0.5,
});

/**
 * Glows over the cardboard: green for a case picked for the belt, yellow for
 * one being moved out of its way until it's on the buffer.
 */
const GLOW = {
  belt: new THREE.Color('#2fd065'),
  buffer: new THREE.Color('#ffc21a'),
  none: new THREE.Color('#000000'),
};

type Props = { box: Box };

/**
 * One case as a physics body. It registers itself so the gripper and the belt
 * can move it. Clicking it queues it for the arm to move to the belt, with
 * whatever is in the way going to the buffer pallet first, where it stays.
 */
const Case: React.FunctionComponent<Props> = ({ box }) => {
  const { bodies, held, known, queue, skip, write } = useFactoryArmContext();

  const [width, height, depth] = box.size;

  // Its own, so it can glow on its own.
  const cardboard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CARDBOARD,
        emissive: GLOW.none,
        emissiveIntensity: 0.55,
        roughness: 0.9,
      }),
    []
  );

  Fiber.useFrame(() => {
    const job = queue.current.find(({ id }) => id === box.id);

    cardboard.emissive.copy(job ? GLOW[job.to] : GLOW.none);
  });

  // Empty when it's queued already, or it or a case in its way is off the pallets.
  const moves = () =>
    jobs(box.id, bodies.current, queue.current, held.current?.id);

  const select = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on a case isn't a click on it.
    if (event.delta > DRAG) {
      return;
    }

    const asked = moves();
    const across = hopeless(
      asked,
      bodies.current,
      OBSTACLES.filter(({ id }) => known.current.has(id))
    );

    // A lift already known to be blocked: say so now rather than start.
    if (across.length) {
      write.obstruct(across);
      skip();

      return;
    }

    queue.current.push(...asked);
  };

  const hover = (event: Fiber.ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = moves().length ? 'pointer' : 'not-allowed';
  };

  return (
    <RigidBody
      ref={(body) => (body ? write.track(box.id, { body, box }) : undefined)}
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
        <mesh material={cardboard}>
          <boxGeometry args={box.size} />
        </mesh>
        <mesh material={TAPE_MATERIAL} position-y={height / 2 + 0.001}>
          <boxGeometry args={[width + 0.002, 0.002, TAPE]} />
        </mesh>
      </group>
    </RigidBody>
  );
};

export { Case };
