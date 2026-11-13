import { useEffect, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { Fiber, type THREE } from '@/three';

const useInk = (material: THREE.MeshPhysicalMaterial) => {
  const { theme } = useResponsive();
  const invalidate = Fiber.useThree(({ invalidate }) => invalidate);
  const painted = useRef<string | null>(null);

  useEffect(() => {
    invalidate();
  }, [invalidate, theme]);

  return () => {
    if (painted.current === theme) {
      return;
    }

    painted.current = theme;
    material.color
      .set(getComputedStyle(document.body).color)
      .multiplyScalar(0.9);
  };
};

export { useInk };
