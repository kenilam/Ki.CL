// API
import type { Kicl_KineticLightReadingQuery } from 'api/provider';

// Piece
import type { Style } from './beat';
import { barOf, type Note, type Piece } from './piece';

type Arrangement = NonNullable<
  NonNullable<
    Kicl_KineticLightReadingQuery['kineticLightReading']
  >['arrangement']
>;

type Pattern = NonNullable<Arrangement['sections'][number]['pattern']>;

const CLAP = 39;
const CRASH = 49;
const ACCENT = { X: 1, x: 0.7 };

const DRUMS = {
  highTom: 50,
  hat: 42,
  kick: 36,
  lowTom: 41,
  openHat: 46,
  ride: 51,
  snare: 38,
};

const soundOf = (drum: keyof typeof DRUMS, style: Style) => {
  if (style === 'machine' && drum === 'snare') {
    return CLAP;
  }

  return DRUMS[drum];
};

const toArrangedBeat = (
  piece: Piece,
  arrangement: Pick<Arrangement, 'sections' | 'steps'>,
  length: number,
  style: Style
): Note[] => {
  if (!piece.notes.length) {
    return [];
  }

  const bar = barOf(piece);
  const step = bar / (arrangement.steps * piece.beatsPerBar);
  const loudness =
    piece.notes.reduce((sum, { velocity }) => sum + velocity, 0) /
    piece.notes.length;
  const bars = Math.round(length / bar);
  const hit = (pitch: number, time: number, accent: number): Note => ({
    duration: step,
    pitch,
    time,
    velocity: accent * loudness,
  });

  return Array.from({ length: bars }, (_, index) => {
    const number = index + 1;
    const start = index * bar;
    const section = arrangement.sections.find(
      ({ from, to }) => number >= from && number <= to
    );

    if (!section) {
      return [];
    }

    const pattern: Pattern | null | undefined =
      number === section.to && section.fill ? section.fill : section.pattern;
    const crash =
      section.crash && number === section.from
        ? [hit(CRASH, start, ACCENT.X)]
        : [];

    if (!pattern) {
      return crash;
    }

    const drums = (Object.keys(DRUMS) as (keyof typeof DRUMS)[]).flatMap(
      (drum) =>
        [...pattern[drum]].flatMap((mark, position) =>
          mark === 'X' || mark === 'x'
            ? [hit(soundOf(drum, style), start + position * step, ACCENT[mark])]
            : []
        )
    );

    return [...crash, ...drums];
  }).flat();
};

export { toArrangedBeat, type Arrangement };
