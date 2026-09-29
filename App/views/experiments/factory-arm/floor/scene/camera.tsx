import React, { useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Constants
import { PANEL } from '@/views/experiments/factory-arm/floor/constants';

/** Where the camera starts, from the middle of the floor: on the belt's side, looking across the row of arms. */
const OFFSET = { x: 2, y: 8, z: -13 };

/** Vertical field of view, in degrees, for a view as wide as it is tall or wider. */
const FOV = 42;

/** Half the horizontal angle the floor is framed for: that of a square view. */
const HALF = THREE.MathUtils.degToRad(FOV / 2);

type Props = { at: { x: number; z: number } };

/**
 * The view's camera. Once the view is taller than it is wide, the vertical
 * angle opens up so the horizontal one stays what a square view shows, and
 * the whole floor stays in frame. With the panel open over the stage's
 * right side, the view moves left by half of what the panel covers, so the
 * floor sits in the middle of what's left.
 */
const Camera: React.FunctionComponent<Props> = ({ at }) => {
  const { width, height } = Fiber.useThree((state) => state.size);
  const shift = useRef(0);

  Fiber.useFrame(({ camera, gl }, delta) => {
    const panel = document.getElementById(PANEL);
    const stage = gl.domElement.getBoundingClientRect();
    const covered = panel?.matches(':popover-open')
      ? Math.max(0, stage.right - panel.getBoundingClientRect().left)
      : 0;
    // Full screen on small screens: then it covers everything and nothing is left to centre in.
    const target = covered < stage.width ? covered / 2 : 0;

    shift.current += (target - shift.current) * Math.min(1, delta * 8);

    if (Math.abs(target - shift.current) < 0.5) {
      shift.current = target;
    }

    const lens = camera as THREE.PerspectiveCamera;

    if (shift.current === 0) {
      if (lens.view?.enabled) {
        lens.clearViewOffset();
      }

      return;
    }

    lens.setViewOffset(width, height, shift.current, 0, width, height);
  });

  const aspect = width / Math.max(height, 1);
  const fov =
    aspect >= 1
      ? FOV
      : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(HALF) / aspect));

  return (
    <Drei.PerspectiveCamera
      fov={fov}
      makeDefault
      position={[at.x + OFFSET.x, OFFSET.y, at.z + OFFSET.z]}
    />
  );
};

export { Camera };
