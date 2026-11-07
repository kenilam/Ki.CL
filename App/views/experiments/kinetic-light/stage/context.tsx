import React, { useContext } from 'react';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

// Settings
import type { Settings } from './settings';

type Value = {
  clock: () => number;
  length: number;
  piece: Piece;
  settings: Settings;
};

const Context = React.createContext<Value | null>(null);

const useStageContext = (): Value => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useStageContext needs a StageContext above it.');
  }

  return value;
};

export { Context as StageContext, useStageContext };
