import { Reverb } from 'smplr';

import type {
  SynthSource,
  VibeFamily,
} from '@/Views/Experiments/MusicVisualiser/Spec';

import { composePiece, type Event, type Kit } from './compose';
import type { Instruments } from './instruments';
import { createRandom } from './random';

/*
 * The built-in station: music the browser makes for itself.
 *
 * It exists so the visualiser works with no network at all - on a plane, in
 * a locked-down container, or when every provider is down - and so the
 * visuals can be checked against a signal whose shape is known. It is not a
 * stand-in for the catalogue; it is the last station on the dial.
 *
 * `compose.ts` decides what is played; this file decides how it sounds. The
 * keys are the sampled piano when it has loaded and the synthesised one
 * until then; the bass, pad and drums are always synthesised. Everything is
 * scheduled ahead on the audio clock, so a given seed is the same piece
 * every time.
 */

/**
 * How far ahead notes are put on the clock, and how often that happens.
 *
 * Far ahead on purpose: a background tab's timers run once a second, and
 * once a minute after five minutes hidden. A scheduler that only looked a
 * fraction of a second ahead starved there and the music fell silent. Web
 * Audio plays what it has been given whatever the tab is doing, so bars
 * are laid down well before they are due.
 */
const LOOKAHEAD_SECONDS = 20;
const TICK_MS = 250;

/** Seconds the last sound may ring past the last bar, per station. */
const TAIL_SECONDS: Record<VibeFamily, number> = {
  ambient: 4,
  lofi: 2.5,
  piano: 2.5,
};

/** How much the tone opens in the second section, and how fast it moves. */
const SECTION_TONE_LIFT = 1.3;
const SECTION_TONE_SECONDS = 1.5;

/**
 * Loudness per station, before the compressor. The references sat around
 * -12 dBFS; a quiet station reads as thin, and the analyser sees less.
 */
const LEVEL: Record<VibeFamily, number> = {
  ambient: 0.9,
  lofi: 1.15,
  piano: 1.0,
};

/** The synthesised keys' low-pass never opens past this. */
const KEYS_CEILING_HZ = 3600;

/**
 * Where each station's tone closes, in hertz. Everything the voices make,
 * the sampled piano included, passes through one gentle low-pass so nothing
 * above it can be sharp; lo-fi sits lowest, as a record would.
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

/** How loud each voice plays at full velocity, per station. */
const GAIN: Record<VibeFamily, Record<Event['voice'], number>> = {
  ambient: { bass: 0.15, hat: 0, keys: 0.14, kick: 0, pad: 0.16, rim: 0 },
  lofi: { bass: 0.12, hat: 0.22, keys: 0.28, kick: 0.4, pad: 0, rim: 0.32 },
  piano: { bass: 0.14, hat: 0.06, keys: 0.24, kick: 0.2, pad: 0, rim: 0.1 },
};

/**
 * The sampled piano's MIDI velocity at zero and full event velocity: 44 to
 * 100, the span of the layers `instruments.ts` fetches.
 */
const SAMPLE_VELOCITY_FLOOR = 44;
const SAMPLE_VELOCITY_SPAN = 56;

