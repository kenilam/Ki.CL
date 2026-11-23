// API
import type { Kicl_SwatchQuery } from 'api/client';

type Tone = NonNullable<NonNullable<Kicl_SwatchQuery['swatch']>['tone']>;

const MODES = {
  DORIAN: [0, 2, 3, 5, 7, 9, 10],
  LYDIAN: [0, 2, 4, 6, 7, 9, 11],
  MAJOR: [0, 2, 4, 5, 7, 9, 11],
  MINOR: [0, 2, 3, 5, 7, 8, 10],
  MIXOLYDIAN: [0, 2, 4, 5, 7, 9, 10],
  PHRYGIAN: [0, 1, 3, 5, 7, 8, 10],
};

// Scale degrees from 0: the home chord, then its relative, the fourth and the fifth.
const PROGRESSION = [0, 5, 3, 4];

const CHORD = [0, 2, 4, 6];

const pitchOf = ({ mode, root }: Tone, degree: number) => {
  const scale = MODES[mode];
  const step = ((degree % scale.length) + scale.length) % scale.length;

  return root + scale[step] + 12 * Math.floor(degree / scale.length);
};

const chordOf = (tone: Tone, index: number) => {
  const degree = PROGRESSION[index % PROGRESSION.length];

  return CHORD.map((step) => pitchOf(tone, degree + step));
};

const melodyOf = (tone: Tone) =>
  pitchOf(tone, 7 + Math.floor(Math.random() * 9));

export { chordOf, melodyOf, type Tone };
