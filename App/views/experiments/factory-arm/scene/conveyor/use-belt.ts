// Physics
import { useBeforePhysicsStep } from '@react-three/rapier';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/scene/constants';

/**
 * Takes a case out of the cell once the belt has carried it off the end. The
 * engine moves cases along the belt; this is the one place they leave.
 */
const useBelt = () => {
  const { bodies, remove } = useFactoryArmContext();

  useBeforePhysicsStep(() => {
    bodies.current.forEach(({ body }, id) => {
      if (body.translation().z > CONVEYOR.end) {
        // Dropped from the map now, so later steps skip it until it unmounts.
        bodies.current.delete(id);
        remove(id);
      }
    });
  });
};

export { useBelt };
