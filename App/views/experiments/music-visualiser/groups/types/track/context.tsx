import React, { PropsWithChildren, useContext } from 'react';

// Catalog
import type { Track } from '@/views/experiments/music-visualiser/catalog';

// Hooks
import type { Control } from './use-audio';

type Value = {
  control: Control;
  /** The track after this one, drawn in advance so skip can be a link. */
  next: Track | null;
  /** The picture's canvas, for recording a clip of it. */
  stage: React.RefObject<HTMLCanvasElement | null>;
  track: Track;
};

const Context = React.createContext<Value | null>(null);

/** The track the URL names and its audio, for the parts over the picture. */
const TrackProvider: React.FunctionComponent<PropsWithChildren<Value>> = ({
  children,
  control,
  next,
  stage,
  track,
}) => (
  <Context.Provider value={{ control, next, stage, track }}>
    {children}
  </Context.Provider>
);

const useTrackContext = (): Value => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useTrackContext needs a TrackProvider above it.');
  }

  return value;
};

export { TrackProvider, useTrackContext };
