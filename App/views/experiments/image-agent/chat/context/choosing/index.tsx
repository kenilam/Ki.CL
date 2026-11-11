import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useChoosing } from './use-choosing';

const ChoosingContext = createContext<ReturnType<typeof useChoosing> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useChoosing();

  return <ChoosingContext.Provider value={value}>{children}</ChoosingContext.Provider>;
};

const useChoosingContext = () => {
  const value = useContext(ChoosingContext);

  if (value === null) {
    throw new Error('useChoosingContext needs a Choosing context above it.');
  }

  return value;
};

export { Provider, useChoosingContext };
