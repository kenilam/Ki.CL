// Libraries
import { Midi } from '@tonejs/midi';

// Piece
import { toPiece, type Piece } from './piece';

const PERCUSSION_CHANNEL = 9;
const DEFAULT_TEMPO = 120;

const DRUM_KIT: Record<number, number> = {
  35: 36,
  36: 36,
  37: 38,
  38: 38,
  39: 38,
  40: 38,
  41: 41,
  42: 42,
  43: 41,
  44: 42,
  45: 41,
  46: 46,
  47: 50,
  48: 50,
  49: 49,
  50: 50,
  51: 51,
  52: 49,
  53: 51,
  55: 49,
  57: 49,
  59: 51,
};

const readMidi = (bytes: ArrayBuffer, title: string): Piece => {
  const midi = new Midi(bytes);
  const [numerator = 4, denominator = 4] =
    midi.header.timeSignatures[0]?.timeSignature ?? [];

  return toPiece({
    beatsPerBar: Math.max(1, Math.round((numerator * 4) / denominator)),
    drums: midi.tracks
      .filter(({ channel }) => channel === PERCUSSION_CHANNEL)
      .flatMap(({ notes }) =>
        notes
          .filter(({ midi: pitch }) => pitch in DRUM_KIT)
          .map(({ duration, midi: pitch, time, velocity }) => ({
            duration,
            pitch: DRUM_KIT[pitch],
            time,
            velocity,
          }))
      ),
    notes: midi.tracks
      .filter(({ channel }) => channel !== PERCUSSION_CHANNEL)
      .flatMap(({ notes }) =>
        notes.map(({ duration, midi: pitch, time, velocity }) => ({
          duration,
          pitch,
          time,
          velocity,
        }))
      ),
    source: 'notes',
    tempo: Math.round(midi.header.tempos[0]?.bpm ?? DEFAULT_TEMPO),
    title: midi.name.trim() || title,
  });
};

export { readMidi };
