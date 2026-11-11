import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Partials
import { Tape } from './tape';
import { useCase } from './use-case';

// Spec
import type { Box } from '@/views/experiments/factory-arm/engine/box';

type Props = Pick<Box, 'id'>;

/**
 * One case. It's kinematic, so nothing but the arm moves it and a pile
 * never shifts under the planner. Its collider stays, so an obstacle can't
 * be moved into it. Clicking it asks for it to go to the belt.
 */
const Case: React.FunctionComponent<Props> = ({ id }) => {
  const { box, cardboard, hover, select, track, visual } = useCase(id);
  const [width, height, depth] = box.size;

  return (
    <>
      <RigidBody
        colliders={false}
        position={box.position}
        ref={track}
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
        onPointerOver={hover}
      >
        <mesh castShadow material={cardboard} receiveShadow>
          <boxGeometry args={box.size} />
        </mesh>
        <Tape id={box.id} />
      </group>
    </>
  );
};

export { Case };
