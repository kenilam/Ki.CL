// Piece
import type { Note, Piece } from './piece';

type Style = 'kit' | 'lofi' | 'linndrum' | 'machine' | 'percussion';

const KICK = 36;
const SNARE = 38;
const CLAP = 39;
const HAT = 42;
const OPEN_HAT = 46;
const HIGH_BONGO = 51;
const CRASH = 49;
const BASS = 60;
const TOLERANCE = 0.05;
const FIT = 0.9;
const STEPS = [2, 3, 4];

const fits = (beats: number[], steps: number): boolean => {
  const near = beats.filter(
    (beat) =>
      Math.abs(beat * steps - Math.round(beat * steps)) < TOLERANCE * steps
  );

  return near.length >= beats.length * FIT;
};

const stepsOf = (piece: Piece): number => {
  const beats = piece.notes.map(({ time }) => (time * piece.tempo) / 60);

  return STEPS.find((candidate) => fits(beats, candidate)) ?? STEPS[0];
};

const toBeat = (piece: Piece, length: number, style: Style): Note[] => {
  if (!piece.notes.length) {
    return [];
  }

  const seconds = 60 / piece.tempo;
  const steps = stepsOf(piece);
  const step = seconds / steps;
  const loudness =
    piece.notes.reduce((sum, { velocity }) => sum + velocity, 0) /
    piece.notes.length;
  const bass = new Set(
    piece.notes
      .filter(({ duration, pitch }) => pitch < BASS && duration >= seconds)
      .map(({ time }) => Math.round(time / step))
  );

  return Array.from({ length: Math.round(length / step) }, (_, index) => {
    const onBeat = index % steps === 0;
    const beatInBar = Math.floor(index / steps) % piece.beatsPerBar;
    const backbeat = onBeat && beatInBar % 2 === 1;
    const kick = (onBeat && beatInBar === 0) || bass.has(index);
    const offbeat = index % steps === (steps === 3 ? 2 : steps / 2);
    const crash = index === 0 ? { accent: 0.8, pitch: CRASH } : null;
    const kit = [
      { accent: onBeat ? 0.6 : 0.4, pitch: HAT },
      backbeat ? { accent: 0.9, pitch: SNARE } : null,
      kick && !backbeat ? { accent: 1, pitch: KICK } : null,
      crash,
    ];
    const hits = {
      kit,
      linndrum: kit,
      lofi: kit,
      machine: [
        offbeat
          ? { accent: 0.6, pitch: OPEN_HAT }
          : { accent: onBeat ? 0.5 : 0.35, pitch: HAT },
        backbeat ? { accent: 0.9, pitch: CLAP } : null,
        onBeat ? { accent: 1, pitch: KICK } : null,
        crash,
      ],
      percussion: [
        { accent: onBeat ? 0.5 : 0.3, pitch: HAT },
        offbeat ? { accent: 0.4, pitch: HIGH_BONGO } : null,
        backbeat ? { accent: 0.8, pitch: SNARE } : null,
        kick && !backbeat ? { accent: 0.9, pitch: KICK } : null,
        crash,
      ],
    }[style];

    return hits
      .filter((hit) => hit !== null)
      .map(({ accent, pitch }) => ({
        duration: step,
        pitch,
        time: index * step,
        velocity: accent * loudness,
      }));
  }).flat();
};

export { BASS, stepsOf, toBeat, type Style };
