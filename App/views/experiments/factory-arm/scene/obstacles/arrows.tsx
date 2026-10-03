import React, { useMemo } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Partials
import { useNudge } from './nudge';

const IDLE = { color: new THREE.Color('#5d6167'), opacity: 0.6 };
const ACTIVE = { color: new THREE.Color('#3fb56b'), opacity: 0.95 };

/** How long an arrow stays green after a move its way, in milliseconds. */
const LIT = 250;

/** How far past the obstacle's face each arrow starts, and how far off the floor it lies. */
const GAP = 0.06;
const LIFT = 0.01;

/** A triangle pointing along +x from its base at the origin, flat in the xy plane. */
const TRIANGLE = new THREE.ShapeGeometry(
  new THREE.Shape().moveTo(0, -0.1).lineTo(0.18, 0).lineTo(0, 0.1).closePath()
);

const QUARTER = Math.PI / 2;

/**
 * Each way an obstacle can move, and the turn that points its triangle that
 * way. Those along the floor lie flat; up and down stand upright, turned to
 * face the viewer.
 */
const WAYS: { way: Point; rotation: [number, number, number] }[] = [
  { way: { x: 1, y: 0, z: 0 }, rotation: [-QUARTER, 0, 0] },
  { way: { x: -1, y: 0, z: 0 }, rotation: [-QUARTER, 0, Math.PI] },
  { way: { x: 0, y: 0, z: 1 }, rotation: [-QUARTER, 0, -QUARTER] },
  { way: { x: 0, y: 0, z: -1 }, rotation: [-QUARTER, 0, QUARTER] },
  { way: { x: 0, y: 1, z: 0 }, rotation: [0, 0, QUARTER] },
  { way: { x: 0, y: -1, z: 0 }, rotation: [0, 0, -QUARTER] },
];

type Props = { id: string; size: [number, number, number] };

/**
 * Triangles round the selected obstacle, one each way it can move: those
 * along the floor lie flat round its base, up and down stand over and under
 * it. Each is a translucent grey, green while the obstacle moves its way.
 * Clicking one moves it a step that way, as its key does.
 */
const Arrows: React.FunctionComponent<Props> = ({ id, size }) => {
  const { moving } = useFactoryArmContext();
  const nudge = useNudge();

  const materials = useMemo(
    () =>
      WAYS.map(
        () =>
          new THREE.MeshBasicMaterial({
            ...IDLE,
            color: IDLE.color.clone(),
            depthWrite: false,
            side: THREE.DoubleSide,
            transparent: true,
          })
      ),
    []
  );

  Fiber.useFrame(() => {
    const last = moving.current;
    const recent = last?.id === id && performance.now() - last.at < LIT;

    WAYS.forEach(({ way }, index) => {
      const active =
        recent &&
        Math.sign(last.by.x) === way.x &&
        Math.sign(last.by.y) === way.y &&
        Math.sign(last.by.z) === way.z;
      const look = active ? ACTIVE : IDLE;

      materials[index].color.copy(look.color);
      materials[index].opacity = look.opacity;
    });
  });

  return (
    <>
      {WAYS.map(({ way, rotation }, index) => {
        const triangle = (
          <mesh
            geometry={TRIANGLE}
            material={materials[index]}
            onClick={(event: Fiber.ThreeEvent<MouseEvent>) => {
              event.stopPropagation();
              nudge(id, way);
            }}
            onPointerOut={() => (document.body.style.cursor = '')}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            rotation={rotation}
          />
        );
        const key = `${way.x},${way.y},${way.z}`;

        // Up and down turn round the upright to face the viewer, so they read from any side.
        return way.y ? (
          <Drei.Billboard
            key={key}
            lockX
            lockZ
            position={[0, way.y * (size[1] / 2 + GAP), 0]}
          >
            {triangle}
          </Drei.Billboard>
        ) : (
          <group
            key={key}
            position={[
              way.x * (size[0] / 2 + GAP),
              LIFT - size[1] / 2,
              way.z * (size[2] / 2 + GAP),
            ]}
          >
            {triangle}
          </group>
        );
      })}
    </>
  );
};

export { Arrows };
