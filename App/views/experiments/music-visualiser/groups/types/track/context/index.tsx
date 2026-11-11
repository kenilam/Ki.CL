import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react';

// Routes
import { Navigate, useParams } from 'design/router';

// Catalog
import type { Track } from '@/views/experiments/music-visualiser/catalog';

// Hooks
import type { Control } from '@/views/experiments/music-visualiser/groups/types/track/audio';
import { useAudio } from '@/views/experiments/music-visualiser/groups/types/track/use-audio';

// Constants
import { PARAMS, toPath } from '@/views/experiments/music-visualiser/constants';

type Value = {
  analyser: AnalyserNode | null;
  control: Control;
  /** The track after this one, drawn in advance so skip can be a link. */
  next: Track | null;
  /** Told the picture's canvas, for whoever records it. */
  setStage: (canvas: HTMLCanvasElement | null) => void;
  /** The picture's canvas, for recording a clip of it. */
  stage: React.RefObject<HTMLCanvasElement | null>;
  track: Track;
};

/** The track the URL names and its audio, for the parts over the picture. */
const TrackContext = createContext<Value | null>(null);

/** An id the catalogue does not have goes back to its type, which draws one. */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { analyser, control, next, track } = useAudio();
  const { [PARAMS.group]: group, [PARAMS.type]: type } = useParams();
  const stage = useRef<HTMLCanvasElement | null>(null);
  const setStage = useCallback((canvas: HTMLCanvasElement | null) => {
    stage.current = canvas;
  }, []);

  if (!track) {
    return <Navigate to={toPath({ group, type })} replace />;
  }

  return (
    <TrackContext.Provider
      value={{ analyser, control, next, setStage, stage, track }}
    >
      {children}
    </TrackContext.Provider>
  );
};

const useTrackContext = (): Value => {
  const value = useContext(TrackContext);

  if (!value) {
    throw new Error('useTrackContext needs a TrackContext above it.');
  }

  return value;
};

export { Provider, useTrackContext };
