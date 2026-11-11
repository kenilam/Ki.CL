// Three
import { Fiber } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

// Kinematics
import {
  bearing,
  forward,
} from '@/views/experiments/factory-arm/engine/kinematics';

// Partials
import { useFeel } from './use-feel';
import { useFlush } from './use-flush';
import { useSense } from './use-sense';

/** Each frame: what the arm felt and sensed goes to the conductor, its command to the arm, its events to the cell. */
const useDrive = () => {
  const { joints, write } = useArmContext();
  const { moving } = useObstaclesContext();
  const { conductor } = useEngineContext();
  const feel = useFeel();
  const flush = useFlush();
  const sense = useSense();

  Fiber.useFrame((_, delta) => {
    sense(feel());

    write.command(
      conductor.frame({
        pad: forward(joints.current),
        facing: bearing(joints.current),
        delta,
        now: performance.now(),
        moved: moving.current?.at ?? -Infinity,
      })
    );

    flush();
  });
};

export { useDrive };
