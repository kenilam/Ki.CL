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

type Mode = 'major' | 'minor';

/** Pentatonic scales, in semitones from the root, one per mode. */
const SCALES: Record<Mode, number[]> = {
  major: [0, 2, 4, 7, 9],
  minor: [0, 3, 5, 7, 10],
};

/**
 * Chord degrees, in semitones from the root, cycled slowly. Each station
 * has a progression per mode; the seed picks the mode, so half the pieces
 * are minor - the references were, and a station that is only ever major
 * grows sweet.
 */
const PROGRESSIONS: Record<VibeFamily, Record<Mode, number[][]>> = {
  ambient: {
    major: [
      [0, 7, 14],
      [5, 12, 19],
      [-3, 4, 11],
      [2, 9, 16],
    ],
    minor: [
      [0, 7, 15],
      [-4, 3, 12],
      [5, 12, 20],
      [-2, 5, 14],
    ],
  },
  lofi: {
    major: [
      [0, 4, 7, 11],
      [9, 12, 16, 19],
      [5, 9, 12, 16],
      [7, 11, 14, 17],
    ],
    minor: [
      [0, 3, 7, 10],
      [5, 8, 12, 15],
      [-4, 0, 3, 7],
      [7, 10, 14, 17],
    ],
  },
  piano: {
    major: [
      [0, 4, 7, 11],
      [-3, 0, 4, 7],
      [5, 9, 12, 16],
      [7, 11, 14, 17],
    ],
    minor: [
      [0, 3, 7, 10],
      [-4, 0, 3, 7],
      [5, 8, 12, 15],
      [-2, 2, 5, 9],
    ],
  },
};

const TEMPO: Record<VibeFamily, number> = {
  ambient: 56,
  lofi: 84,
  piano: 68,
};

/**
 * Loudness per station, before the compressor. The references sat around
 * -12 dBFS; a quiet station reads as thin, and the analyser sees less.
 */
const LEVEL: Record<VibeFamily, number> = {
  ambient: 0.9,
  lofi: 1.0,
  piano: 1.0,
};

/** Root note, as a MIDI number, chosen per seed from these. */
const ROOTS = [57, 58, 60, 62, 63, 65];

/** The keys' low-pass never opens past this, however high the note. */
const KEYS_CEILING_HZ = 3600;

/**
 * Where each station's tone closes, in hertz. Everything the voices make
 * passes through one gentle low-pass so nothing above it can be sharp;
 * lo-fi sits lowest, as a record would.
 */
const TONE_HZ: Record<VibeFamily, number> = {
  ambient: 4200,
  lofi: 2300,
  piano: 5200,
};

/**
 * The bass never opens past this. The references put more than half their
 * energy under 200 Hz; a chill station is carried by what sits down there.
 */
const BASS_CEILING_HZ = 180;

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

/** Partials per note. Six is where a sine stack stops sounding like an organ. */
const KEYS_PARTIALS = 6;

/** No partial is placed above this; past it there is only edge. */
const KEYS_PARTIAL_CEILING_HZ = 7000;

/**
 * A piano voice, built from what separates a piano from a keyboard.
 *
 * The partials are not exact multiples of the fundamental: a stiff string
 * pushes each one a little sharp, and more so higher up, which is the
 * shimmer a sampled piano has and a sine stack lacks. Each partial has its
 * own decay, the high ones dying first, so the tone darkens as the note
 * rings rather than holding one colour. Notes in the treble have two strings
 * a few cents apart, as the instrument does, and beat gently against each
 * other. And every note starts with the hammer: a short thump of filtered
 * noise before the strings speak.
 *
 * The note still knows how high it sits: higher notes get a darker body
 * filter, a softer touch, and thinner partials, so the top of a phrase
 * rings rather than pierces.
 */
