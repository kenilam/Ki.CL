import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useArrangement, type Arranger } from './use-arrangement';

const ArrangerContext = createContext<Arranger | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useArrangement();

  return (
    <ArrangerContext.Provider value={value}>
      {children}
    </ArrangerContext.Provider>
  );
};

const useArrangerContext = () => {
  const value = useContext(ArrangerContext);

  if (!value) {
    throw new Error('useArrangerContext needs an Arranger context above it.');
  }

  return value;
};

export { Provider, useArrangerContext };
