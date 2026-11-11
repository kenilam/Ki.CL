import React from 'react';

// Partials
import { useAttach } from './use-attach';

/** Attaches this run's cell to the setup, so the panel can reach it. */
const Attach: React.FunctionComponent = () => {
  useAttach();

  return null;
};

export { Attach };
