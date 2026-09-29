import { useEffect } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';
import { middle } from '@/views/experiments/factory-arm/floor/hub/obstacles';

// Partials
import { useDrag } from './drag';

// Constants
import { STEP } from '@/views/experiments/factory-arm/floor/constants';

/** Which way each arrow key moves a chosen obstacle, as seen: `ahead` away from the viewer, `side` to their right. */
const ARROWS: Record<string, { ahead: number; side: number }> = {
  ArrowLeft: { ahead: 0, side: -1 },
  ArrowRight: { ahead: 0, side: 1 },
  ArrowUp: { ahead: 1, side: 0 },
  ArrowDown: { ahead: -1, side: 0 },
};

/**
 * Where the arrows point on the floor from where the camera looks: ahead
 * is the way it faces, snapped to the nearest axis so a step stays square
 * to the cells, and right is a quarter turn from that.
 */
const heading = (camera: THREE.Camera) => {
  const look = camera.getWorldDirection(new THREE.Vector3());
  const ahead =
    Math.abs(look.x) > Math.abs(look.z)
      ? { x: Math.sign(look.x), z: 0 }
      : { x: 0, z: Math.sign(look.z) };

  return { ahead, right: { x: -ahead.z, z: ahead.x } };
};

/**
 * The keys on what is chosen. Delete takes it off the floor, Escape lets
 * it go. A chosen obstacle also moves by the arrows, a step at a time the
 * way the view faces; with Shift held Up and Down raise and lower it; R
 * gives it a quarter turn. Keys typed into a field are left to the field.
 */
const useKeys = () => {
  const { obstacles, raise, shift, stations, takeOff, targets, turn } =
    useHub();
  const { select, selected } = useDrag();
  const camera = Fiber.useThree((state) => state.camera);

  // Taken off the floor by other means: no longer chosen.
  useEffect(() => {
    if (!selected) {
      return;
    }

    const still =
      selected.kind === 'arm'
        ? stations.some(({ arm }) => arm === selected.id)
        : selected.kind === 'pallet'
          ? targets.some(({ id }) => id === selected.id)
          : obstacles.some(({ id }) => id === selected.id);

    if (!still) {
      select(null);
    }
  }, [obstacles, select, selected, stations, targets]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const press = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.matches('input, textarea, select, [contenteditable]')) {
        return;
      }

      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        takeOff(selected);

        return;
      }

      if (event.key === 'Escape') {
        select(null);

        return;
      }

      if (selected.kind !== 'obstacle') {
        return;
      }

      const found = obstacles.find(({ id }) => id === selected.id);
      const arrow = ARROWS[event.key];

      if (found && arrow) {
        const at = middle(found);

        event.preventDefault();

        if (event.shiftKey && arrow.ahead) {
          raise(selected.id, arrow.ahead * STEP);
        } else {
          const { ahead, right } = heading(camera);

          shift(selected.id, {
            x: at.x + (arrow.ahead * ahead.x + arrow.side * right.x) * STEP,
            z: at.z + (arrow.ahead * ahead.z + arrow.side * right.z) * STEP,
          });
        }
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        turn(selected.id);
      }
    };

    window.addEventListener('keydown', press);

    return () => window.removeEventListener('keydown', press);
  }, [camera, obstacles, raise, select, selected, shift, takeOff, turn]);
};

export { useKeys };
