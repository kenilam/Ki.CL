import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useSelection } from './use-selection';

const SelectionContext = createContext<ReturnType<typeof useSelection> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const selection = useSelection();

  return (
    <SelectionContext.Provider value={selection}>
      {children}
    </SelectionContext.Provider>
  );
};

const useSelectionContext = () => {
  const selection = useContext(SelectionContext);

  if (!selection) {
    throw new Error(
      'useSelectionContext needs the selection Provider around it.'
    );
  }

  return selection;
};

export { Provider, useSelectionContext };
