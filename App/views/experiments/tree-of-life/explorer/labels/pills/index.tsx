import React, { useSyncExternalStore } from 'react';

// Store
import {
  getVersion,
  registry,
  subscribe,
} from '@/views/experiments/tree-of-life/explorer/label-store';

// Partials
import { Pill } from './pill';

const Pills: React.FunctionComponent = () => {
  // Re-render when labels are added or removed - never when they move.
  useSyncExternalStore(subscribe, getVersion, getVersion);

  return (
    <>
      {[...registry.keys()].map((key) => {
        return <Pill id={key} key={key} />;
      })}
    </>
  );
};

export { Pills };
