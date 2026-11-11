// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

// Arm geometry
import { collides } from '@/views/experiments/factory-arm/engine/body';

/** How close the arm comes to an obstacle it doesn't know of before it feels it, in metres. */
const FEEL = 0.01;

/**
 * An obstacle neither the overhead camera nor the sensors saw, the arm feels
 * as it touches it, as a torque sensor would, and knows from then on. Returns
 * what it felt this frame.
 */
const useFeel = () => {
  const { joints } = useArmContext();
  const { known, write } = useKnowledgeContext();
  const { obstacles } = useObstaclesContext();
  const { note } = useLogContext();
  const { conductor } = useEngineContext();

  return () => {
    const held = conductor.state.holding?.own;
    const felt = obstacles.current.filter(
      (solid) =>
        !known.current.has(solid.id) &&
        collides(
          joints.current,
          held && {
            size: held.size,
            yaw: 0,
            offset: { x: 0, y: -held.size[1] / 2, z: 0 },
          },
          [solid],
          FEEL
        )
    );

    if (felt.length) {
      write.learn(felt.map(({ id }) => id));
      note(
        {
          context: 'felt',
          values: { ids: felt.map(({ id }) => id).join(', ') },
        },
        'warning'
      );
    }

    return felt;
  };
};

export { useFeel };
