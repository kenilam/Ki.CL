// Piece
import { toPiece, type Note, type Piece } from './piece';

type Mark = { bar: number; beat: number; symbol: string };

type Chord = { bass: number; tones: number[] };

const SYMBOL = /^([A-G])([#b]?)([^/]*)(?:\/([A-G])([#b]?))?$/;
const LETTERS: Record<string, number> = {
  A: 9,
  B: 11,
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
};
const ACCIDENTALS: Record<string, number> = { '': 0, '#': 1, b: -1 };
const NO_CHORD = /^(n\.?\s*c\.?|%)$/i;
const BASS_FLOOR = 40;
const TONE_FLOOR = 55;
const MAX_TONES = 4;
const BASS_VELOCITY = 0.6;
const TONE_VELOCITY = 0.5;

const pitchClass = (letter: string, accidental: string): number =>
  (LETTERS[letter] + ACCIDENTALS[accidental] + 12) % 12;

const place = (value: number, floor: number): number =>
  floor + ((((value - floor) % 12) + 12) % 12);

const intervals = (quality: string): number[] => {
  const q = quality.replace(/[()]/g, '');
  const major7 = /maj|Δ|^M/.test(q);
  const minor = !major7 && /^(m|-|min)/.test(q);
  let chord = minor ? [0, 3, 7] : [0, 4, 7];

  if (/dim|°|^o/.test(q)) {
    chord = [0, 3, 6];
  }

  if (/ø|m7b5|-7b5/.test(q)) {
    chord = [0, 3, 6, 10];
  }

  if (/aug|\+|#5/.test(q)) {
    chord = [0, 4, 8];
  }

  if (/sus2/.test(q)) {
    chord = [0, 2, 7];
  } else if (/sus/.test(q)) {
    chord = [0, 5, 7];
  }

  const extended = [...chord];

  if (/6/.test(q) && !/b6/.test(q)) {
    extended.push(9);
  }

  if (/7|9|11|13/.test(q) && !/add/.test(q) && !extended.includes(10)) {
    let seventh = 10;

    if (major7) {
      seventh = 11;
    }

    if (/dim7|°7|o7/.test(q)) {
      seventh = 9;
    }

    extended.push(seventh);
  }

  if (/9/.test(q)) {
    let ninth = 2;

    if (/b9/.test(q)) {
      ninth = 1;
    }

    if (/#9/.test(q)) {
      ninth = 3;
    }

    extended.push(ninth);
  }

  return [...new Set(extended.map((step) => step % 12))];
};

const parseChord = (symbol: string): Chord | null => {
  const written = symbol
    .trim()
    .replace(/♯/g, '#')
    .replace(/♭/g, 'b')
    .replace(/−/g, '-');
  const match = written.match(SYMBOL);

  if (!match || NO_CHORD.test(written)) {
    return null;
  }

  const [, letter, accidental, quality, bassLetter, bassAccidental] = match;
  const root = pitchClass(letter, accidental);
  const steps = intervals(quality);
  const tones =
    steps.length > MAX_TONES ? steps.filter((step) => step !== 7) : steps;

  return {
    bass: bassLetter ? pitchClass(bassLetter, bassAccidental ?? '') : root,
    tones: tones.slice(0, MAX_TONES).map((step) => (root + step) % 12),
  };
};

const evenBars = (
  count: number,
  beatsPerBar: number,
  secondsPerBeat: number
): number[] =>
  Array.from(
    { length: count + 1 },
    (_, index) => index * beatsPerBar * secondsPerBeat
  );

const toChordNotes = (
  marks: readonly Mark[],
  bars: readonly number[],
  secondsPerBeat: number,
  loudness = 1
): Note[] => {
  const timed = marks
    .filter(({ bar }) => bar >= 1 && bar < bars.length)
    .map(({ bar, beat, symbol }) => ({
      chord: parseChord(symbol),
      end: bars[bar],
      start: bars[bar - 1] + (Math.max(1, beat) - 1) * secondsPerBeat,
    }))
    .sort((a, b) => a.start - b.start);

  return timed.flatMap(({ chord, end, start }, index) => {
    const duration = (timed[index + 1]?.start ?? end) - start;

    if (!chord || duration <= 0) {
      return [];
    }

    return [
      {
        duration,
        pitch: place(chord.bass, BASS_FLOOR),
        time: start,
        velocity: BASS_VELOCITY * loudness,
      },
      ...chord.tones.map((tone) => ({
        duration,
        pitch: place(tone, TONE_FLOOR),
        time: start,
        velocity: TONE_VELOCITY * loudness,
      })),
    ];
  });
};

const readChords = (reading: {
  beatsPerBar: number;
  chords: readonly Mark[];
  tempo: number;
  title: string;
}): Piece => {
  const secondsPerBeat = 60 / reading.tempo;
  const lastBar = Math.max(...reading.chords.map(({ bar }) => bar));

  return toPiece({
    beatsPerBar: reading.beatsPerBar,
    notes: toChordNotes(
      reading.chords,
      evenBars(lastBar, reading.beatsPerBar, secondsPerBeat),
      secondsPerBeat
    ),
    source: 'chords',
    tempo: Math.round(reading.tempo),
    title: reading.title,
  });
};

export { evenBars, parseChord, readChords, toChordNotes, type Mark };
