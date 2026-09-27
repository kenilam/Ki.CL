// Physics
import { useRapier } from '@react-three/rapier';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Arm
import { BASE } from '@/views/experiments/factory-arm/scene/arm/constants';

// Route
import { collides } from '@/views/experiments/factory-arm/scene/grasp/route/body';

// Spec
import type { Solid } from './spec';

// Constants
import { CEILING, STEP } from './constants';

/** Room left round a moved obstacle, in metres, so one resting against something may still slide past it. */
const SLACK = 0.002;

/**
 * Moves an obstacle a step one way, unless that would put it into anything:
 * the floor, a case, a pallet, the belt, another obstacle, or the arm. An
 * obstacle only goes where there is room, so it never pushes anything over.
 */
const useNudge = () => {
  const { joints, obstacles, write } = useFactoryArmContext();
  const { rapier, world } = useRapier();

  return (id: string, way: Point) => {
    const solid = obstacles.current.find((each) => each.id === id);

    if (!solid) {
      return;
    }

    const by = { x: way.x * STEP, y: way.y * STEP, z: way.z * STEP };
    const min = {
      x: solid.min.x + by.x,
      y: solid.min.y + by.y,
      z: solid.min.z + by.z,
    };
    const max = {
      x: solid.max.x + by.x,
      y: solid.max.y + by.y,
      z: solid.max.z + by.z,
    };

    // The arm's base isn't a physics body either, and doesn't move.
    const onBase = (['x', 'y', 'z'] as const).every(
      (axis) => min[axis] < BASE.max[axis] && max[axis] > BASE.min[axis]
    );

    if (min.y < 0 || max.y > CEILING || onBase) {
      return;
    }

    const shape = new rapier.Cuboid(
      (max.x - min.x) / 2 - SLACK,
      (max.y - min.y) / 2 - SLACK,
      (max.z - min.z) / 2 - SLACK
    );
    let hit = false;

    world.intersectionsWithShape(
      {
        x: (min.x + max.x) / 2,
        y: (min.y + max.y) / 2,
        z: (min.z + max.z) / 2,
      },
      { x: 0, y: 0, z: 0, w: 1 },
      shape,
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

    /*
     * The arm isn't a physics body, so it's checked as the planner sees it:
     * an obstacle may not come within the planner's margin of the arm, but
     * one already that close may still be moved away.
     */
    const near = (solid: Solid) => collides(joints.current, undefined, [solid]);
    const closer = near({ id, min, max }) && !near(solid);

    if (
      hit ||
      closer ||
      collides(joints.current, undefined, [{ id, min, max }], 0)
    ) {
      return;
    }

    write.move(id, by);
  };
};

export { useNudge };
