import { useRef } from 'react';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';
import { useScene } from '@/views/blog/spatial-css/context';

// Three
import { Fiber, THREE } from '@/three';

// Constants
import {
  SIDES,
  TILT,
  YAW,
} from '@/views/blog/spatial-css/stage/scene/rig/constants';
import { LOOKS, ORDER, type Look } from '@/views/blog/spatial-css/stage/shots';

const MARGIN = 3;
const RATE = { enter: 3.2, exit: 6 };
const DELAY = 0.4;
const ARRIVED = 0.02;
const NARROW = { height: 3.8, width: 9 };

const nearest = (look: Look, height: number) => {
  const slots = document.querySelectorAll<HTMLElement>(`[data-look="${look}"]`);
  let best: DOMRect | null = null;

  slots.forEach((slot) => {
    const box = slot.getBoundingClientRect();
    const showing = box.bottom > 0 && box.top < height;
    const closer =
      !best ||
      Math.abs(box.top + box.height / 2 - height / 2) <
        Math.abs(best.top + best.height / 2 - height / 2);

    if (showing && closer) {
      best = box;
    }
  });

  return best as DOMRect | null;
};

const useSlide = (look: Look) => {
  const node = useRef<THREE.Group>(null);
  const last = useRef(-1);
  const shown = useRef(false);
  const exit = useRef(1);
  const since = useRef(0);
  const { read } = useScene();
  const { isWider, prefersReducedMotion: still } = useResponsive();
  const { i18n } = useTranslation();
  const side = SIDES[i18n.dir()];

  Fiber.useFrame(({ clock, size, viewport }, delta) => {
    const group = node.current;

    if (!group) {
      return;
    }

    if (isWider) {
      const box = nearest(look, size.height);

      group.visible = Boolean(box);

      if (!box) {
        return;
      }

      const sway = still ? 0 : Math.sin(clock.elapsedTime * 0.3) * 0.08;

      group.position.set(
        (box.left + box.width / 2 - size.width / 2) / viewport.factor,
        (size.height / 2 - box.top - box.height / 2) / viewport.factor,
        0
      );
      group.rotation.set(TILT, side * (YAW + sway), 0);
      group.scale.setScalar(
        Math.min(
          box.width / viewport.factor / NARROW.width,
          box.height / viewport.factor / NARROW.height
        )
      );

      return;
    }

    group.rotation.set(0, 0, 0);
    group.scale.setScalar(1);

    const away =
      (viewport.height * 0.75 + MARGIN) / (group.parent?.scale.y || 1);
    const shot = read();
    const index = ORDER.indexOf(shot);
    const active = LOOKS[shot] === look;

    if (index !== last.current) {
      const forward = index > last.current;

      if (active && !shown.current) {
        group.position.y = forward ? -away : away;
        since.current = clock.elapsedTime;
      }

      if (!active && shown.current) {
        exit.current = forward ? 1 : -1;
      }

      if (!active && last.current === -1) {
        group.position.y = away;
      }

      last.current = index;
      shown.current = active;
    }

    const goal = active ? 0 : exit.current * away;
    const waiting = active && clock.elapsedTime - since.current < DELAY;
    const rate = active ? RATE.enter : RATE.exit;

    if (!waiting) {
      group.position.y = still
        ? goal
        : THREE.MathUtils.damp(group.position.y, goal, rate, delta);
    }

    const travelling = Math.abs(group.position.y - goal) > away * ARRIVED;

    group.visible = active ? !waiting || still : travelling;
  });

  return node;
};

export { useSlide };
