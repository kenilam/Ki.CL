import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useFresh } from './use-fresh';

const FreshContext = createContext<ReturnType<typeof useFresh> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useFresh();

  return <FreshContext.Provider value={value}>{children}</FreshContext.Provider>;
};

const useFreshContext = () => {
  const value = useContext(FreshContext);

  if (value === null) {
    throw new Error('useFreshContext needs a Fresh context above it.');
  }

  return value;
};

export { Provider, useFreshContext };
