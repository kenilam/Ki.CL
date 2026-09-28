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

// Partials
import { Arrows } from './arrows';
import { Remove } from './remove';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/scene/constants';

const GREY = new THREE.Color('#8f9398');
const GLOW = new THREE.Color('#f07d1a');
const DARK = new THREE.Color('#000000');

/** How long an obstacle stays lit after it last stood in the way, in milliseconds. */
const LIT = 2500;

type Props = { id: string };

/**
 * One obstacle, as a body a carried case can't pass through. It's grey, and
 * lights up orange while it stands in the way of a move, and for as long
 * as a case waits because of it. It follows where the context says it
 * stands; `useNudge` only moves it where there is room.
 */
const Obstacle: React.FunctionComponent<Props> = ({ id }) => {
  const { obstacles, obstructing, parked, select, selected } =
    useFactoryArmContext();
  const body = useRef<RapierRigidBody>(null);

  // Its size never changes; only where it stands does.
  const [{ min, max }] = useState(() =>
    obstacles.current.find((solid) => solid.id === id)!
  );
  const size: [number, number, number] = [
    max.x - min.x,
    max.y - min.y,
    max.z - min.z,
  ];
  const centre = (solid = { min, max }) => ({
    x: (solid.min.x + solid.max.x) / 2,
    y: (solid.min.y + solid.max.y) / 2,
    z: (solid.min.z + solid.max.z) / 2,
  });
  const { x, y, z } = centre();

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GREY,
        emissive: DARK,
        roughness: 0.6,
      }),
    []
  );

  Fiber.useFrame(() => {
    const since = performance.now() - (obstructing.current.get(id) ?? -LIT);
    // Lit while a case waits on it, so what's in the way stays plain.
    const waited = [...parked.current.values()].some((across) =>
      across.includes(id)
    );
    const solid = obstacles.current.find((each) => each.id === id);

    material.emissive.copy(since < LIT || waited ? GLOW : DARK);

    if (solid) {
      body.current?.setNextKinematicTranslation(centre(solid));
    }
  });

  const pick = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on it isn't a click on it.
    if (event.delta <= DRAG) {
      select(selected === id ? null : id);
    }
  };

  return (
    <RigidBody
      colliders={false}
      position={[x, y, z]}
      ref={body}
      type='kinematicPosition'
      userData={{ obstacle: id }}
    >
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
      <mesh
        castShadow
        material={material}
        onClick={pick}
        onPointerOut={() => (document.body.style.cursor = '')}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        receiveShadow
      >
        <boxGeometry args={size} />
      </mesh>

      {selected === id && (
        <>
          <Arrows id={id} size={size} />
          <Remove id={id} size={size} />
        </>
      )}
    </RigidBody>
  );
};

export { Obstacle };
