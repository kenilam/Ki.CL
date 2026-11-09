import React, { useContext } from 'react';

// Stage
import type { Sheet } from './engrave';
import type { Timing } from './playhead';
import type { Settings } from './settings';

type Value = {
  clock: () => number;
  sections: readonly number[];
  settings: Settings;
  sheet: Sheet;
  timing: Timing;
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
