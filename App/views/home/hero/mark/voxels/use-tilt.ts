import { useEffect, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import type { THREE } from '@/three';

const PITCH = 0.42;
const YAW = -0.5;

const useTilt = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: 1 - (event.clientY / window.innerHeight) * 2,
      };
    };

    window.addEventListener('pointermove', move, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (group: THREE.Group, time: number, delta: number) => {
    if (still) {
      group.rotation.set(PITCH, YAW, 0);

      return;
    }

    const ease = 1 - Math.exp(-delta * 3);
    const pitch = PITCH - pointer.current.y * 0.25;
    const yaw = YAW + pointer.current.x * 0.35 + Math.sin(time * 0.35) * 0.12;

    group.rotation.x += (pitch - group.rotation.x) * ease;
    group.rotation.y += (yaw - group.rotation.y) * ease;
  };
};

export { useTilt };
