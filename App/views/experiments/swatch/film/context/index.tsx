import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type Value = {
  loading: boolean;
  muted: boolean;
  paused: boolean;
  setLoading: (loading: boolean) => void;
  setMuted: (muted: boolean) => void;
  setPaused: (paused: boolean) => void;
};

const FilmContext = createContext<Value | null>(null);

// Whether the film can play yet, and whether the visitor paused it and turned its sound on, shared by the film and the chip's buttons.
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const value = useMemo(
    () => ({ loading, muted, paused, setLoading, setMuted, setPaused }),
    [loading, muted, paused]
  );

  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
};

// Null outside a provider, as on the experiments page, where the film plays without sound.
const useFilm = () => {
  return useContext(FilmContext);
};

export { Provider, useFilm };
