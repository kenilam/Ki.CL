import { useMemo } from 'react';

// API
import {
  Kicl_KineticLightReadingDocument,
  useQuery,
  type Kicl_KineticLightReadingQuery,
} from 'api/provider';

// Routes
import { useParams } from 'design/router';

// Readers
import { readSong } from '@/views/experiments/kinetic-light/read/song';

// Constants
import type { PARAM } from '@/views/experiments/kinetic-light/constants';

type Song = NonNullable<Kicl_KineticLightReadingQuery['kineticLightReading']>;

const EMPTY: Pick<
  Song,
  | 'beatsPerBar'
  | 'chords'
  | 'midi'
  | 'musicxml'
  | 'source'
  | 'status'
  | 'tempo'
  | 'title'
> = {
  beatsPerBar: null,
  chords: [],
  midi: null,
  musicxml: null,
  source: 'FILE',
  status: 'READING',
  tempo: null,
  title: '',
};

function useSong() {
  const { id = '' } = useParams<typeof PARAM>();
  const { data, loading, previousData } = useQuery(
    Kicl_KineticLightReadingDocument,
    { fetchPolicy: 'cache-first', variables: { id } }
  );
  const song = (data ?? previousData)?.kineticLightReading ?? undefined;
  const { beatsPerBar, chords, midi, musicxml, source, status, tempo, title } =
    song ?? EMPTY;
  const piece = useMemo(
    () =>
      status === 'READY'
        ? readSong({
            beatsPerBar,
            chords,
            midi,
            musicxml,
            source,
            tempo,
            title,
          })
        : null,
    [beatsPerBar, chords, midi, musicxml, source, status, tempo, title]
  );

  return { loading, piece, song };
}

export { useSong, type Song };
