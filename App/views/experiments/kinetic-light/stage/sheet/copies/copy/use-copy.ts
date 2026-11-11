import { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import {
  localOf,
  roundOf,
  widthOf,
} from '@/views/experiments/kinetic-light/stage/playhead';

const FADE_SECONDS = 1.2;

const useCopy = (offset: number) => {
  const { clock, sheet, timing } = useStageContext();
  const copy =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);

  Fiber.useFrame(() => {
    const current = copy.current;

    if (!current) {
      return;
    }

    const now = clock();
    const round = roundOf(now, timing);
    const entering =
      round === 0
        ? 1
        : Math.min(1, (localOf(now, timing) + timing.descent) / FADE_SECONDS);
    const shown = round + offset;
    let opacity = 0;

    if (shown >= 0 && shown < round) {
      opacity = 1;
    }

    if (shown === round) {
      opacity = entering;
    }

    current.position.x = shown * widthOf(sheet);
    current.material.opacity = opacity;
    current.visible = opacity > 0;
  });

  return copy;
};

export { useCopy };
