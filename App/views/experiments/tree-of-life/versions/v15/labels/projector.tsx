import React, { useRef } from 'react';

// Three
import { THREE, Fiber } from '@/three';

// Store
import { registry, store } from './store';

/** Publishes screen positions each frame. Must live inside the Canvas. */
export const LabelProjector: React.FunctionComponent = () => {
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);
  const scratch = useRef(new THREE.Vector3());

  Fiber.useFrame(() => {
    store.width = size.width;
    store.height = size.height;

    store.projected = [...registry.entries()].map(([key, label]) => {
      scratch.current.set(...(label.position as [number, number, number]));

      const distance = camera.position.distanceTo(scratch.current);

      scratch.current.project(camera);

      const perspective = camera as THREE.PerspectiveCamera;
      const worldPerPx =
        (2 * distance * Math.tan(((perspective.fov ?? 50) * Math.PI) / 360)) /
        size.height;

      return {
        key,
        text: label.text,
        accent: label.accent,
        x: ((scratch.current.x + 1) / 2) * size.width,
        y: ((1 - scratch.current.y) / 2) * size.height,
        priority: label.priority,
        radiusPx: label.radius / Math.max(worldPerPx, 1e-6),
        // `z > 1` is behind the camera, where the projection flips.
        visible: scratch.current.z <= 1,
      };
    });
  });

  return null;
};
