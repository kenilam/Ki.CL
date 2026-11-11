import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useGenerate } from './use-generate';

const GenerateContext = createContext<ReturnType<typeof useGenerate> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useGenerate();

  return (
    <GenerateContext.Provider value={value}>
      {children}
    </GenerateContext.Provider>
  );
};

const useGenerateContext = () => {
  const value = useContext(GenerateContext);

  if (!value) {
    throw new Error('useGenerateContext needs a Generate context above it.');
  }

  return value;
};

export { Provider, useGenerateContext };
