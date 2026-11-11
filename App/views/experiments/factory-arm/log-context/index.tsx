import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useLog } from './use-log';

const LogContext = createContext<ReturnType<typeof useLog> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const log = useLog();

  return <LogContext.Provider value={log}>{children}</LogContext.Provider>;
};

const useLogContext = () => {
  const log = useContext(LogContext);

  if (!log) {
    throw new Error('useLogContext needs the log Provider around it.');
  }

  return log;
};

export { Provider, useLogContext };
