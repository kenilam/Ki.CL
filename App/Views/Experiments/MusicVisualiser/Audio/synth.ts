import type {
  SynthSource,
  VibeFamily,
} from '@/Views/Experiments/MusicVisualiser/Spec';

/*
 * The built-in station: music the browser makes for itself.
 *
 * It exists so the visualiser works with no network at all - on a plane, in
 * a locked-down container, or when every provider is down - and so the
 * visuals can be checked against a signal whose shape is known. It is not a
 * stand-in for the catalogue; it is the last station on the dial.
 *
 * Everything is scheduled ahead on the audio clock from a seeded generator,
 * so a given seed is the same piece every time.
 */

/** How far ahead notes are put on the clock, and how often that happens. */
const LOOKAHEAD_SECONDS = 0.4;
const TICK_MS = 100;

/** A pentatonic major scale, in semitones from the root. */
const PENTATONIC = [0, 2, 4, 7, 9];

/** Chord degrees, in semitones from the root, cycled slowly. */
const PROGRESSIONS: Record<VibeFamily, number[][]> = {
  ambient: [
    [0, 7, 14],
    [5, 12, 19],
    [-3, 4, 11],
    [2, 9, 16],
  ],
  lofi: [
    [0, 4, 7, 11],
    [9, 12, 16, 19],
    [5, 9, 12, 16],
    [7, 11, 14, 17],
  ],
  piano: [
    [0, 4, 7, 11],
    [-3, 0, 4, 7],
    [5, 9, 12, 16],
    [7, 11, 14, 17],
  ],
};

const TEMPO: Record<VibeFamily, number> = {
  ambient: 56,
  lofi: 76,
  piano: 68,
};

/** Root note, as a MIDI number, chosen per seed from these. */
const ROOTS = [57, 58, 60, 62, 63, 65];

function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/** mulberry32 - small, fast, and good enough for picking notes. */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let t = state;

    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A reverb tail made from decaying noise. A real impulse response would be
 * an asset to fetch; this is a few kilobytes of arithmetic and sounds like a
 * quiet room, which is all a chill station needs.
 */
function createImpulse(
  context: BaseAudioContext,
  seconds: number,
  decay: number
): AudioBuffer {
  const length = Math.floor(context.sampleRate * seconds);
  const buffer = context.createBuffer(2, length, context.sampleRate);
  const random = createRandom(7);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);

    for (let index = 0; index < length; index++) {
      data[index] = (random() * 2 - 1) * Math.pow(1 - index / length, decay);
    }
  }

  return buffer;
}

function createNoise(context: BaseAudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(context.sampleRate * seconds);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  const random = createRandom(11);

  for (let index = 0; index < length; index++) {
    data[index] = random() * 2 - 1;
  }

  return buffer;
}

export type Synth = {
  /** Seconds of music scheduled so far, on the context clock. */
  readonly endsAt: number;
  stop(): void;
};

type Voice = {
  /** Schedule one note at `when`, for `duration`, at `gain`. */
  note(midi: number, when: number, duration: number, gain: number): void;
};

/**
 * A piano-ish voice: three partials, a soft attack, an exponential decay,
 * and a low-pass that closes as the note dies so the tail is warm.
 */
function createKeys(context: BaseAudioContext, output: AudioNode): Voice {
  return {
    note(midi, when, duration, gain) {
      const frequency = midiToHz(midi);
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(frequency * 6, when);
      filter.frequency.exponentialRampToValueAtTime(
        frequency * 1.5,
        when + duration
      );

      envelope.gain.setValueAtTime(0.0001, when);
      envelope.gain.exponentialRampToValueAtTime(gain, when + 0.008);
      envelope.gain.exponentialRampToValueAtTime(gain * 0.5, when + 0.25);
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + duration);

      [1, 2, 3].forEach((partial, index) => {
        const oscillator = context.createOscillator();
        const partialGain = context.createGain();

        oscillator.type = index === 0 ? 'triangle' : 'sine';
        oscillator.frequency.value = frequency * partial;
        oscillator.detune.value = (index - 1) * 3;
        partialGain.gain.value = [0.6, 0.25, 0.08][index];

        oscillator.connect(partialGain).connect(filter);
        oscillator.start(when);
        oscillator.stop(when + duration + 0.05);
      });

      filter.connect(envelope).connect(output);
    },
  };
}

