import { useMemo } from 'react';

import { useResponsive } from 'design/hooks';

import { THREE } from '@/three';

import { GLYPHS, SIZE } from '@/views/home/hero/mark/constants';

const START = 0.4;
const HOLD = 2.6;
const RIPPLE = 0.05;
const STIFFNESS = 170;
const DAMPING = 14;
const DEPTH = 0.7;
const SMALL = 0.36;

const useCells = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cells = useMemo(() => {
    return Array.from({ length: SIZE * SIZE }, (_, index) => {
      const column = index % SIZE;
      const row = Math.floor(index / SIZE);
      const x = column - (SIZE - 1) / 2;
      const y = (SIZE - 1) / 2 - row;

      return {
        column,
        distance: Math.hypot(x, y),
        grow: 0,
        growth: 0,
        lift: 0,
        row,
        speed: 0,
        x,
        y,
      };
    });
  }, []);

  return (mesh: THREE.InstancedMesh, time: number, delta: number) => {
    const step = Math.min(delta, 1 / 30);
    const since = Math.max(0, time - START);
    const turn = Math.floor(since / HOLD);

    cells.forEach((cell, index) => {
      const wave = cell.distance * RIPPLE;
      const reached = turn === 0 || since - turn * HOLD > wave;
      const glyph = GLYPHS[(reached ? turn : turn - 1) % GLYPHS.length];
      const on = glyph[cell.row][cell.column] === '#' ? 1 : 0;
      const shown = time > START + wave ? 1 : 0;

      if (still) {
        cell.lift = on;
        cell.grow = 1;
      } else {
        cell.speed +=
          (STIFFNESS * (on - cell.lift) - DAMPING * cell.speed) * step;
        cell.lift += cell.speed * step;
        cell.growth +=
          (STIFFNESS * (shown - cell.grow) - DAMPING * cell.growth) * step;
        cell.grow += cell.growth * step;
      }

      const bob = still ? 0 : 0.06 * Math.sin(time * 1.5 - cell.distance * 0.8);

      dummy.position.set(cell.x, cell.y, (cell.lift - 1) * DEPTH + bob);
      dummy.rotation.set(-cell.speed * 0.03, cell.speed * 0.02, 0);
      dummy.scale.setScalar(
        Math.max(0.001, (SMALL + (1 - SMALL) * cell.lift) * cell.grow)
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  };
};

export { useCells };
