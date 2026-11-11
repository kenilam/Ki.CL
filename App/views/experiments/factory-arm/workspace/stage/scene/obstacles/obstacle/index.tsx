import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Context
import { useSelectionContext } from '@/views/experiments/factory-arm/workspace/selection-context';

// Partials
import { Arrows } from './arrows';
import { Block } from './block';
import { Remove } from './remove';
import { useFollow } from './use-follow';
import { useSize } from './use-size';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

type Props = Pick<Solid, 'id'>;

/**
 * One obstacle, as a body a carried case can't pass through. It follows
 * where the context says it stands; `useNudge` only moves it where there is
 * room.
 */
const Obstacle: React.FunctionComponent<Props> = ({ id }) => {
  const { selected } = useSelectionContext();
  const size = useSize(id);
  const { body, position } = useFollow(id);

  return (
    <RigidBody
      colliders={false}
      position={position}
      ref={body}
      type='kinematicPosition'
      userData={{ obstacle: id }}
    >
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
      <Block id={id} />

      {selected === id ? (
        <>
          <Arrows id={id} />
          <Remove id={id} />
        </>
      ) : null}
    </RigidBody>
  );
};

export { Obstacle };
