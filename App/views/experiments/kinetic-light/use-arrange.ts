import { useCallback } from 'react';

// API
import {
  Kicl_KineticLightArrangeDocument,
  useMutation,
  type KineticLightOutline,
} from 'api/provider';

// Readers
import { toOutline } from '@/views/experiments/kinetic-light/read/outline';
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

// Context
import type { Song } from '@/views/experiments/kinetic-light/player/context';

const asked = new Map<string, Promise<unknown>>();

function useArrange() {
  const [mutate] = useMutation(Kicl_KineticLightArrangeDocument, {
    fetchPolicy: 'network-only',
  });

  return useCallback(
    (song: Pick<Song, 'id' | 'title'>, piece: Piece) => {
      const known = asked.get(song.id);

      if (known) {
        return known;
      }

      const outline = {
        ...toOutline(piece),
        title: (piece.title || song.title) as KineticLightOutline['title'],
      };
      const request = mutate({ variables: { id: song.id, outline } });

      asked.set(song.id, request);

      return request;
    },
    [mutate]
  );
}

export { useArrange };
