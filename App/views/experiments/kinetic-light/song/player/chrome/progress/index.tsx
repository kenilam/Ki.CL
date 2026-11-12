import React from 'react';

// Components
import { SeekInput } from 'design/components';

// Hooks
import { useProgress } from './use-progress';

const Progress: React.FunctionComponent = () => {
  const { elapsed, length, move, status } = useProgress();

  return (
    <SeekInput
      disabled={status === 'idle' || status === 'loading'}
      duration={length}
      elapsed={elapsed}
      onSeek={move}
    />
  );
};

export { Progress };
