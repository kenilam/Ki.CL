import { useEffect, useMemo } from 'react';

// API
import {
  Kicl_KineticLightExamplesDocument,
  Kicl_KineticLightSongsDocument,
  useQuery,
} from 'api/provider';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context/generate';

function useSongs() {
  const { busy } = useGenerateContext();
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

  return useMemo(() => {
    return {
      examples: examples.data?.kineticLightExamples ?? [],
      songs: songs.data?.kineticLightSongs ?? [],
    };
  }, [examples.data, songs.data]);
}

export { useSongs };
