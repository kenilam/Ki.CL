import { useEffect, useMemo, useState } from 'react';

// Readers
import { lengthOf } from '@/views/experiments/kinetic-light/read/piece';

// Song
import { clock } from '@/views/experiments/kinetic-light/song/clock';
import { usePieceContext } from '@/views/experiments/kinetic-light/song/context';

// Context
import { useTransportContext } from '@/views/experiments/kinetic-light/song/player/context';

const TICK_MS = 250;

const useProgress = () => {
  const { piece } = usePieceContext();
  const { seek, status } = useTransportContext();
  const length = useMemo(() => Math.floor(lengthOf(piece)), [piece]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const read = () =>
      setElapsed(Math.min(length, Math.max(0, Math.floor(clock()))));

    read();

    if (status !== 'playing') {
      return;
    }

    const timer = window.setInterval(read, TICK_MS);

    return () => window.clearInterval(timer);
  }, [length, status]);

  const move = (seconds: number) => {
    seek(seconds);
    setElapsed(seconds);
  };

  return { elapsed, length, move, status };
};

export { useProgress };
