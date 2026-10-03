// Constants
import {
  LINK,
  SIDE,
} from '@/views/experiments/factory-arm/scene/arm/constants';

type Vector = [number, number, number];

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

/**
 * How far a sensor sees, in metres. Short enough to keep its view compact,
 * long enough that the arm finds an obstacle about 30 cm before it would come
 * within its safety margin; at 0.3 m it met the crate before seeing it.
 */
const RANGE = 0.5;

/**
 * Half the angle of a sensor's view, in radians: a half sphere, like the
 * proximity skins fitted to arms that work near people.
 */
const CONE = Math.PI / 2;

/*
 * Eight sensors, placed where the arm leads when it moves. The turret swing
 * moves the arm sideways, so the upper arm and forearm watch both sides; the
 * forearm also watches above and below, the wrist looks out along the reach,
 * and the gripper looks down onto what it's about to reach.
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

export { CONE, RANGE, SENSORS };
export type { Sensor };
