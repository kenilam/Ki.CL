import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { usePanel } from './use-panel';

const PanelContext = createContext<ReturnType<typeof usePanel> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const panel = usePanel();

  return (
    <PanelContext.Provider value={panel}>{children}</PanelContext.Provider>
  );
};

const usePanelContext = () => {
  const panel = useContext(PanelContext);

  if (!panel) {
    throw new Error('usePanelContext needs the panel Provider around it.');
  }

  return panel;
};

export { Provider, usePanelContext };
