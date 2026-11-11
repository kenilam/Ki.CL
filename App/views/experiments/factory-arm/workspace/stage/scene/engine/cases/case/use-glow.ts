import { useMemo, useState } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

// Spec
import type { Box } from '@/views/experiments/factory-arm/engine/box';

// Helpers
import { tokenColor } from '@/helper';

const CARDBOARD = tokenColor('orange-300');

/**
 * Glows over the cardboard: green for a case asked for, yellow for one to be
 * moved out of its way, red for one refused until the cell changes.
 */
const GLOW = {
  belt: new THREE.Color(tokenColor('green-300')),
  buffer: new THREE.Color(tokenColor('yellow-500')),
  none: new THREE.Color(tokenColor('black-pure')),
  stuck: new THREE.Color(tokenColor('red-600')),
};

/** The load blink: how long after the case appears it starts, then how many times, each `period` ms. */
const BLINK = { count: 4, delay: 1500, period: 900 };

const useGlow = (box: Box) => {
  const {
    conductor: { state },
    hint,
  } = useEngineContext();

  const [born] = useState(() => performance.now());

  const cardboard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CARDBOARD,
        emissive: GLOW.none,
        emissiveIntensity: 0.55,
        roughness: 0.9,
      }),
    []
  );

  Fiber.useFrame(() => {
    // Its glow: asked for, in the way of one asked for, or refused.
    const current = state.job;
    const asked = state.targets.includes(box.id) || current?.target === box.id;
    const moving = state.clearing.has(box.id);
    const age = performance.now() - born - BLINK.delay;
    const blink =
      hint === box.id &&
      age > 0 &&
      age < BLINK.count * BLINK.period &&
      !state.targets.length &&
      !current;

    if (blink) {
      const pulse = (1 - Math.cos((age / BLINK.period) * Math.PI * 2)) / 2;

      cardboard.emissive.copy(GLOW.belt).multiplyScalar(pulse);

      return;
    }

    cardboard.emissive.copy(
      state.parked.has(box.id)
        ? GLOW.stuck
        : asked
          ? GLOW.belt
          : moving
            ? GLOW.buffer
            : GLOW.none
    );
  });

  return cardboard;
};

export { useGlow };
