import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useCage } from './use-cage';

const GlobeContext = createContext<ReturnType<typeof useCage> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const cage = useCage();

  return <GlobeContext.Provider value={cage}>{children}</GlobeContext.Provider>;
};

const useGlobeContext = () => {
  const cage = useContext(GlobeContext);

  if (!cage) {
    throw new Error('useGlobeContext needs a Globe around it.');
  }

  return cage;
};

export { Provider, useGlobeContext };
