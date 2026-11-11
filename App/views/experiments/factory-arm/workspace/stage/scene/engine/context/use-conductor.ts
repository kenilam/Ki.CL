import { useEffect, useState } from 'react';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Engine
import { conduct } from '@/views/experiments/factory-arm/engine/conductor';
import { later } from '@/views/experiments/factory-arm/engine/planners';
import { world } from '@/views/experiments/factory-arm/engine/world';

/**
 * The conductor for one run, which keeps the cell as it plans with it and
 * the job the arm works through. Its plans are made in two workers, off the
 * page's thread: one for the plans the arm waits on, one for trying refused
 * cases again, so a slow refusal holds up neither the frames nor the arm.
 */
const useConductor = () => {
  const { write } = useArmContext();
  const { boxes } = useCasesContext();
  const { known } = useKnowledgeContext();
  const { obstacles } = useObstaclesContext();

  const [planners] = useState(() => ({ arm: later(), background: later() }));
  const [conductor] = useState(() =>
    conduct({
      // It knows the obstacles the overhead camera sees; the sensors find the rest.
      world: world(
        boxes,
        obstacles.current.filter(({ id }) => known.current.has(id))
      ),
      planners,
      // Turned a quarter as it rests when its width lies along z, as it's drawn.
      resting: (own) => {
        const made = boxes.find(({ id }) => id === own.id);

        return made && Math.abs(own.size[0] - made.size[0]) > 1e-6
          ? Math.PI / 2
          : 0;
      },
    })
  );

  useEffect(
    () => () => {
      planners.arm.stop();
      planners.background.stop();
    },
    [planners]
  );

  // The panel asks before starting over while the arm works.
  useEffect(() => {
    write.busy(conductor.busy);

    return () => write.busy(null);
  }, [conductor, write]);

  return conductor;
};

export { useConductor };
