// API
import type { SwatchTimbre } from 'api/provider';

type Tone = typeof import('tone');

type Wave = 'fatsawtooth' | 'fatsine' | 'fattriangle';

const voicesOf = (Tone: Tone, timbre: SwatchTimbre) => {
  const pad = (type: Wave, attack: number) => {
    return new Tone.PolySynth(Tone.Synth, {
      envelope: { attack, decay: 2, release: attack * 2, sustain: 0.8 },
      oscillator: { count: 3, spread: 18, type },
    });
  };

  const pluck = (
    harmonicity: number,
    modulationIndex: number,
    decay: number
  ) => {
    return new Tone.PolySynth(Tone.FMSynth, {
      envelope: { attack: 0.005, decay, release: decay, sustain: 0 },
      harmonicity,
      modulationEnvelope: {
        attack: 0.002,
        decay: decay / 2,
        release: decay,
        sustain: 0,
      },
      modulationIndex,
    });
  };

  const VOICES = {
    AIR: () => ({
      bed: pad('fatsine', 5),
      breath: true,
      melody: pluck(1, 0.5, 3),
    }),
    BELL: () => ({
      bed: pad('fattriangle', 4),
      breath: false,
      melody: pluck(3.01, 10, 4),
    }),
    DRONE: () => ({
      bed: pad('fattriangle', 7),
      breath: false,
      melody: pluck(1, 1, 5),
    }),
    GLASS: () => ({
      bed: pad('fatsine', 3),
      breath: false,
      melody: pluck(2, 2.5, 2.5),
    }),
    PAD: () => ({
      bed: pad('fatsawtooth', 4),
      breath: false,
      melody: pluck(1, 1.5, 2),
    }),
  };

  return VOICES[timbre]();
};

export { voicesOf };
