// Rig
import type { Rig } from './use-rig';

type Props = Pick<Rig, 'departed' | 'flying' | 'near' | 'travel'>;

/**
 * The near end of the pull-back, part-way through the flight from the taxon
 * being left. Resolved before the zoom blend, so a route change taken mid-zoom
 * still composes.
 */
const fly = ({ departed, flying, near, travel }: Props) => {
  const flight = travel.current;
  const arrived = flight >= 1 - 1e-4;
  const flown = flight * flight * (3 - 2 * flight);
  const pose = arrived ? near.current : flying.current;

  if (!arrived) {
    pose.target.copy(departed.current.target).lerp(near.current.target, flown);
    pose.bearing
      .copy(departed.current.bearing)
      .lerp(near.current.bearing, flown)
      .normalize();
    pose.distance =
      departed.current.distance +
      (near.current.distance - departed.current.distance) * flown;
  }

  return pose;
};

export { fly };
