import React, { useContext } from 'react';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

type Settings = {
  glow: number;
  hue: number;
  speed: number;
};

type Value = {
  clock: () => number;
  length: number;
  piece: Piece;
  settings: React.RefObject<Settings>;
};

const Context = React.createContext<Value | null>(null);

const useStageContext = (): Value => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useStageContext needs a StageContext above it.');
  }

  return value;
};

export { Context as StageContext, useStageContext, type Settings };
