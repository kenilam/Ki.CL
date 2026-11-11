import React from 'react';

// Hooks
import { useFog } from './use-fog';

/**
 * Every taxon is the same few pixels wherever it sits, so size says nothing
 * about depth. Fog toward a cool tone lets colour say it instead.
 */
const Depth: React.FunctionComponent = () => {
  useFog();

  return null;
};

export { Depth };
