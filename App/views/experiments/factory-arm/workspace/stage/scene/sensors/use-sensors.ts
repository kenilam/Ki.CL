// Three
import { Fiber } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Sense
import { sense } from './sense';

const useSensors = () => {
  const { joints } = useArmContext();
  const { write } = useKnowledgeContext();
  const { obstacles } = useObstaclesContext();

  Fiber.useFrame(() => {
    const seen = sense(joints.current, obstacles.current);

    write.seeing(new Set(seen.keys()));
    write.learn([...seen.values()].flat());
  });
};

export { useSensors };
