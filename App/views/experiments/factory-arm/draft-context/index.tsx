import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { useDraft } from './use-draft';

const DraftContext = createContext<ReturnType<typeof useDraft> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const draft = useDraft();

  return (
    <DraftContext.Provider value={draft}>{children}</DraftContext.Provider>
  );
};

const useDraftContext = () => {
  const draft = useContext(DraftContext);

  if (!draft) {
    throw new Error('useDraftContext needs the draft Provider around it.');
  }

  return draft;
};

export { Provider, useDraftContext };
