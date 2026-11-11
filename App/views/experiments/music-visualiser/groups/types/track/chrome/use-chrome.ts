// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Hooks
import { useIdle } from './use-idle';
import { useKeys } from './use-keys';

const useChrome = () => {
  const { control } = useTrackContext();
  const idle = useIdle(control.playing && !control.loading);

  useKeys();

  return idle;
};

export { useChrome };
