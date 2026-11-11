import { useMemo, useRef, useState } from 'react';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/engine/kinematics';

// Spec
import type { Shape } from '@/views/experiments/factory-arm/engine/obstacles';
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';
import { useLogContext } from '@/views/experiments/factory-arm/log-context';
import { useKnowledgeContext } from '@/views/experiments/factory-arm/workspace/knowledge-context';

/**
 * The obstacles where they stand now, which the operator can move, add and
 * take away. Moving, adding or taking one away changes the cell from its
 * setup, and the arm knows where it now stands.
 */
const useObstacles = () => {
  const { applied, edit } = useAppliedContext();
  const { note } = useLogContext();
  const {
    write: { placed, removed },
  } = useKnowledgeContext();
  const obstacles = useRef(applied.obstacles);
  /** Shapes asked for from the panel, not yet put on the stage. */
  const asked = useRef<Shape[]>([]);
  /** The operator's last move of an obstacle: which, which way, and when. */
  const moving = useRef<{ id: string; by: Point; at: number } | null>(null);
  // The obstacles in the cell, by id, to draw one each.
  const [standing, setStanding] = useState(() =>
    applied.obstacles.map(({ id }) => id)
  );

  const write = useMemo(
    () => ({
      /**
       * Moves an obstacle by `by`. The arm is told where it now stands, and
       * checks its way again, so it never moves into one the operator placed.
       */
      move: (id: string, by: Point) => {
        const shift = ({ x, y, z }: Point) => ({
          x: x + by.x,
          y: y + by.y,
          z: z + by.z,
        });

        obstacles.current = obstacles.current.map((solid) =>
          solid.id === id
            ? { id, min: shift(solid.min), max: shift(solid.max) }
            : solid
        );

        edit(obstacles.current);
        placed(id);
        moving.current = { id, by, at: performance.now() };
      },
      /** Adds an obstacle the operator dropped on the stage; the arm knows where it stands. */
      place: (solid: Solid) => {
        note({ context: 'added', values: { id: solid.id } }, 'info');
        obstacles.current = [...obstacles.current, solid];
        edit(obstacles.current);
        placed(solid.id);
        setStanding((ids) => [...ids, solid.id]);
      },
      /** Takes an obstacle out of the cell. */
      withdraw: (id: string) => {
        note({ context: 'removed', values: { id } }, 'info');
        obstacles.current = obstacles.current.filter(
          (solid) => solid.id !== id
        );
        edit(obstacles.current);
        removed(id);
        setStanding((ids) => ids.filter((each) => each !== id));
      },
      /** Asks for a shape from the panel, for the stage to put where there is room. */
      ask: (shape: Shape) => {
        asked.current.push(shape);
      },
    }),
    [edit, note, placed, removed]
  );

  return useMemo(
    () => ({ asked, moving, obstacles, standing, write }),
    [standing, write]
  );
};

export { useObstacles };