/**
 * A pad: two detuned saws under a slow low-pass sweep. Long attack, long
 * release; it is what fills the space between the keys on the ambient
 * station.
 */
function createPad(context: BaseAudioContext, output: AudioNode): Voice {
  return {
    note(midi, when, duration, gain) {
      const frequency = midiToHz(midi);
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();
      const attack = Math.min(2.5, duration * 0.4);
      const release = Math.min(3, duration * 0.4);

      filter.type = 'lowpass';
      filter.Q.value = 0.7;
      filter.frequency.setValueAtTime(frequency * 1.2, when);
      filter.frequency.linearRampToValueAtTime(
        frequency * 4,
        when + duration * 0.5
      );
      filter.frequency.linearRampToValueAtTime(
        frequency * 1.2,
        when + duration
      );

      envelope.gain.setValueAtTime(0.0001, when);
      envelope.gain.linearRampToValueAtTime(gain, when + attack);
      envelope.gain.setValueAtTime(gain, when + duration - release);
      envelope.gain.linearRampToValueAtTime(0.0001, when + duration);

      [-6, 6].forEach((detune) => {
        const oscillator = context.createOscillator();

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune;
        oscillator.connect(filter);
        oscillator.start(when);
        oscillator.stop(when + duration + 0.05);
      });

      filter.connect(envelope).connect(output);
    },
  };
}

type Drums = {
  hat(when: number, gain: number): void;
  kick(when: number, gain: number): void;
};

/** A soft kick and a brushed hat, for the lo-fi station's slow swing. */
function createDrums(
  context: BaseAudioContext,
  output: AudioNode,
  noise: AudioBuffer
): Drums {
  return {
    kick(when, gain) {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();

      oscillator.frequency.setValueAtTime(110, when);
      oscillator.frequency.exponentialRampToValueAtTime(40, when + 0.18);
      envelope.gain.setValueAtTime(gain, when);
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + 0.32);

      oscillator.connect(envelope).connect(output);
      oscillator.start(when);
      oscillator.stop(when + 0.35);
    },
    hat(when, gain) {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();

      source.buffer = noise;
      filter.type = 'highpass';
      filter.frequency.value = 6000;
      envelope.gain.setValueAtTime(gain, when);
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + 0.06);

      source.connect(filter).connect(envelope).connect(output);
      source.start(when);
      source.stop(when + 0.08);
    },
  };
}

/**
 * Plays one synthesised piece into `destination`, returning a handle that
 * stops it. `onEnded` fires once the last scheduled sound has finished.
 */
