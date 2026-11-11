import { useEffect } from 'react';

// Context
import { useCellContext } from '@/views/experiments/factory-arm/cell-context';
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

/** The panel reaches this run's cell through the setup, which outlives it. */
const useAttach = () => {
  const { attach } = useCellContext();
  const { working } = useArmContext();
  const { obstacles, write } = useObstaclesContext();

  useEffect(() => {
    attach({
      ask: write.ask,
      busy: () => working.current?.() ?? false,
      obstacles,
    });

    return () => attach(null);
  }, [attach, obstacles, working, write]);
};

export { useAttach };
