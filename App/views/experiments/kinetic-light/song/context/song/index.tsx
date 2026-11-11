import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useSong } from '@/views/experiments/kinetic-light/song/use-song';

const SongContext = createContext<ReturnType<typeof useSong> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useSong();

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};

const useSongContext = () => {
  const value = useContext(SongContext);

  if (!value) {
    throw new Error('useSongContext needs a Song context above it.');
  }

  return value;
};

export { Provider, useSongContext };
