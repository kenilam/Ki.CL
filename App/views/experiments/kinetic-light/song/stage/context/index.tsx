import React, { PropsWithChildren, useMemo } from 'react';

// Readers
import { lengthOf } from '@/views/experiments/kinetic-light/read/piece';

// Song
import { clock, playing } from '@/views/experiments/kinetic-light/song/clock';
import {
  usePieceContext,
  useSongContext,
} from '@/views/experiments/kinetic-light/song/context';
import { settingsOf } from '@/views/experiments/kinetic-light/song/settings';

// Stage
import { StageProvider } from '@/views/experiments/kinetic-light/stage/context';
import { ease, unwrap } from '@/views/experiments/kinetic-light/stage/playhead';
import { useSheet } from '@/views/experiments/kinetic-light/stage/use-sheet';

// Constants
import {
  END_HOLD_SECONDS,
  REPLAY_LEAD_SECONDS,
} from '@/views/experiments/kinetic-light/constants';

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { piece, score } = usePieceContext();
  const arrangement = useSongContext().song?.arrangement;
  const settings = useMemo(() => {
    return settingsOf(arrangement);
  }, [arrangement]);
  const sections = useMemo(() => {
    return (
      arrangement?.sections.map(({ from }) => {
        return from;
      }) ?? []
    );
  }, [arrangement]);
  const sheet = useSheet(score, piece);
  const timing = useMemo(() => {
    return {
      descent: REPLAY_LEAD_SECONDS,
      hold: END_HOLD_SECONDS,
      length: lengthOf(piece),
    };
  }, [piece]);
  const looped = useMemo(() => {
    return ease(unwrap(clock, timing), playing);
  }, [timing]);

  if (!sheet) {
    return null;
  }

  return (
    <StageProvider
      clock={looped}
      sections={sections}
      settings={settings}
      sheet={sheet}
      timing={timing}
    >
      {children}
    </StageProvider>
  );
};

export { Provider };
