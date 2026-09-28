// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Partials
import { useRoom } from './room';

// Constants
import { STEP } from './constants';

/**
 * Moves an obstacle a step one way, unless there's no room for it there. An
 * obstacle only goes where there is room, so it never pushes anything over.
 * One already within the planner's margin of the arm may still be moved away
 * from it, but none may be moved into that margin.
 */
const useNudge = () => {
  const { obstacles, write } = useFactoryArmContext();
  const { clear, near } = useRoom();

  return (id: string, way: Point) => {
    const solid = obstacles.current.find((each) => each.id === id);

    if (!solid) {
      return;
    }

    const by = { x: way.x * STEP, y: way.y * STEP, z: way.z * STEP };
    const shift = ({ x, y, z }: Point) => ({
      x: x + by.x,
      y: y + by.y,
      z: z + by.z,
    });
    const moved = { id, min: shift(solid.min), max: shift(solid.max) };

    if (clear(moved) && !(near(moved) && !near(solid))) {
      write.move(id, by);
    }
  };
};

export { useNudge };
