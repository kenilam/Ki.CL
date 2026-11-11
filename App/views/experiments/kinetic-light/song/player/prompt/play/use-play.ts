import { useEffect, useRef } from 'react';

// Context
import {
  useArrangerContext,
  useTransportContext,
} from '@/views/experiments/kinetic-light/song/player/context';

const usePlay = () => {
  const { arranging } = useArrangerContext();
  const { play, status } = useTransportContext();
  const button = useRef<HTMLButtonElement>(null);
  const busy = status === 'loading' || arranging;

  useEffect(() => {
    if (busy) {
      return;
    }

    button.current?.focus({ focusVisible: true, preventScroll: true });
  }, [busy]);

  return { busy, button, play, status };
};

export { usePlay };
