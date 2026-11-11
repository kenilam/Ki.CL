import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Partials
import { Board } from './board';
import { Row } from './row';

// Constants
import { DEPTH, HEIGHT, ROWS, TOP, WIDTH } from './constants';

type Props = Pick<React.ComponentProps<typeof RigidBody>, 'position'>;

/** A wooden pallet, and one box collider over its whole volume. */
const Pallet: React.FunctionComponent<Props> = ({ position }) => {
  return (
    <RigidBody type='fixed' colliders={false} position={position}>
      <CuboidCollider
        args={[WIDTH / 2, HEIGHT / 2, DEPTH / 2]}
        friction={0.9}
        position={[0, HEIGHT / 2, 0]}
      />

      {TOP.map((z) => {
        return <Board key={z} z={z} />;
      })}
      {ROWS.map((z) => {
        return <Row key={z} z={z} />;
      })}
    </RigidBody>
  );
};

export { Pallet };
