import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';

// Constants
import { CLASS_NAME } from '@/views/experiments/music-visualiser/visualiser/constants';

type Value = {
  analyser: AnalyserNode | null;
  /** Told the canvas, for whoever records it. */
  onCanvas?(canvas: HTMLCanvasElement | null): void;
  playing: boolean;
  /** Changes when the track does. */
  track: string | null;
};

const IDLE: Value = {
  analyser: null,
  playing: false,
  track: CLASS_NAME,
};

/** What the picture answers to. With no provider it draws its idle scene. */
const VisualiserContext = createContext<Value>(IDLE);

const Provider: React.FunctionComponent<PropsWithChildren<Value>> = ({
  analyser,
  children,
  onCanvas,
  playing,
  track,
}) => {
  const value = useMemo(() => {
    return { analyser, onCanvas, playing, track };
  }, [analyser, onCanvas, playing, track]);

  return (
    <VisualiserContext.Provider value={value}>
      {children}
    </VisualiserContext.Provider>
  );
};

const useVisualiserContext = () => {
  return useContext(VisualiserContext);
};

export { Provider, useVisualiserContext };
