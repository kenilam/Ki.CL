import React from 'react';

// Partials
import { useSensors } from './use-sensors';

/**
 * Reads every sensor each frame. An obstacle any of them sees for the first
 * time joins what the arm knows, and `found` goes up once for the frame, so
 * the arm checks its way again once however many were found together.
 */
const Sensing: React.FunctionComponent = () => {
  useSensors();

  return null;
};

export { Sensing };
