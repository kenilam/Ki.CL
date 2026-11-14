import { useMemo, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { THREE } from '@/three';

import { SIZE } from '@/views/mark/constants';
import { useMark, type Glyph } from '@/views/mark/context';

const START = 0.4;
const RIPPLE = 0.05;
const STIFFNESS = 170;
const DAMPING = 14;
const DEPTH = 0.7;
const SMALL = 0.36;

const useCells = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const { pick } = useMark();
  const shown = useRef<{ at: number; from: Glyph; to: Glyph } | null>(null);
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
    const picked = pick(time);

    if (picked !== shown.current?.to) {
      shown.current = {
        at: time,
        from: shown.current?.to ?? picked,
        to: picked,
      };
    }

    const { at, from, to } = shown.current;

    cells.forEach((cell, index) => {
      const wave = cell.distance * RIPPLE;
      const glyph = time - at > wave ? to : from;
      const on = glyph[cell.row][cell.column] === '#' ? 1 : 0;
      const grown = time > START + wave ? 1 : 0;

      if (still) {
        cell.lift = on;
        cell.grow = 1;
      } else {
        cell.speed +=
          (STIFFNESS * (on - cell.lift) - DAMPING * cell.speed) * step;
        cell.lift += cell.speed * step;
        cell.growth +=
          (STIFFNESS * (grown - cell.grow) - DAMPING * cell.growth) * step;
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
