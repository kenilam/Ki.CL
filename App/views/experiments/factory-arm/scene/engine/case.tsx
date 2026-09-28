import React, { useMemo, useRef, useState } from 'react';

// Physics
import {
  CuboidCollider,
  type RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import {
  bearing,
  forward,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/pallet/spec';

// Partials
import { useEngine } from './store';

// Constants
import {
  CONVEYOR,
  DRAG,
} from '@/views/experiments/factory-arm/scene/constants';

const TAPE = 0.06;
const CARDBOARD = '#c69a64';
const TAPE_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#a97c47',
  roughness: 0.5,
});

/**
 * Glows over the cardboard: green for a case asked for, yellow for one to be
 * moved out of its way, red for one refused until the cell changes.
 */
const GLOW = {
  belt: new THREE.Color('#2fd065'),
  buffer: new THREE.Color('#ffc21a'),
  none: new THREE.Color('#000000'),
  stuck: new THREE.Color('#e5322d'),
};

/** The load blink: how long after the case appears it starts, then how many times, each `period` ms. */
const BLINK = { count: 4, delay: 1500, period: 900 };

type Props = { box: Box; hint?: boolean };

/**
 * One case, placed where the engine says each frame: on its pallet, on the
 * pad, or riding the belt. It's kinematic, so nothing but the arm moves it
 * and a pile never shifts under the planner. Its collider stays, so an
 * obstacle can't be moved into it. Clicking it asks for it to go to the belt.
 */
const Case: React.FunctionComponent<Props> = ({ box, hint }) => {
  const { joints, write } = useFactoryArmContext();
  const {
    conductor: { ask, state },
  } = useEngine();

  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<THREE.Group>(null);
  const [born] = useState(() => performance.now());
  const [width, height, depth] = box.size;

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
    const target = body.current;

    if (!target) {
      return;
    }

    const held = state.holding;
    const rider = state.riders.get(box.id);
    const own = state.world.cases[box.id];
    let at = own?.at;
    // Square to the cell: turned a quarter when its width lies along z.
    let yaw = own && Math.abs(own.size[0] - width) > 1e-6 ? Math.PI / 2 : 0;

    if (held?.own.id === box.id) {
      const pad = forward(joints.current);

      at = { ...pad, y: pad.y - height / 2 };
      yaw = held.yaw + bearing(joints.current);
    } else if (rider) {
      at = { x: CONVEYOR.x, y: CONVEYOR.height + height / 2, z: rider.z };
      yaw = rider.yaw;
    }

    if (at) {
      // Drawn straight from the engine, so it moves with the pad this frame.
      visual.current?.position.set(at.x, at.y, at.z);
      visual.current?.rotation.set(0, yaw, 0);

      // Its body only carries the collider the obstacle checks use; a frame late there doesn't show.
      target.setNextKinematicTranslation(at);
      target.setNextKinematicRotation(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw)
      );
    }

    // Its glow: asked for, in the way of one asked for, or refused.
    const current = state.job;
    const asked = state.targets.includes(box.id) || current?.target === box.id;
    const moving = state.clearing.has(box.id);
    const age = performance.now() - born - BLINK.delay;
    const blink =
      hint &&
      age > 0 &&
      age < BLINK.count * BLINK.period &&
      !state.targets.length &&
      !current;

    if (blink) {
      const pulse = (1 - Math.cos((age / BLINK.period) * Math.PI * 2)) / 2;

      cardboard.emissive.copy(GLOW.belt).multiplyScalar(pulse);

      return;
    }

    cardboard.emissive.copy(
      state.parked.has(box.id)
        ? GLOW.stuck
        : asked
          ? GLOW.belt
          : moving
            ? GLOW.buffer
            : GLOW.none
    );
  });

  const select = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on a case isn't a click on it.
    if (event.delta > DRAG) {
      return;
    }

    ask(box.id);
  };

  return (
    <>
      <RigidBody
        colliders={false}
        position={box.position}
        ref={(next) => {
          body.current = next;

          return next ? write.track(box.id, { body: next, box }) : undefined;
        }}
        rotation={[0, box.yaw, 0]}
        type='kinematicPosition'
        userData={{ box: box.id }}
      >
        <CuboidCollider args={[width / 2, height / 2, depth / 2]} />
      </RigidBody>

      <group
        onClick={select}
        position={box.position}
        ref={visual}
        rotation={[0, box.yaw, 0]}
        onPointerOut={() => (document.body.style.cursor = '')}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = state.world.cases[box.id]
            ? 'pointer'
            : 'default';
        }}
      >
        <mesh castShadow material={cardboard} receiveShadow>
          <boxGeometry args={box.size} />
        </mesh>
        <mesh
          castShadow
          material={TAPE_MATERIAL}
          position-y={height / 2 + 0.001}
          receiveShadow
        >
          <boxGeometry args={[width + 0.002, 0.002, TAPE]} />
        </mesh>
      </group>
    </>
  );
};

export { Case };
