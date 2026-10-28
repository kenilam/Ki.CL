import React, { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Store
import { anchors, elements } from './store';

const Overlays: React.FunctionComponent = () => {
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);
  const point = useRef(new THREE.Vector3());

  Fiber.useFrame(() => {
    elements.forEach((element, id) => {
      const anchor = anchors.get(id);

      if (!anchor) {
        element.style.visibility = 'hidden';

        return;
      }

      anchor.getWorldPosition(point.current).project(camera);

      const x = ((point.current.x + 1) / 2) * size.width;
      const y = ((1 - point.current.y) / 2) * size.height;

      element.style.translate = `${x - element.offsetWidth / 2}px ${y - element.offsetHeight / 2}px`;
      element.style.visibility = 'visible';
    });
  });

  return null;
};

export { Overlays };
export { toAnchor, toElement } from './store';
