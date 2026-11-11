import { useState } from 'react';

// Context
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

/** An obstacle's size. It never changes; only where it stands does. */
const useSize = (id: string) => {
  const { obstacles } = useObstaclesContext();

  const [size] = useState(() => {
    const { min, max } = obstacles.current.find((solid) => solid.id === id)!;

    return [max.x - min.x, max.y - min.y, max.z - min.z] as [
      number,
      number,
      number,
    ];
  });

  return size;
};

export { useSize };
