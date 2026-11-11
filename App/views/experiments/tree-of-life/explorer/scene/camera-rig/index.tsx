import React from 'react';

// Hooks
import { useFraming } from './use-framing';
import { useInput } from './use-input';
import { useRig } from './use-rig';

/**
 * Frames the taxon the route is on, and the pull-back from it. The whole pose
 * is a function of one number, how far out the view is, so the move can't
 * come apart into a dolly and a separate turn the way an orbit controller's
 * damping does.
 */
const CameraRig: React.FunctionComponent = () => {
  const rig = useRig();

  useInput(rig);
  useFraming(rig);

  return null;
};

export { CameraRig };
