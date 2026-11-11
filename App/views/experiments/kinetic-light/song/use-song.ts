import { useMemo } from 'react';

// API
import {
  Kicl_KineticLightReadingDocument,
  useQuery,
  type Kicl_KineticLightReadingQuery,
} from 'api/provider';

// Routes
import { useParams } from 'design/router';

// Constants
import type { PARAM } from '@/views/experiments/kinetic-light/constants';

type Song = NonNullable<Kicl_KineticLightReadingQuery['kineticLightReading']>;

function useSong() {
  const { id = '' } = useParams<typeof PARAM>();
  const { data, loading, previousData } = useQuery(
    Kicl_KineticLightReadingDocument,
    { fetchPolicy: 'cache-first', variables: { id } }
  );
  const song = (data ?? previousData)?.kineticLightReading ?? undefined;

  return useMemo(() => {
    return { loading, song };
  }, [loading, song]);
}

export { useSong, type Song };
