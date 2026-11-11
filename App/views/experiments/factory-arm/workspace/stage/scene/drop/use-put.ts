import { useRef } from 'react';

// Context
import { useSelectionContext } from '@/views/experiments/factory-arm/workspace/selection-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Obstacles
import { useRoom } from '@/views/experiments/factory-arm/workspace/stage/scene/use-room';
import {
  SHAPES,
  type Shape,
} from '@/views/experiments/factory-arm/engine/obstacles';

/** How far out, in metres, the search for room around a spot goes, and in what steps. */
const RINGS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6];
const TURNS = 12;

/**
 * Puts a shape at the nearest spot to `at` with room for it, and selects it
 * so the operator can move it straight away.
 */
const usePut = () => {
  const { select } = useSelectionContext();
  const { write } = useObstaclesContext();
  const { clear, near } = useRoom();
  const count = useRef(0);

  return (shape: Shape, at: { x: number; z: number }) => {
    const { base, size } = SHAPES[shape];
    const [width, height, depth] = size;
    const id = `${shape}-${(count.current += 1)}`;

    for (const ring of RINGS) {
      for (let turn = 0; turn < (ring ? TURNS : 1); turn++) {
        const angle = (turn / TURNS) * Math.PI * 2;
        const x = at.x + Math.cos(angle) * ring;
        const z = at.z + Math.sin(angle) * ring;
        const solid = {
          id,
          min: { x: x - width / 2, y: base, z: z - depth / 2 },
          max: { x: x + width / 2, y: base + height, z: z + depth / 2 },
        };

        if (clear(solid) && !near(solid)) {
          write.place(solid);
          select(id);

          return;
        }
      }
    }
  };
};

export { usePut };
