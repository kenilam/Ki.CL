import React, { PropsWithChildren } from 'react';

// Hooks
import { useRig } from './use-rig';

const Rig: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const group = useRig();

  return <group ref={group}>{children}</group>;
};

export { Rig };
