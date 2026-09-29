// Protocol
import type { Box, Joints } from '../protocol';

// Model
import { LINK, SIDE } from '../model/constants';
import { aim, frames, place, type Vector } from '../model/frames';

/**
 * A proximity sensor on one of the arm's links: where it sits and which way
 * it looks, in that link's own axes (x across, y up from the link, z along it).
 */
type Sensor = {
  id: string;
  link: 'turret' | 'upper' | 'fore' | 'wrist' | 'gripper';
  position: Vector;
  direction: Vector;
};

/** How far a sensor sees, in metres. */
const RANGE = 0.5;

/** Half the angle of a sensor's view, in radians: a half sphere. */
const CONE = Math.PI / 2;

/*
 * Eight sensors, placed where the arm leads when it moves: both sides of the
 * upper arm and forearm for the turret swing, above and below the forearm,
 * the wrist out along the reach, and the gripper down onto what it reaches for.
 */
const SENSORS: Sensor[] = [
  {
    id: 'upper-left',
    link: 'upper',
    position: [SIDE + 0.085, 0, LINK.upper * 0.55],
    direction: [1, 0, 0],
  },
  {
    id: 'upper-right',
    link: 'upper',
    position: [SIDE - 0.085, 0, LINK.upper * 0.55],
    direction: [-1, 0, 0],
  },
  {
    id: 'fore-left',
    link: 'fore',
    position: [0.095, 0, LINK.fore * 0.5],
    direction: [1, 0, 0],
  },
  {
    id: 'fore-right',
    link: 'fore',
    position: [-0.095, 0, LINK.fore * 0.5],
    direction: [-1, 0, 0],
  },
  {
    id: 'fore-top',
    link: 'fore',
    position: [0, 0.095, LINK.fore * 0.3],
    direction: [0, 1, 0],
  },
  {
    id: 'fore-under',
    link: 'fore',
    position: [0, -0.085, LINK.fore * 0.7],
    direction: [0, -1, 0],
  },
  { id: 'wrist', link: 'wrist', position: [0, 0.09, 0], direction: [0, 1, 0] },
  {
    id: 'gripper',
    link: 'gripper',
    position: [0, 0, LINK.hand],
    direction: [0, 0, 1],
  },
];

/**
 * What each sensor sees with the arm posed at `joints`: for every sensor with
 * something in its cone and range, the ids of the boxes it sees. A box is
 * seen as soon as its nearest point is within range and inside the cone.
 */
const sense = (joints: Joints, boxes: Box[], range = RANGE) => {
  const linked = frames(joints);
  const seen = new Map<string, string[]>();

  for (const sensor of SENSORS) {
    const origin = place(linked[sensor.link], sensor.position);
    const look = aim(linked[sensor.link], sensor.direction);

    for (const { id, min, max } of boxes) {
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

export { CONE, RANGE, SENSORS, sense };
export type { Sensor };
