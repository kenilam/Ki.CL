import { useEffect, useRef } from 'react';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';

// Three
import { Fiber, THREE } from '@/three';

// Hooks
import { usePointer } from './use-pointer';
import { useRoom } from './use-room';

// Constants
import { SIDES, TILT, YAW } from './constants';

const SWAY = 0.08;
const FOLLOW = { x: 0.35, y: 0.2 };
const RATE = 2.5;
const SCENE = 5.6;
const GAP = 48;

const useRig = () => {
  const group = useRef<THREE.Group>(null);
  const { isNarrow, prefersReducedMotion: still } = useResponsive();
  const { i18n } = useTranslation();
  const invalidate = Fiber.useThree(({ invalidate }) => invalidate);
  const side = SIDES[i18n.dir()];
  const pointer = usePointer();
  const room = useRoom();

  useEffect(() => {
    const redraw = () => {
      invalidate();
    };

    window.addEventListener('scroll', redraw, { passive: true });

    return () => {
      window.removeEventListener('scroll', redraw);
    };
  }, [invalidate]);

  Fiber.useFrame(({ clock, size, viewport }, delta) => {
    const node = group.current;

    if (!node) {
      return;
    }

    if (isNarrow) {
      node.position.set(0, 0, 0);
      node.rotation.set(0, 0, 0);
      node.scale.setScalar(1);

      return;
    }

    const sway = still ? 0 : Math.sin(clock.elapsedTime * 0.3) * SWAY;
    const follow = still ? { x: 0, y: 0 } : pointer.current;
    const step = (from: number, to: number) => {
      return still ? to : THREE.MathUtils.damp(from, to, RATE, delta);
    };
    const { end, start } = room.current;
    const free = Math.max(0, size.width - start - end - GAP);
    const beside = end + GAP + free / 2 - size.width / 2;

    node.position.set((side * beside) / viewport.factor, 0, 0);
    node.rotation.set(
      step(node.rotation.x, TILT + follow.y * FOLLOW.y),
      step(node.rotation.y, side * (YAW + sway) + follow.x * FOLLOW.x),
      0
    );
    node.scale.setScalar(Math.min(1, free / viewport.factor / SCENE));
  });

  return group;
};

export { useRig };
