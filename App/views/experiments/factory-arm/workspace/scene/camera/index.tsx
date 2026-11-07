import React, { useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Constants
import { PANEL } from '@/views/experiments/factory-arm/constants';

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
  const { open } = useSetup();
  const shift = useRef(0);

  /*
   * With the panel open over the stage's right side, the view moves left by
   * half of what the panel covers, so the cell sits in the middle of what's
   * left. It eases there, keeping pace with the panel sliding in and out.
   */
  Fiber.useFrame(({ camera, gl }, delta) => {
    const panel = document.getElementById(PANEL);
    const stage = gl.domElement.getBoundingClientRect();
    const covered =
      open && panel?.matches(':popover-open')
        ? Math.max(0, stage.right - panel.getBoundingClientRect().left)
        : 0;
    // Full screen on small screens: then it covers everything and nothing is left to centre in.
    const target = covered < stage.width ? covered / 2 : 0;

    shift.current += (target - shift.current) * Math.min(1, delta * 8);

    if (Math.abs(target - shift.current) < 0.5) {
      shift.current = target;
    }

    const view = (camera as THREE.PerspectiveCamera).view;

    if (shift.current === 0) {
      if (view?.enabled) {
        (camera as THREE.PerspectiveCamera).clearViewOffset();
      }

      return;
    }

    (camera as THREE.PerspectiveCamera).setViewOffset(
      width,
      height,
      shift.current,
      0,
      width,
      height
    );
  });
  const aspect = width / Math.max(height, 1);
  const fov =
    aspect >= 1
      ? FOV
      : THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(HALF) / aspect));

  return <Drei.PerspectiveCamera fov={fov} makeDefault position={POSITION} />;
};

export { Camera };
