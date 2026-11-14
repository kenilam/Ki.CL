import { useMemo } from 'react';

import { ACROSS, COUNT, FAR, NEAR, TALL } from './constants';

const noise = (index: number, salt: number) => {
  const wave = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;

  return wave - Math.floor(wave);
};

const usePieces = () => {
  return useMemo(() => {
    return Array.from({ length: COUNT }, (_, index) => {
      const depth = noise(index, 1);

      return {
        depth,
        size: 0.08 + noise(index, 2) * 0.2,
        spin: noise(index, 3) * Math.PI * 2,
        x: (noise(index, 4) - 0.5) * ACROSS,
        y: noise(index, 5) * TALL,
        z: FAR + depth * (NEAR - FAR),
      };
    });
  }, []);
};

export { usePieces };
