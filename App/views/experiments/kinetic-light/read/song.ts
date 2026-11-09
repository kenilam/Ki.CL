// API
import type { Kicl_KineticLightReadingQuery } from 'api/provider';

// Readers
import { readMidi } from './midi';
import { readMusicXml } from './musicxml';
import type { Piece } from './piece';
import { readSheet } from './sheet';

const fromBase64 = (data: string): ArrayBuffer =>
  Uint8Array.from(atob(data), (character) => character.charCodeAt(0)).buffer;

type Song = Pick<
  NonNullable<Kicl_KineticLightReadingQuery['kineticLightReading']>,
  'beatsPerBar' | 'chords' | 'midi' | 'musicxml' | 'source' | 'tempo' | 'title'
>;

const readSong = (song: Song): Piece | null => {
  if (song.midi) {
    return readMidi(fromBase64(song.midi), song.title);
  }

  if (song.source === 'FILE') {
    return song.musicxml ? readMusicXml(song.musicxml, song.title) : null;
  }

  return readSheet(song);
};

export { fromBase64, readSong, type Song };
