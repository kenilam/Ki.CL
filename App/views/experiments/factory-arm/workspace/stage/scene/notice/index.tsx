import React from 'react';

// Context
import { useNoticesContext } from '@/views/experiments/factory-arm/workspace/notices-context';

// Partials
import { useFollow } from './use-follow';

/**
 * Where the badge over what the arm can't do sits, following it if it moves:
 * the gripper when the arm has stopped with no clear way forward or back, or
 * a case with no clear path.
 */
const Notice: React.FunctionComponent = () => {
  const { skipped, stopped } = useNoticesContext();
  const place = useFollow();

  if (!skipped && !stopped) {
    return null;
  }

  return <group ref={place} />;
};

export { Notice };
