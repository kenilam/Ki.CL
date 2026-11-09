import React, { useMemo } from 'react';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import {
  toPlayhead,
  widthOf,
} from '@/views/experiments/kinetic-light/stage/playhead';

// Partials
import { Ball } from './ball';

// Paths
import { toTracks } from './path';

const Balls: React.FunctionComponent = () => {
  const { sheet, timing } = useStageContext();
  const playhead = useMemo(
    () => toPlayhead(sheet.heads, timing, widthOf(sheet)),
    [sheet, timing]
  );
  const tracks = useMemo(() => toTracks(sheet, playhead), [playhead, sheet]);

  return tracks.map((track, index) => (
    <Ball
      key={index}
      place={index / tracks.length}
      playhead={playhead}
      track={track}
    />
  ));
};

export { Balls };
