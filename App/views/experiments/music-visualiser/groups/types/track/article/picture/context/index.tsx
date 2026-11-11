import React, { PropsWithChildren } from 'react';

// Catalog
import { keyOf } from '@/views/experiments/music-visualiser/catalog';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';
import { Provider as Visualiser } from '@/views/experiments/music-visualiser/visualiser';

/** The picture answers to the track playing and hands its canvas to the clip. */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { analyser, control, setStage, track } = useTrackContext();

  return (
    <Visualiser
      analyser={analyser}
      onCanvas={setStage}
      playing={control.playing}
      track={keyOf(track)}
    >
      {children}
    </Visualiser>
  );
};

export { Provider };