export function playSynth(
  context: AudioContext,
  destination: AudioNode,
  source: SynthSource,
  onEnded: () => void
): Synth {
  const random = createRandom(source.seed);
  const { style } = source;

  const master = context.createGain();
  const dry = context.createGain();
  const wet = context.createGain();
  const reverb = context.createConvolver();

  reverb.buffer = createImpulse(
    context,
    style === 'ambient' ? 4 : 2.2,
    style === 'ambient' ? 2.5 : 3.5
  );

  master.gain.value = style === 'lofi' ? 0.8 : 0.7;
  dry.gain.value = style === 'ambient' ? 0.5 : 0.8;
  wet.gain.value = style === 'ambient' ? 0.7 : 0.35;

  master.connect(dry).connect(destination);
  master.connect(reverb).connect(wet).connect(destination);

  /*
   * Lo-fi: everything through a gentle low-pass, with a bed of crackle
   * underneath. The crackle is what makes a clean synth read as a record.
   */
  let voiceBus: AudioNode = master;
  let crackle: AudioBufferSourceNode | null = null;

  if (style === 'lofi') {
    const tone = context.createBiquadFilter();

    tone.type = 'lowpass';
    tone.frequency.value = 3200;
    tone.connect(master);
    voiceBus = tone;

    const noise = createNoise(context, 2);
    const crackleFilter = context.createBiquadFilter();
    const crackleGain = context.createGain();

    crackle = context.createBufferSource();
    crackle.buffer = noise;
    crackle.loop = true;
    crackleFilter.type = 'bandpass';
    crackleFilter.frequency.value = 2400;
    crackleFilter.Q.value = 0.4;
    crackleGain.gain.value = 0.012;
    crackle.connect(crackleFilter).connect(crackleGain).connect(master);
    crackle.start();
  }

  const keys = createKeys(context, voiceBus);
  const pad = createPad(context, voiceBus);
  const drums = createDrums(context, voiceBus, createNoise(context, 0.5));

  const root = ROOTS[Math.floor(random() * ROOTS.length)];
  const progression = PROGRESSIONS[style];
  const beat = 60 / TEMPO[style];
  const bar = beat * 4;
  const start = context.currentTime + 0.1;
  const end = start + source.durationSeconds;

  let barIndex = 0;
  let scheduledTo = start;
  let endsAt = start;
  let stopped = false;

  const scheduleBar = (at: number) => {
    const chord = progression[barIndex % progression.length];
    const phraseBar = barIndex % 8;

    if (style === 'ambient') {
      if (barIndex % 2 === 0) {
        chord.forEach((degree, index) => {
          pad.note(root - 12 + degree, at, bar * 2.05, 0.05 + index * 0.01);
        });
      }

      if (random() < 0.6) {
        const degree = PENTATONIC[Math.floor(random() * PENTATONIC.length)];
        const octave = random() < 0.5 ? 12 : 24;

        keys.note(
          root + octave + degree,
          at + beat * Math.floor(random() * 4),
          bar * 1.5,
          0.09
        );
      }
    } else {
      // A held chord underneath, voiced low and quiet.
      chord.forEach((degree, index) => {
        keys.note(
          root - 12 + degree,
          at + (style === 'lofi' ? 0 : beat * 0.02 * index),
          bar * 0.98,
          0.06
        );
      });

      // Melody on the pentatonic, more rests as the phrase settles.
      const density = phraseBar < 4 ? 0.7 : 0.45;

      for (let step = 0; step < 8; step++) {
        if (random() > density) {
          continue;
        }

        const swing = style === 'lofi' && step % 2 === 1 ? beat * 0.08 : 0;
        const degree = PENTATONIC[Math.floor(random() * PENTATONIC.length)];
        const octave = random() < 0.25 ? 24 : 12;
        const length = beat * (random() < 0.3 ? 2 : 1) * 0.95;

        keys.note(
          root + octave + degree,
          at + step * beat * 0.5 + swing,
          length,
          0.1 + random() * 0.06
        );
      }
    }

    if (style === 'lofi') {
      drums.kick(at, 0.5);
      drums.kick(at + beat * 2.5, 0.35);

      for (let step = 0; step < 8; step++) {
        const swing = step % 2 === 1 ? beat * 0.09 : 0;

        drums.hat(at + step * beat * 0.5 + swing, step % 2 ? 0.08 : 0.14);
      }
    }

    barIndex += 1;
  };

  const tick = () => {
    if (stopped) {
      return;
    }

    while (scheduledTo < context.currentTime + LOOKAHEAD_SECONDS) {
      if (scheduledTo >= end) {
        break;
      }

      scheduleBar(scheduledTo);
      scheduledTo += bar;
      endsAt = scheduledTo + (style === 'ambient' ? 4 : 2.5);
    }

    if (scheduledTo >= end && context.currentTime >= endsAt) {
      stop();
      onEnded();
    }
  };

  const interval = window.setInterval(tick, TICK_MS);

  tick();

  function stop() {
    if (stopped) {
      return;
    }

    stopped = true;
    window.clearInterval(interval);

    const now = context.currentTime;

    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 0.4);
    crackle?.stop(now + 0.5);

    window.setTimeout(() => {
      master.disconnect();
    }, 600);
  }

  return {
    get endsAt() {
      return endsAt;
    },
    stop,
  };
}
