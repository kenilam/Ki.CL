import { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { usePanelContext } from '@/views/experiments/factory-arm/panel-context';

// Constants
import { PANEL } from '@/views/experiments/factory-arm/constants';

const useShift = () => {
  const { width, height } = Fiber.useThree((state) => state.size);
  const { open } = usePanelContext();
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
};

export { useShift };
