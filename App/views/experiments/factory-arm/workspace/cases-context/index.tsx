import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useCases } from './use-cases';

const CasesContext = createContext<ReturnType<typeof useCases> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const cases = useCases();

  return (
    <CasesContext.Provider value={cases}>{children}</CasesContext.Provider>
  );
};

const useCasesContext = () => {
  const cases = useContext(CasesContext);

  if (!cases) {
    throw new Error('useCasesContext needs the cases Provider around it.');
  }

  return cases;
};

export { Provider, useCasesContext };
