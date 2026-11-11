import React, { PropsWithChildren, useContext, useMemo } from 'react';

// Stage
import type { Sheet } from '@/views/experiments/kinetic-light/stage/engrave';
import { toPlayhead, widthOf, type Playhead, type Timing } from '@/views/experiments/kinetic-light/stage/playhead';
import type { Settings } from '@/views/experiments/kinetic-light/stage/settings';

type Value = {
  clock: () => number;
  playhead: Playhead;
  sections: readonly number[];
  settings: Settings;
  sheet: Sheet;
  timing: Timing;
};

const Context = React.createContext<Value | null>(null);

const StageProvider: React.FunctionComponent<
  PropsWithChildren<Omit<Value, 'playhead'>>
> = ({ children, clock, sections, settings, sheet, timing }) => {
  const playhead = useMemo(
    () => toPlayhead(sheet.heads, timing, widthOf(sheet)),
    [sheet, timing]
  );

  return (
    <Context.Provider
      value={{ clock, playhead, sections, settings, sheet, timing }}
    >
      {children}
    </Context.Provider>
  );
};

const useStageContext = (): Value => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useStageContext needs a StageProvider above it.');
  }

  return value;
};

export { StageProvider, useStageContext };
