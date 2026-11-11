import { useRef } from 'react';

// Context
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

/**
 * Tells the conductor what the arm knows of the cell once the operator moved
 * an obstacle or the arm came to know of one, and logs what the sensors saw
 * for the first time.
 */
const useSense = () => {
  const { found, known } = useKnowledgeContext();
  const { obstacles } = useObstaclesContext();
  const { note } = useLogContext();
  const { conductor } = useEngineContext();

  // The obstacles and what was known of them, as the conductor was last told.
  const told = useRef<{
    obstacles: Solid[];
    found: number;
    known: Set<string>;
  } | null>(null);

  return (felt: Solid[]) => {
    if (
      told.current?.obstacles === obstacles.current &&
      told.current.found === found.current
    ) {
      return;
    }

    const before = told.current;
    const seen = obstacles.current.filter(
      ({ id }) => !before?.known.has(id) && known.current.has(id)
    );

    // An obstacle the operator moved or added is known already.
    if (before && seen.length && !felt.length) {
      note(
        {
          context: 'found',
          values: { ids: seen.map(({ id }) => id).join(', ') },
        },
        'info'
      );
    }

    conductor.sense(
      obstacles.current.filter(({ id }) => known.current.has(id)),
      !!before && before.obstacles !== obstacles.current
    );
    told.current = {
      obstacles: obstacles.current,
      found: found.current,
      known: new Set(known.current),
    };
  };
};

export { useSense };
