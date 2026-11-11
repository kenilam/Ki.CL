import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useApplied } from './use-applied';

const AppliedContext = createContext<ReturnType<typeof useApplied> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const applied = useApplied();

  return (
    <AppliedContext.Provider value={applied}>
      {children}
    </AppliedContext.Provider>
  );
};

const useAppliedContext = () => {
  const applied = useContext(AppliedContext);

  if (!applied) {
    throw new Error('useAppliedContext needs the applied Provider around it.');
  }

  return applied;
};

export { Provider, useAppliedContext };
