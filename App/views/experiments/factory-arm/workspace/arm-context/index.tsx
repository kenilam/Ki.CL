import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useArm } from './use-arm';

const ArmContext = createContext<ReturnType<typeof useArm> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const arm = useArm();

  return <ArmContext.Provider value={arm}>{children}</ArmContext.Provider>;
};

const useArmContext = () => {
  const arm = useContext(ArmContext);

  if (!arm) {
    throw new Error('useArmContext needs the arm Provider around it.');
  }

  return arm;
};

export { Provider, useArmContext };
