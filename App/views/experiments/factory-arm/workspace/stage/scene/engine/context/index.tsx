import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useEngine } from './use-engine';

const EngineContext = createContext<ReturnType<typeof useEngine> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const engine = useEngine();

  return (
    <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
  );
};

const useEngineContext = () => {
  const engine = useContext(EngineContext);

  if (!engine) {
    throw new Error('useEngineContext needs the engine Provider around it.');
  }

  return engine;
};

export { Provider, useEngineContext };
