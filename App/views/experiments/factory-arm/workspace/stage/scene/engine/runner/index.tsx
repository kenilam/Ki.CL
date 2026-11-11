import React from 'react';

// Partials
import { useDrive } from './use-drive';

/**
 * Drives the arm from the conductor each frame, and tells the cell what
 * happened: steps for the log, cases refused, obstacles to light.
 *
 * The conductor plans against what the arm knows of the cell: what the
 * overhead camera saw, and what the sensors have found since.
 */
const Runner: React.FunctionComponent = () => {
  useDrive();

  return null;
};

export { Runner };
