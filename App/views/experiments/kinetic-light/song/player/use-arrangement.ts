import { useEffect, useState } from 'react';

// Hooks
import { useArrange } from '@/views/experiments/kinetic-light/use-arrange';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

// Song
import type { Song } from '@/views/experiments/kinetic-light/song/use-song';

type Arranger = { arranging: boolean; error: Error | null };

const useArrangement = (song: Song | undefined, piece: Piece): Arranger => {
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

  return { arranging: due && !error, error };
};

export { useArrangement, type Arranger };
