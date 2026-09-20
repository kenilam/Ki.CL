import type {
  Smoothed,
  Source,
} from '@/Views/Experiments/MusicVisualiser/Spec';

import { createExtractor, type Extractor } from './features';
import { loadInstruments, type Instruments } from './instruments';
import { playSynth, type Synth } from './synth';

/*
 * One audio graph for the whole view.
 *
 *   source ─▶ input ─▶ analyser ─▶ master ─▶ speakers
 *
 * A source is either a media element, for a track streamed from a provider,
 * or the built-in synth. Both connect to `input`, so the analyser hears them
 * the same way and the stage never knows which it is. The graph is built
 * once, on the first gesture - browsers refuse to start an AudioContext
 * before one - and kept for the life of the view.
 */

/** Frequency resolution. 2048 gives 1024 bins, about 21 Hz each at 44.1 kHz. */
const FFT_SIZE = 2048;

/**
 * The analyser's own smoothing, kept low: the extractor does its own at
 * three time scales and wants the raw frame under it.
 */
const ANALYSER_SMOOTHING = 0.5;

/** Seconds a volume change takes, so a slider drag does not click. */
const VOLUME_RAMP_SECONDS = 0.05;

/**
 * How long to wait for the context to run before deciding the browser is
 * holding it for a gesture. A context allowed to run does so at once; one
 * that is not leaves `resume()` pending until the listener acts.
 */
const RESUME_TIMEOUT_MS = 400;

/** Thrown by `play` when the browser wants a gesture before it will sound. */
export class PlaybackBlockedError extends Error {
  constructor() {
    super('Playback needs a gesture first');
    this.name = 'PlaybackBlockedError';
  }
}

export type Engine = {
  /** Silence and detach whatever is playing. */
  clear(): void;
  readonly context: AudioContext;
  /** Latest smoothed features; updated by `update`. */
  readonly features: Smoothed;
  /** The eased spectrum, one byte a band, low to high; see `features.ts`. */
  readonly spectrum: Uint8Array;
  /** Whether a source is attached and not paused. */
  readonly isPlaying: boolean;
  pause(): void;
  /** Start `source`; resolves once it is audible. `onEnded` fires when it runs out. */
  play(source: Source, onEnded: () => void): Promise<void>;
  resume(): Promise<void>;
  setVolume(volume: number): void;
  /** Pull a frame of features. `dt` is seconds since the last call. */
  update(dt: number): void;
};

export type EngineOptions = {
  /** Where sample sets are served from; see `instruments.ts`. */
  samplesUrl?: string;
};

export function createEngine(
  initialVolume: number,
  options: EngineOptions = {}
): Engine {
  const context = new AudioContext();
  const input = context.createGain();
  const analyser = context.createAnalyser();
  const master = context.createGain();

  /*
   * Sampled instruments start loading now, on the gesture that made the
   * context, and are shared by every piece this engine plays.
   */
  const instruments: Instruments = loadInstruments(context, options.samplesUrl);

  analyser.fftSize = FFT_SIZE;
  analyser.smoothingTimeConstant = ANALYSER_SMOOTHING;
  master.gain.value = initialVolume;

  input.connect(analyser).connect(master).connect(context.destination);

  const extractor: Extractor = createExtractor(analyser);

  let element: HTMLAudioElement | null = null;
  let elementSource: MediaElementAudioSourceNode | null = null;
  let synth: Synth | null = null;
  let playing = false;

  const clear = () => {
    playing = false;

    if (synth) {
      synth.stop();
      synth = null;
    }

    if (element) {
      element.pause();
      element.removeAttribute('src');
      element.load();
      elementSource?.disconnect();
      element = null;
      elementSource = null;
    }
  };

  /* Read through a call: the state after an await is not what it was before. */
  const running = () => context.state === 'running';

  const play: Engine['play'] = async (source, onEnded) => {
    clear();

    if (!running()) {
      const resumed = await Promise.race([
        context.resume().then(
          () => true,
          () => false
        ),
        new Promise<boolean>((resolve) =>
          window.setTimeout(() => resolve(false), RESUME_TIMEOUT_MS)
        ),
      ]);

      if (!resumed || !running()) {
        throw new PlaybackBlockedError();
      }
    }

    if (source.kind === 'synth') {
      synth = playSynth(
        context,
        input,
        source,
        () => {
          playing = false;
          onEnded();
        },
        instruments
      );
      playing = true;

      return;
    }

    /*
     * `crossOrigin` is what lets the analyser read the stream at all. It is
     * only honoured when the server agrees, which is why provider audio goes
     * through the same-origin proxy rather than straight to its host.
     */
    element = new Audio();
    element.crossOrigin = 'anonymous';
    element.preload = 'auto';
    element.src = source.url;
    elementSource = context.createMediaElementSource(element);
    elementSource.connect(input);

    element.addEventListener('ended', () => {
      playing = false;
      onEnded();
    });

    await element.play();
    playing = true;
  };

  return {
    clear,
    context,
    get features() {
      return extractor.smoothed;
    },
    get spectrum() {
      return extractor.spectrum;
    },
    get isPlaying() {
      return playing && context.state === 'running';
    },
    pause() {
      playing = false;
      element?.pause();
      void context.suspend();
    },
    play,
    async resume() {
      await context.resume();

      if (element) {
        await element.play();
      }

      playing = Boolean(element || synth);
    },
    setVolume(volume) {
      const now = context.currentTime;

      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(volume, now + VOLUME_RAMP_SECONDS);
    },
    update(dt) {
      extractor.update(dt);
    },
  };
}
