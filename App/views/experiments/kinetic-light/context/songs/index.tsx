import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useSongs } from './use-songs';

const SongsContext = createContext<ReturnType<typeof useSongs> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useSongs();

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
  );
};

const useSongsContext = () => {
  const value = useContext(SongsContext);

  if (!value) {
    throw new Error('useSongsContext needs a Songs context above it.');
  }

  return value;
};

export { Provider, useSongsContext };
