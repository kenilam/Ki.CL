// Physics
import { useBeforePhysicsStep } from '@react-three/rapier';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/scene/constants';

/** How far above the belt a case's underside can be and still ride it. */
const CONTACT = 0.03;

/** Cases below this have fallen out of the cell. */
const LOST = -1;

/**
 * Drives whatever rests on the belt at belt speed, and takes a case out of the
 * cell once it runs off the end or falls. The belt has no friction and sets
 * the velocity each step instead, so the speed is exact.
 */
const useBelt = () => {
  const { bodies, held, remove } = useFactoryArmContext();

  useBeforePhysicsStep(() => {
    bodies.current.forEach(({ body, box }, id) => {
      if (id === held.current?.id) {
        return;
      }

      const { x, y, z } = body.translation();
      const bottom = y - box.size[1] / 2;

      if (z > CONVEYOR.end || y < LOST) {
        // Dropped from the map now, so later steps skip it until it unmounts.
        bodies.current.delete(id);
        remove(id);

        return;
      }

      const riding =
        Math.abs(x - CONVEYOR.x) < CONVEYOR.width / 2 &&
        z > CONVEYOR.start &&
        bottom > CONVEYOR.height - CONTACT &&
        bottom < CONVEYOR.height + CONTACT;

      if (riding) {
        const velocity = body.linvel();

        body.setLinvel({ x: 0, y: velocity.y, z: CONVEYOR.speed }, true);
      }
    });
  });
};

export { useBelt };
