import { useEffect, useMemo, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { Fiber, THREE } from '@/three';

import { useMark } from '@/views/mark/context';

const TINT = 0.1;

const useInk = (material: THREE.MeshPhysicalMaterial) => {
  const { theme } = useResponsive();
  const { ink } = useMark();
  const invalidate = Fiber.useThree(({ invalidate }) => invalidate);
  const painted = useRef<{ material: THREE.Material; theme: string }>(null);
  const other = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    invalidate();
  }, [invalidate, theme]);

  return () => {
    if (
      painted.current?.material === material &&
      painted.current.theme === theme
    ) {
      return;
    }

    const { backgroundColor, color } = getComputedStyle(document.body);
    const tones = { backgroundColor, color };

    painted.current = { material, theme };
    other.set(ink === 'color' ? backgroundColor : color);
    material.color.set(tones[ink]).lerp(other, TINT);
  };
};

export { useInk };
