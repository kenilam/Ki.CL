import React from 'react';

// Components
import { SeekInput } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const Progress: React.FunctionComponent = () => {
  const {
    control: { duration, elapsed, seek },
  } = useTrackContext();

  return <SeekInput duration={duration} elapsed={elapsed} onSeek={seek} />;
};

export { Progress };
