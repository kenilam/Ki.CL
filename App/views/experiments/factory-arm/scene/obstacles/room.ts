// Physics
import { useRapier } from '@react-three/rapier';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Arm
import { BASE } from '@/views/experiments/factory-arm/scene/arm/constants';

// Route
import { collides } from '@/views/experiments/factory-arm/scene/grasp/route/body';

// Spec
import type { Solid } from './spec';

// Constants
import { CEILING } from './constants';

/** Room left round an obstacle, in metres, so one resting against something may still slide past it. */
const SLACK = 0.002;

/**
 * Whether an obstacle would have room where `solid` says: above the floor,
 * under the ceiling, and clear of the cases, pallets, belt, other obstacles,
 * the arm's base and the arm itself. `near` says whether it would come
 * within the planner's margin of the arm.
 */
const useRoom = () => {
  const { joints } = useFactoryArmContext();
  const { rapier, world } = useRapier();

  const near = (solid: Solid) => collides(joints.current, undefined, [solid]);

  const clear = ({ id, min, max }: Solid) => {
    // The arm's base isn't a physics body, and doesn't move.
    const onBase = (['x', 'y', 'z'] as const).every(
      (axis) => min[axis] < BASE.max[axis] && max[axis] > BASE.min[axis]
    );

    if (min.y < 0 || max.y > CEILING || onBase) {
      return false;
    }

    let hit = false;

    world.intersectionsWithShape(
      {
        x: (min.x + max.x) / 2,
        y: (min.y + max.y) / 2,
        z: (min.z + max.z) / 2,
      },
      { x: 0, y: 0, z: 0, w: 1 },
      new rapier.Cuboid(
        (max.x - min.x) / 2 - SLACK,
        (max.y - min.y) / 2 - SLACK,
        (max.z - min.z) / 2 - SLACK
      ),
      () => {
        hit = true;

        return false;
      },
      undefined,
      undefined,
      undefined,
      undefined,
      // Not itself.
      (collider) =>
        (collider.parent()?.userData as { obstacle?: string } | undefined)
          ?.obstacle !== id
    );

    // The arm isn't a physics body either, so it's checked as the planner sees it.
    return !hit && !collides(joints.current, undefined, [{ id, min, max }], 0);
  };

  return { clear, near };
};

export { useRoom };
