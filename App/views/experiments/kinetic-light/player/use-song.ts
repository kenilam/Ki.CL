import { useEffect, useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

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
import { PATH as EXPERIMENTS } from '@/views/experiments/constants';
import { PATH, type PARAM } from '@/views/experiments/kinetic-light/constants';

const EMPTY: Pick<
  NonNullable<Kicl_KineticLightReadingQuery['kineticLightReading']>,
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
  const { t } = useTranslation();
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

  useEffect(() => {
    if (!piece) {
      return;
    }

    document.title = t('document_title', {
      routes: [EXPERIMENTS, PATH, piece.title].join(' | '),
    });
  }, [piece, t]);

  return { loading, piece, song };
}

export { useSong };
