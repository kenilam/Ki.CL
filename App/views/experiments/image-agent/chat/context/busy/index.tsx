import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useBusy } from './use-busy';

const BusyContext = createContext<ReturnType<typeof useBusy> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useBusy();

  return <BusyContext.Provider value={value}>{children}</BusyContext.Provider>;
};

const useBusyContext = () => {
  const value = useContext(BusyContext);

  if (value === null) {
    throw new Error('useBusyContext needs a Busy context above it.');
  }

  return value;
};

export { Provider, useBusyContext };