function createKeys(
  context: BaseAudioContext,
  output: AudioNode,
  noise: AudioBuffer
): Voice {
  const nyquist = context.sampleRate / 2;

  return {
    note(midi, when, duration, gain) {
      const frequency = midiToHz(midi);
      const height = Math.min(1, Math.max(0, (midi - 48) / 36));
      const touch = gain * (1 - height * 0.35);

      /*
       * Inharmonicity: partial n sits at n·f·√(1 + B·n²). B is tiny in the
       * bass and grows toward the treble, where the strings are shortest and
       * stiffest.
       */
      const stiffness = 0.00012 + height * 0.0009;

      /* Strings per note, in cents from centre. Trebles have two. */
      const strings = midi >= 58 ? [-2.4, 2.4] : [0];

      /* How long the fundamental rings, at most. Treble notes are shorter. */
      const ring = Math.min(duration, 2.6 - height * 1.3);

      const body = context.createBiquadFilter();
      const envelope = context.createGain();

      body.type = 'lowpass';
      body.Q.value = 0.4;
      body.frequency.setValueAtTime(
        Math.min(KEYS_CEILING_HZ, frequency * (6 - height * 3)),
        when
      );
      body.frequency.exponentialRampToValueAtTime(
        Math.min(KEYS_CEILING_HZ, frequency * 1.3),
        when + ring
      );

      /*
       * Two-stage decay, as a struck string has: a quick fall from the
       * strike, then a long slow settle, then whatever the release leaves.
       */
      envelope.gain.setValueAtTime(0.0001, when);
      envelope.gain.exponentialRampToValueAtTime(touch, when + 0.006);
      envelope.gain.exponentialRampToValueAtTime(touch * 0.5, when + 0.16);
      envelope.gain.exponentialRampToValueAtTime(
        touch * 0.14,
        when + Math.max(0.2, ring * 0.85)
      );
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + duration);

      for (let n = 1; n <= KEYS_PARTIALS; n++) {
        const partialHz = frequency * n * Math.sqrt(1 + stiffness * n * n);

        if (partialHz > KEYS_PARTIAL_CEILING_HZ || partialHz > nyquist * 0.9) {
          break;
        }

        /* Loudness falls with the partial, and the top thins in the treble. */
        const level =
          (Math.pow(n, -1.35) * (n === 1 ? 1 : 1 - height * 0.65)) /
          strings.length;

        /* The higher the partial, the sooner it is gone. */
        const decay = Math.max(0.12, ring / (1 + 0.7 * (n - 1)));

        const partial = context.createGain();

        partial.gain.setValueAtTime(level, when);
        partial.gain.exponentialRampToValueAtTime(level * 0.001, when + decay);

        strings.forEach((cents) => {
          const oscillator = context.createOscillator();

          oscillator.type = 'sine';
          oscillator.frequency.value = partialHz;
          oscillator.detune.value = cents * (n === 1 ? 1 : 0.6);
          oscillator.connect(partial);
          oscillator.start(when);
          oscillator.stop(when + Math.min(duration, decay) + 0.05);
        });

        partial.connect(body);
      }

      /* The hammer: a thump the length of a hammer's contact, then gone. */
      const hammer = context.createBufferSource();
      const hammerFilter = context.createBiquadFilter();
      const hammerGain = context.createGain();

      hammer.buffer = noise;
      hammerFilter.type = 'bandpass';
      hammerFilter.frequency.value = Math.min(3000, frequency * 2.5);
      hammerFilter.Q.value = 1.1;
      hammerGain.gain.setValueAtTime(touch * 0.35 * (1 - height * 0.4), when);
      hammerGain.gain.exponentialRampToValueAtTime(0.0001, when + 0.02);
      hammer.connect(hammerFilter).connect(hammerGain).connect(body);
      hammer.start(when);
      hammer.stop(when + 0.03);

      body.connect(envelope).connect(output);
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

/**
 * The bass: a sine with a whisper of triangle for the attack, under a
 * low-pass that keeps it a weight rather than a note. Slow to speak, slow
 * to leave, so it reads as the floor of the piece.
 */
function createBass(context: BaseAudioContext, output: AudioNode): Voice {
  return {
    note(midi, when, duration, gain) {
      const frequency = midiToHz(midi);
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();
      const attack = Math.min(0.08, duration * 0.2);
      const release = Math.min(0.5, duration * 0.4);

      filter.type = 'lowpass';
      filter.Q.value = 0.7;
      filter.frequency.value = Math.min(BASS_CEILING_HZ, frequency * 2.5);

      envelope.gain.setValueAtTime(0.0001, when);
      envelope.gain.linearRampToValueAtTime(gain, when + attack);
      envelope.gain.setValueAtTime(gain, when + duration - release);
      envelope.gain.linearRampToValueAtTime(0.0001, when + duration);

      [
        ['sine', 1],
        ['triangle', 0.18],
      ].forEach(([type, level]) => {
        const oscillator = context.createOscillator();
        const partial = context.createGain();

        oscillator.type = type as OscillatorType;
        oscillator.frequency.value = frequency;
        partial.gain.value = level as number;
        oscillator.connect(partial).connect(filter);
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
  /** A brushed rim: the backbeat, felt more than heard. */
  rim(when: number, gain: number): void;
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
      filter.type = 'bandpass';
      filter.frequency.value = 4200;
      filter.Q.value = 0.9;
      envelope.gain.setValueAtTime(gain * 0.5, when);
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + 0.05);

      source.connect(filter).connect(envelope).connect(output);
      source.start(when);
      source.stop(when + 0.08);
    },
    rim(when, gain) {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();
      const body = context.createOscillator();
      const bodyGain = context.createGain();

      source.buffer = noise;
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 1.6;
      envelope.gain.setValueAtTime(gain, when);
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + 0.11);

      body.frequency.setValueAtTime(320, when);
      body.frequency.exponentialRampToValueAtTime(180, when + 0.06);
      bodyGain.gain.setValueAtTime(gain * 0.6, when);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, when + 0.08);

      source.connect(filter).connect(envelope).connect(output);
      body.connect(bodyGain).connect(output);
      source.start(when);
      source.stop(when + 0.12);
      body.start(when);
      body.stop(when + 0.1);
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
  const glue = context.createDynamicsCompressor();

  reverb.buffer = createImpulse(
    context,
    style === 'ambient' ? 4 : 2.2,
    style === 'ambient' ? 2.5 : 3.5
  );

  master.gain.value = LEVEL[style];
  dry.gain.value = style === 'ambient' ? 0.5 : 0.8;
  wet.gain.value = style === 'ambient' ? 0.7 : 0.3;

  /*
   * A compressor after the reverb holds the piece together: the bass and
   * the keys stop trading places in level, and the whole sits at a steady
   * loudness the way a mixed record does, instead of swinging forty
   * decibels between a chord and the silence after it.
   */
  glue.threshold.value = -18;
  glue.knee.value = 12;
  glue.ratio.value = 3;
  glue.attack.value = 0.008;
  glue.release.value = 0.3;

  master.connect(dry).connect(glue);
  master.connect(reverb).connect(wet).connect(glue);
  glue.connect(destination);

  /*
   * Every voice goes through one tone low-pass before the reverb, set per
   * station, so the top end is always rounded off. Lo-fi adds a bed of
   * crackle underneath: it is what makes a clean synth read as a record.
   */
  const tone = context.createBiquadFilter();

  tone.type = 'lowpass';
  tone.Q.value = 0.6;
  tone.frequency.value = TONE_HZ[style];
  tone.connect(master);

  const voiceBus: AudioNode = tone;
  let crackle: AudioBufferSourceNode | null = null;

  if (style === 'lofi') {
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

  const percussive = createNoise(context, 0.5);
  const keys = createKeys(context, voiceBus, percussive);
  const pad = createPad(context, voiceBus);
  const bass = createBass(context, master);
  const drums = createDrums(context, voiceBus, percussive);

  const root = ROOTS[Math.floor(random() * ROOTS.length)];
  const mode: Mode = random() < 0.5 ? 'major' : 'minor';
  const scale = SCALES[mode];
  const progression = PROGRESSIONS[style][mode];
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

    /* The floor: the chord's root, two octaves down, never below the low E. */
    const low = Math.max(28, root - 24 + chord[0]);

    if (style === 'ambient') {
      if (barIndex % 2 === 0) {
        chord.forEach((degree, index) => {
          pad.note(root - 12 + degree, at, bar * 2.05, 0.08 + index * 0.01);
        });

        bass.note(low, at, bar * 2.02, 0.08);
      }

      if (random() < 0.8) {
        const degree = scale[Math.floor(random() * scale.length)];
        const octave = random() < 0.7 ? 12 : 24;

        keys.note(
          root + octave + degree,
          at + beat * Math.floor(random() * 4),
          bar * 1.5,
          0.11
        );
      }
    } else {
      // A held chord underneath, voiced low and quiet.
      chord.forEach((degree, index) => {
        keys.note(
          root - 12 + degree,
          at + (style === 'lofi' ? 0 : beat * 0.02 * index),
          bar * 0.98,
          0.12
        );
      });

      // Melody on the pentatonic, more rests as the phrase settles.
      const density = phraseBar < 4 ? 0.8 : 0.55;

      for (let step = 0; step < 8; step++) {
        if (random() > density) {
          continue;
        }

        const swing = style === 'lofi' && step % 2 === 1 ? beat * 0.08 : 0;
        const degree = scale[Math.floor(random() * scale.length)];
        const octave = random() < 0.12 ? 24 : 12;
        /* Longer than the slot, so notes overlap and ring as a pedal would let them. */
        const length = beat * (random() < 0.3 ? 2 : 1) * 1.7;

        keys.note(
          root + octave + degree,
          at + step * beat * 0.5 + swing,
          length,
          0.18 + random() * 0.07
        );
      }
    }

    if (style === 'lofi') {
      bass.note(low, at, beat * 1.4, 0.11);
      bass.note(low, at + beat * 2.5, beat * 1.2, 0.09);

      drums.kick(at, 0.5);
      drums.kick(at + beat * 2.5, 0.35);
      drums.rim(at + beat, 0.22);
      drums.rim(at + beat * 3, 0.26);

      for (let step = 0; step < 8; step++) {
        const swing = step % 2 === 1 ? beat * 0.09 : 0;

        drums.hat(at + step * beat * 0.5 + swing, step % 2 ? 0.06 : 0.1);
      }
    }

    if (style === 'piano') {
      /* A bass on one and three, and the lightest pulse under it. */
      bass.note(low, at, beat * 1.8, 0.09);
      bass.note(
        low + (random() < 0.3 ? 7 : 0),
        at + beat * 2,
        beat * 1.8,
        0.08
      );

      drums.kick(at, 0.16);
      drums.rim(at + beat, 0.07);
      drums.kick(at + beat * 2, 0.12);
      drums.rim(at + beat * 3, 0.09);
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
      glue.disconnect();
    }, 600);
  }

  return {
    get endsAt() {
      return endsAt;
    },
    stop,
  };
}
