import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useCell } from './use-cell';

const CellContext = createContext<ReturnType<typeof useCell> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const cell = useCell();

  return <CellContext.Provider value={cell}>{children}</CellContext.Provider>;
};

const useCellContext = () => {
  const cell = useContext(CellContext);

  if (!cell) {
    throw new Error('useCellContext needs the cell Provider around it.');
  }

  return cell;
};

export { Provider, useCellContext };
