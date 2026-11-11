import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useNotices } from './use-notices';

const NoticesContext = createContext<ReturnType<typeof useNotices> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const notices = useNotices();

  return (
    <NoticesContext.Provider value={notices}>
      {children}
    </NoticesContext.Provider>
  );
};

const useNoticesContext = () => {
  const notices = useContext(NoticesContext);

  if (!notices) {
    throw new Error('useNoticesContext needs the notices Provider around it.');
  }

  return notices;
};

export { Provider, useNoticesContext };
