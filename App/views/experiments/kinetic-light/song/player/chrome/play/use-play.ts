import { useEffect, useRef } from 'react';

// Context
import {
  useArrangerContext,
  useTransportContext,
} from '@/views/experiments/kinetic-light/song/player/context';

const usePlay = () => {
  const { arranging } = useArrangerContext();
  const { pause, play, status } = useTransportContext();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status !== 'playing' && status !== 'paused') {
      return;
    }

    button.current?.focus({ focusVisible: true, preventScroll: true });
  }, [status]);

  return { arranging, button, pause, play, status };
};

export { usePlay };
