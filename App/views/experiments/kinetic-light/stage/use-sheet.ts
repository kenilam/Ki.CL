import { useEffect, useState } from 'react';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';
import type { Score } from '@/views/experiments/kinetic-light/read/score';

// Stage
import { engrave, type Sheet } from './engrave';

const useSheet = (score: Score | null, piece: Piece | null): Sheet | null => {
  const [engraved, setEngraved] = useState<{
    score: Score;
    sheet: Sheet | null;
  } | null>(null);

  useEffect(() => {
    if (!score || !piece) {
      return;
    }

    let current = true;

    engrave(score, piece.notes)
      .catch((error: unknown) => {
        console.error(error);

        return null;
      })
      .then((sheet) => {
        if (current) {
          setEngraved({ score, sheet });
        }
      });

    return () => {
      current = false;
    };
  }, [piece, score]);

  return engraved?.score === score ? engraved.sheet : null;
};

export { useSheet };
