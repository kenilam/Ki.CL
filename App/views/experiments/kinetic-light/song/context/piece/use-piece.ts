import { useMemo } from 'react';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';
import { repairMusicXml } from '@/views/experiments/kinetic-light/read/repair';
import { readScore } from '@/views/experiments/kinetic-light/read/score';
import { readSong } from '@/views/experiments/kinetic-light/read/song';

// Song
import { useSongContext } from '@/views/experiments/kinetic-light/song/context/song';
import type { Song } from '@/views/experiments/kinetic-light/song/use-song';

// Hooks
import { useTitle } from './use-title';

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

const SILENCE: Piece = {
  beatsPerBar: 4,
  notes: [],
  source: 'notes',
  tempo: 120,
  title: '',
};

function usePiece() {
  const { song } = useSongContext();
  const { beatsPerBar, chords, midi, musicxml, source, status, tempo, title } =
    song ?? EMPTY;
  const { piece, score } = useMemo(() => {
    if (status !== 'READY') {
      return { piece: null, score: null };
    }

    const read = {
      beatsPerBar,
      chords,
      midi,
      musicxml: musicxml ? repairMusicXml(musicxml) : musicxml,
      source,
      tempo,
      title,
    };

    return { piece: readSong(read), score: readScore(read) };
  }, [beatsPerBar, chords, midi, musicxml, source, status, tempo, title]);

  useTitle(piece);

  return useMemo(() => {
    return { piece: piece ?? SILENCE, playable: Boolean(piece), score };
  }, [piece, score]);
}

export { usePiece };
