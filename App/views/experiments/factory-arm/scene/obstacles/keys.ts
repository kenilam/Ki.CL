import { useEffect } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Partials
import { useNudge } from './nudge';

const KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

/**
 * Moves the selected obstacle with the arrow keys, up and down with Shift
 * held, and Escape lets it go.
 *
 * Up moves it away from the viewer and right to their right, whichever way
 * they've turned the view: the camera's heading on the floor, squared to the
 * nearer of the cell's axes, so an arrow key always moves it along one of
 * the arrows drawn round it.
 */
const useKeys = () => {
  const { select, selected } = useFactoryArmContext();
  const camera = Fiber.useThree((state) => state.camera);
  const nudge = useNudge();

  useEffect(() => {
    if (!selected) {
      return;
    }

    const press = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        select(null);

        return;
      }

      if (!KEYS.includes(event.key)) {
        return;
      }

      event.preventDefault();

      const { x, z } = camera.getWorldDirection(new THREE.Vector3());
      const [ahead, across]: Point[] =
        Math.abs(x) > Math.abs(z)
          ? [
              { x: Math.sign(x), y: 0, z: 0 },
              { x: 0, y: 0, z: Math.sign(x) },
            ]
          : [
              { x: 0, y: 0, z: Math.sign(z) },
              { x: -Math.sign(z), y: 0, z: 0 },
            ];
      const up: Point = { x: 0, y: 1, z: 0 };
      const back = (way: Point) => ({ x: -way.x, y: -way.y, z: -way.z });
      const ways: Record<string, Point> = event.shiftKey
        ? { ArrowUp: up, ArrowDown: back(up) }
        : {
            ArrowUp: ahead,
            ArrowDown: back(ahead),
            ArrowRight: across,
            ArrowLeft: back(across),
          };
      const way = ways[event.key];

      if (way) {
        nudge(selected, way);
      }
    };

    window.addEventListener('keydown', press);

    return () => window.removeEventListener('keydown', press);
  }, [camera, nudge, select, selected]);
};

export { useKeys };
