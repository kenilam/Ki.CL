import React from 'react';

// Partials
import { Mount } from './mount';

// Constants
import {
  SENSORS,
  type Sensor,
} from '@/views/experiments/factory-arm/engine/sensors';

type Props = Pick<Sensor, 'link'>;

/** The sensors on one link, placed in that link's frame. */
const Mounts: React.FunctionComponent<Props> = ({ link }) => {
  return (
    <>
      {SENSORS.filter((sensor) => sensor.link === link).map(({ id }) => (
        <Mount id={id} key={id} />
      ))}
    </>
  );
};

export { Mounts };
