import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { usePending } from './use-pending';

const PendingContext = createContext<ReturnType<typeof usePending> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const pending = usePending();

  return (
    <PendingContext.Provider value={pending}>
      {children}
    </PendingContext.Provider>
  );
};

const usePendingContext = () => {
  const pending = useContext(PendingContext);

  if (!pending) {
    throw new Error('usePendingContext needs the pending Provider around it.');
  }

  return pending;
};

export { Provider, usePendingContext };
