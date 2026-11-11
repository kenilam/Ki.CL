import { useEffect, useMemo, useState } from 'react';

// Hooks
import { useArrange } from '@/views/experiments/kinetic-light/use-arrange';

// Song
import {
  usePieceContext,
  useSongContext,
} from '@/views/experiments/kinetic-light/song/context';

type Arranger = { arranging: boolean; error: Error | null };

const useArrangement = (): Arranger => {
  const { song } = useSongContext();
  const { piece } = usePieceContext();
  const arrange = useArrange();
  const [error, setError] = useState<Error | null>(null);
  const [source, setSource] = useState(song);

  if (source !== song) {
    setSource(song);
    setError(null);
  }

  const due = Boolean(song?.mine && !song.arrangement);

  useEffect(() => {
    if (!song || !due) {
      return;
    }

    arrange(song, piece).catch((caught: Error) => setError(caught));
  }, [arrange, due, piece, song]);

  return useMemo(() => {
    return { arranging: due && !error, error };
  }, [due, error]);
};

export { useArrangement, type Arranger };
