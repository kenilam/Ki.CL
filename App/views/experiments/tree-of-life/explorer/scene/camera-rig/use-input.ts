import { useEffect } from 'react';

import { Fiber } from '@/three';

// Constants
import { DRAG_SENSITIVITY, WHEEL_SENSITIVITY } from './constants';

// Rig
import type { Rig } from './use-rig';

type Props = Pick<Rig, 'hand' | 'spin' | 'tilt' | 'wanted'>;

/** The wheel sets how far out the view is, and a drag orbits it. */
const useInput = ({ hand, spin, tilt, wanted }: Props) => {
  const canvas = Fiber.useThree((state) => state.gl.domElement);

  useEffect(() => {
    /*
     * The wheel is listened for on the figure that holds the canvas and the
     * names: each name is a link above the canvas, so a wheel over one never
     * reaches the canvas. Not the window, so the panel and dialogs still
     * scroll.
     */
    const stage = canvas.closest('figure') ?? canvas;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      wanted.current = Math.min(
        Math.max(wanted.current + event.deltaY * WHEEL_SENSITIVITY, 0),
        1
      );
    };

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) {
        return;
      }

      spin.current += (event.clientX - lastX) * DRAG_SENSITIVITY * hand.current;

      // Dragging down lifts the camera, the way an orbit control reads.
      tilt.current -= (event.clientY - lastY) * DRAG_SENSITIVITY * hand.current;

      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onUp = () => {
      dragging = false;
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      stage.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [canvas]);
};

export { useInput };