function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * A reverb tail made from decaying noise: the fallback when the plate
 * cannot start, which is rare but not impossible where worklets are
 * refused.
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
 * The synthesised piano, built from what separates a piano from a keyboard.
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
 * It plays until the sampled piano has loaded, and instead of it wherever
 * the samples cannot be reached.
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
      const stiffness = 0.00012 + height * 0.0009;
      const strings = midi >= 58 ? [-2.4, 2.4] : [0];
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

        const level =
          (Math.pow(n, -1.35) * (n === 1 ? 1 : 1 - height * 0.65)) /
          strings.length;
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
function createBass(
  context: BaseAudioContext,
  output: AudioNode,
  bite: number
): Voice {
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
        ['triangle', bite],
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

/** A soft kick, a brushed hat and a rim, for the stations with a pulse. */
function createDrums(
  context: BaseAudioContext,
  output: AudioNode,
  noise: AudioBuffer,
  kit: Kit
): Drums {
  return {
    kick(when, gain) {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();

      oscillator.frequency.setValueAtTime(kit.kickHz, when);
      oscillator.frequency.exponentialRampToValueAtTime(
        40,
        when + kit.kickDecay * 0.55
      );
      envelope.gain.setValueAtTime(gain, when);
      envelope.gain.exponentialRampToValueAtTime(0.0001, when + kit.kickDecay);

      oscillator.connect(envelope).connect(output);
      oscillator.start(when);
      oscillator.stop(when + kit.kickDecay + 0.05);
    },
    hat(when, gain) {
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const envelope = context.createGain();

      source.buffer = noise;
      filter.type = 'bandpass';
      filter.frequency.value = kit.hatHz;
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
 * Plays one piece into `destination`, returning a handle that stops it.
 * `onEnded` fires once the last scheduled sound has finished. `instruments`
 * are the sampled ones the engine shares; without them, or until they have
 * loaded, the synthesised voices carry everything.
 */
export function playSynth(
  context: AudioContext,
  destination: AudioNode,
  source: SynthSource,
  onEnded: () => void,
  instruments?: Instruments
): Synth {
  const { style } = source;
  const piece = composePiece(source.seed, style);
  const { kit } = piece;

  const master = context.createGain();
  const dry = context.createGain();
  const wet = context.createGain();
  const glue = context.createDynamicsCompressor();

  master.gain.value = LEVEL[style];
  dry.gain.value = style === 'ambient' ? 0.5 : 0.8;
  wet.gain.value = kit.reverb;

  /*
   * A compressor after the reverb holds the piece together: the bass and
   * the keys stop trading places in level, and the whole sits at a steady
   * loudness the way a mixed record does.
   */
  glue.threshold.value = -18;
  glue.knee.value = 12;
  glue.ratio.value = 3;
  glue.attack.value = 0.008;
  glue.release.value = 0.3;

  master.connect(dry).connect(glue);
  glue.connect(destination);

  /*
   * The reverb is a plate - a packaged Dattorro network - which sounds like
   * a room rather than the noise tail it replaces. It starts as a worklet,
   * so it is asked for and the send is only connected once it answers;
   * where it cannot, the noise tail stands in.
   */
  const attachReverb = async () => {
    try {
      const candidate = Reverb(context);

      await candidate.ready();

      if (stopped) {
        return;
      }

      master.connect(candidate.input);
      candidate.connect(wet);
      wet.connect(glue);
    } catch {
      const reverb = context.createConvolver();

      reverb.buffer = createImpulse(
        context,
        style === 'ambient' ? 4 : 2.2,
        style === 'ambient' ? 2.5 : 3.5
      );
      master.connect(reverb).connect(wet).connect(glue);
    }
  };

  void attachReverb();

  /*
   * Every voice goes through one tone low-pass before the reverb, set per
   * station, so the top end is always rounded off. Lo-fi adds a bed of
   * crackle underneath: it is what makes a clean synth read as a record.
   */
  const tone = context.createBiquadFilter();

  const toneHz = TONE_HZ[style] * kit.toneScale;

  tone.type = 'lowpass';
  tone.Q.value = 0.6;
  tone.frequency.value = toneHz;
  tone.connect(master);

  instruments?.bus.connect(tone);

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
  const bass = createBass(context, master, kit.bassBite);
  const drums = createDrums(context, voiceBus, percussive, kit);
  const gain = GAIN[style];

  const beat = 60 / piece.tempo;
  const bar = beat * 4;
  const start = context.currentTime + 0.1;
  const end = start + source.durationSeconds;

  let barIndex = 0;
  let scheduledTo = start;
  let endsAt = start;
  let stopped = false;
  let sentinel: ConstantSourceNode | null = null;

  /*
   * The end is announced by a silent source stopped at the last sound's
   * end: its `onended` fires on the audio clock, which a throttled tab does
   * not slow, where the polling tick might arrive a minute late.
   */
  const finish = () => {
    if (stopped) {
      return;
    }

    stop();
    onEnded();
  };

  const play = (event: Event, at: number) => {
    const when = at + event.at * beat;
    const duration = event.duration * beat;
    const level = event.velocity * gain[event.voice];

    if (level <= 0) {
      return;
    }

    switch (event.voice) {
      case 'keys': {
        const piano = instruments?.loaded ? instruments.piano : null;

        if (piano) {
          piano.start({
            duration,
            note: event.midi,
            time: when,
            velocity: Math.round(
              SAMPLE_VELOCITY_FLOOR + event.velocity * SAMPLE_VELOCITY_SPAN
            ),
          });
        } else {
          keys.note(event.midi, when, duration, level);
        }

        return;
      }
      case 'pad':
        pad.note(event.midi, when, duration, level);

        return;
      case 'bass':
        bass.note(event.midi, when, duration, level);

        return;
      case 'kick':
        drums.kick(when, level);

        return;
      case 'rim':
        drums.rim(when, level);

        return;
      case 'hat':
        drums.hat(when, level);
    }
  };

  const tick = () => {
    if (stopped) {
      return;
    }

    while (scheduledTo < context.currentTime + LOOKAHEAD_SECONDS) {
      if (scheduledTo >= end) {
        break;
      }

      /* The tone opens for the second section and settles for the first. */
      tone.frequency.setTargetAtTime(
        toneHz * (piece.section(barIndex) === 1 ? SECTION_TONE_LIFT : 1),
        scheduledTo,
        SECTION_TONE_SECONDS
      );

      try {
        piece.bar(barIndex).forEach((event) => play(event, scheduledTo));
      } catch (error) {
        /* A bar that cannot be built is a bar of rest, never a stalled piece. */
        console.error('Music Visualiser: bar could not be scheduled', error);
      }

      barIndex += 1;
      scheduledTo += bar;
      endsAt = scheduledTo + TAIL_SECONDS[style];
    }

    if (scheduledTo >= end && !sentinel) {
      sentinel = context.createConstantSource();
      sentinel.offset.value = 0;
      sentinel.connect(master);
      sentinel.onended = finish;
      sentinel.start();
      sentinel.stop(endsAt);
    }

    if (scheduledTo >= end && context.currentTime >= endsAt) {
      finish();
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
    instruments?.piano?.stop();

    if (sentinel) {
      sentinel.onended = null;
    }

    window.setTimeout(() => {
      try {
        instruments?.bus.disconnect(tone);
      } catch {
        // Already detached, which is fine.
      }

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
