// Kinematics
import type { Joints } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Frames
import {
  aim,
  frames,
  place,
} from '@/views/experiments/factory-arm/scene/arm/frames';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Constants
import { CONE, RANGE, SENSORS } from './constants';

/**
 * What each sensor sees with the arm posed at `joints`: for every sensor with
 * something in its cone and range, the obstacles it sees. Any number of
 * sensors can see any number of obstacles at once.
 *
 * A sensor sees an obstacle when the obstacle's nearest point is within
 * `range` and inside its cone, so a wall is seen as soon as any part of it is.
 */
const sense = (joints: Joints, solids: Solid[], range = RANGE) => {
  const linked = frames(joints);
  const seen = new Map<string, string[]>();

  for (const sensor of SENSORS) {
    const origin = place(linked[sensor.link], sensor.position);
    const look = aim(linked[sensor.link], sensor.direction);

    for (const { id, min, max } of solids) {
      const nearest = {
        x: Math.min(Math.max(origin.x, min.x), max.x),
        y: Math.min(Math.max(origin.y, min.y), max.y),
        z: Math.min(Math.max(origin.z, min.z), max.z),
      };
      const offset = {
        x: nearest.x - origin.x,
        y: nearest.y - origin.y,
        z: nearest.z - origin.z,
      };
      const distance = Math.hypot(offset.x, offset.y, offset.z);
      const facing =
        distance === 0 ||
        (offset.x * look.x + offset.y * look.y + offset.z * look.z) /
          distance >=
          Math.cos(CONE);

      if (distance <= range && facing) {
        seen.set(sensor.id, [...(seen.get(sensor.id) ?? []), id]);
      }
    }
  }

  return seen;
};

export { sense };
