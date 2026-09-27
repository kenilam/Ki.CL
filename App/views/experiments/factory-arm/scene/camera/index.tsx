import React from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

/** Where the camera starts, before the operator turns the view. */
const POSITION: [number, number, number] = [-2.5, 3.3, 5.8];

/** Vertical field of view, in degrees, for a view as wide as it is tall or wider. */
const FOV = 42;

/** Half the horizontal angle the cell is framed for: that of a square view. */
const HALF = THREE.MathUtils.degToRad(FOV / 2);

/**
 * The view's camera. A field of view is the vertical angle, so on its own a
 * narrower, taller canvas keeps the height and crops the sides - the pallets
 * and the belt at the edges went first. Once the view is taller than it is
 * wide, the vertical angle opens up so the horizontal one stays what a square
 * view shows, and the whole cell stays in frame.
 */
const Camera: React.FunctionComponent = () => {
  const { width, height } = Fiber.useThree((state) => state.size);
  const aspect = width / Math.max(height, 1);
  const fov =
    aspect >= 1
      ? FOV
      : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(HALF) / aspect));

  return <Drei.PerspectiveCamera fov={fov} makeDefault position={POSITION} />;
};

export { Camera };
