import React, { PropsWithChildren } from 'react';

// Readers
import { readNotesScore } from '@/views/experiments/kinetic-light/read/score';

// Stage
import { StageProvider } from '@/views/experiments/kinetic-light/stage/context';
import { DEFAULT_SETTINGS } from '@/views/experiments/kinetic-light/stage/settings';
import { useSheet } from '@/views/experiments/kinetic-light/stage/use-sheet';

// Hooks
import { useClock } from './use-clock';

// Constants
import {
  END_HOLD_SECONDS,
  REPLAY_LEAD_SECONDS,
} from '@/views/experiments/kinetic-light/constants';
import {
  LENGTH,
  PIECE,
} from '@/views/experiments/kinetic-light/backdrop/interstellar';

const SCORE = readNotesScore(PIECE);

const SECTIONS: number[] = [];

const TIMING = {
  descent: REPLAY_LEAD_SECONDS,
  hold: END_HOLD_SECONDS,
  length: LENGTH,
};

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const clock = useClock();
  const sheet = useSheet(SCORE, PIECE);

  if (!sheet) {
    return null;
  }

  return (
    <StageProvider
      clock={clock}
      sections={SECTIONS}
      settings={DEFAULT_SETTINGS}
      sheet={sheet}
      timing={TIMING}
    >
      {children}
    </StageProvider>
  );
};

export { Provider };
