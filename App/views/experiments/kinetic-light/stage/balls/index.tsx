import React, { useMemo } from 'react';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Partials
import { Ball } from './ball';

// Paths
import { toTracks } from './path';

const Balls: React.FunctionComponent = () => {
  const { playhead, sheet } = useStageContext();
  const tracks = useMemo(() => toTracks(sheet, playhead), [playhead, sheet]);

  return tracks.map((track, index) => (
    <Ball key={index} place={index / tracks.length} track={track} />
  ));
};

export { Balls };
