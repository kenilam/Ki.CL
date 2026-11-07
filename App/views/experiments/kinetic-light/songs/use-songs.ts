import { useEffect } from 'react';

// API
import {
  Kicl_KineticLightExamplesDocument,
  Kicl_KineticLightSongsDocument,
  useQuery,
} from 'api/provider';

function useSongs(busy: boolean) {
  const examples = useQuery(Kicl_KineticLightExamplesDocument, {
    fetchPolicy: 'cache-first',
  });
  const songs = useQuery(Kicl_KineticLightSongsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const { refetch } = songs;

  useEffect(() => {
    if (!busy) {
      void refetch();
    }
  }, [busy, refetch]);

  return {
    examples: examples.data?.kineticLightExamples ?? [],
    songs: songs.data?.kineticLightSongs ?? [],
  };
}

export { useSongs };
