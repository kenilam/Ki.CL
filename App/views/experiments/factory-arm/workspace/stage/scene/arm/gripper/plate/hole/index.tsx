import React from 'react';

// Three
import { Drei } from '@/three';

// Constants
import { QUARTER } from '@/views/experiments/factory-arm/workspace/stage/scene/arm/gripper/constants';

type Props = Pick<React.ComponentProps<typeof Drei.Instance>, 'position'>;

/** One suction hole in the plate. */
const Hole: React.FunctionComponent<Props> = ({ position }) => {
  return <Drei.Instance position={position} rotation-x={-QUARTER} />;
};

export { Hole };
