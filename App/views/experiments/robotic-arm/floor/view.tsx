import React, { useEffect } from 'react';

// Libraries
import { useThree } from '@react-three/fiber';
import type { OrbitControls } from 'three-stdlib';

// Grid
import { toPoint } from 'arm/grid';

// World
import type { World } from './world';

/** Seen from the south-east, far enough back to take in the whole floor. */
const View: React.FunctionComponent<{ world: World }> = ({ world }) => {
  const camera = useThree(({ camera }) => camera);
  const controls = useThree(({ controls }) => controls) as OrbitControls | null;

  useEffect(() => {
    const { x, z } = toPoint(world.ground.centre);
    const reach = Math.max(10, world.ground.radius * 1.2);

    camera.position.set(x + reach * 0.6, reach * 0.8, z + reach * 0.9);
    controls?.target.set(x, 0, z);
    controls?.update();
  }, [camera, controls, world]);

  return null;
};

export { View };
