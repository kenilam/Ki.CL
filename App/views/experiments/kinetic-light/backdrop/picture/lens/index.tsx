import React, { useLayoutEffect } from 'react';

// Three
import { Fiber, THREE } from '@/three';

const SHIFT = 0.2;

const Lens: React.FunctionComponent = () => {
  const { camera, size } = Fiber.useThree();

  useLayoutEffect(() => {
    const lens = camera as THREE.PerspectiveCamera;

    if (size.width > size.height) {
      lens.setViewOffset(
        size.width,
        size.height,
        -size.width * SHIFT,
        0,
        size.width,
        size.height
      );
    } else {
      lens.clearViewOffset();
    }

    return () => lens.clearViewOffset();
  }, [camera, size.height, size.width]);

  return null;
};

export { Lens };
