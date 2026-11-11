import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useRun } from './use-run';

const RunContext = createContext<ReturnType<typeof useRun> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const run = useRun();

  return <RunContext.Provider value={run}>{children}</RunContext.Provider>;
};

const useRunContext = () => {
  const run = useContext(RunContext);

  if (!run) {
    throw new Error('useRunContext needs the run Provider around it.');
  }

  return run;
};

export { Provider, useRunContext };
