import React from 'react';

// Three
import { Drei } from '@/three';

// Partials
import { Triangle } from './triangle';
import { useSize } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/use-size';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Constants
import { WAYS } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/arrows/ways';

/** How far past the obstacle's face each arrow starts, and how far off the floor it lies. */
const GAP = 0.06;
const LIFT = 0.01;

type Props = Pick<Solid, 'id'> & Pick<(typeof WAYS)[number], 'axis'>;

/** One way the obstacle can move, placed past the face it points out of. */
const Arrow: React.FunctionComponent<Props> = ({ axis, id }) => {
  const size = useSize(id);
  const { way } = WAYS.find((each) => {
    return each.axis === axis;
  })!;

  // Up and down turn round the upright to face the viewer, so they read from any side.
  if (way.y) {
    return (
      <Drei.Billboard
        lockX
        lockZ
        position={[0, way.y * (size[1] / 2 + GAP), 0]}
      >
        <Triangle axis={axis} id={id} />
      </Drei.Billboard>
    );
  }

  return (
    <group
      position={[
        way.x * (size[0] / 2 + GAP),
        LIFT - size[1] / 2,
        way.z * (size[2] / 2 + GAP),
      ]}
    >
      <Triangle axis={axis} id={id} />
    </group>
  );
};

export { Arrow };
