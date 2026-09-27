import React, { useMemo } from 'react';

// Physics
import {
  type CollisionEnterPayload,
  CuboidCollider,
  RigidBody,
} from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Grasp
import { jobs } from '@/views/experiments/factory-arm/scene/grasp/order';
import { hopeless } from '@/views/experiments/factory-arm/scene/grasp/start';

// Spec
import type { Box } from './spec';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/scene/constants';

const TAPE = 0.06;

const CARDBOARD = '#c69a64';
const TAPE_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#a97c47',
  roughness: 0.5,
});

/**
 * Glows over the cardboard: green for a case picked for the belt, yellow for
 * one being moved out of its way until it's on the buffer, and red for one
 * picked with no clear path, until an obstacle moves and it's tried again.
 */
const GLOW = {
  belt: new THREE.Color('#2fd065'),
  buffer: new THREE.Color('#ffc21a'),
  none: new THREE.Color('#000000'),
  stuck: new THREE.Color('#e5322d'),
  struck: new THREE.Color('#f07d1a'),
};

/** How long a struck case glows after the hit, in milliseconds. */
const LIT = 2500;

/** How far above a case's underside another's top may be and still hold it up. */
const RESTING = 0.02;

type Props = { box: Box };

/**
 * One case as a physics body. It registers itself so the gripper and the belt
 * can move it. Clicking it queues it for the arm to move to the belt, with
 * whatever is in the way going to the buffer pallet first, where it stays.
 */
const Case: React.FunctionComponent<Props> = ({ box }) => {
  const {
    bodies,
    held,
    known,
    obstacles,
    obstructing,
    parked,
    queue,
    skip,
    write,
  } = useFactoryArmContext();

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
    const hit = performance.now() - (obstructing.current.get(box.id) ?? -LIT);

    cardboard.emissive.copy(
      hit < LIT
        ? GLOW.struck
        : parked.current.has(box.id)
          ? GLOW.stuck
          : job
            ? GLOW[job.to]
            : GLOW.none
    );
  });

  /*
   * The carried case touching another is a hit, unless the other is under
   * it: that's the case or pallet it's being set down on.
   */
  const touch = ({ other }: CollisionEnterPayload) => {
    const id: unknown = other.rigidBodyObject?.userData.box;
    const below = typeof id === 'string' && bodies.current.get(id);
    const self = bodies.current.get(box.id);

    if (held.current?.id !== box.id || !below || !self) {
      return;
    }

    const bottom = self.body.translation().y - height / 2;
    const top = below.body.translation().y + below.box.size[1] / 2;

    if (top > bottom + RESTING) {
      write.strike(below.box.id);
    }
  };

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
      obstacles.current.filter(({ id }) => known.current.has(id))
    );

    // A lift already known to be blocked: say so now rather than start.
    if (across.length) {
      write.obstruct(across);
      write.park(box.id);
      skip(box.id);

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
      onCollisionEnter={touch}
      position={box.position}
      rotation={[0, box.yaw, 0]}
      userData={{ box: box.id }}
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
        <mesh castShadow receiveShadow material={cardboard}>
          <boxGeometry args={box.size} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          material={TAPE_MATERIAL}
          position-y={height / 2 + 0.001}
        >
          <boxGeometry args={[width + 0.002, 0.002, TAPE]} />
        </mesh>
      </group>
    </RigidBody>
  );
};

export { Case };
