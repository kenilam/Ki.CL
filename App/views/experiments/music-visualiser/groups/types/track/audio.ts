// Catalog
import type { Track } from '@/views/experiments/music-visualiser/catalog';

/** Seconds the old track takes to give way to the new one. */
const CROSSFADE_SECONDS = 3;

/** Seconds a volume change takes, so dragging the slider does not click. */
const VOLUME_RAMP_SECONDS = 0.05;

const DEFAULT_VOLUME = 0.5;

/** Tracks remembered so the next draw does not repeat them. */
const HISTORY_LENGTH = 24;

/**
 * How long to wait for the browser to let audio start. Without any
 * interaction on the page it will not, and `resume()` never settles, so a
 * cold wait is short; after one, a slow audio device gets longer to wake.
 */
const RESUME_AFTER_GESTURE_MS = 6000;
const RESUME_COLD_MS = 1500;

/** 2048 gives 1024 bins, about 21 Hz each at 44.1 kHz. */
const FFT_SIZE = 2048;

/** Kept low: the visualiser smooths at its own three time scales. */
const ANALYSER_SMOOTHING = 0.5;

type Graph = {
  analyser: AnalyserNode;
  context: AudioContext;
  master: GainNode;
  /** Before the volume, so a clip sounds the same with the slider down. */
  tap: MediaStreamAudioDestinationNode | null;
};

/** One track's element, and its place in the graph once it has played. */
type Slot = {
  element: HTMLAudioElement;
  gain: GainNode | null;
  key: string;
  source: MediaElementAudioSourceNode | null;
};

type Control = {
  /** What is playing, as a stream to record; `null` before the first play. */
  capture(): MediaStream | null;
  duration: number;
  elapsed: number;
  /** The track could not be played; the player writes the message. */
  error: boolean;
  loading: boolean;
  /** Go to this track's `/play`. */
  play(): void;
  playing: boolean;
  seek(seconds: number): void;
  setValue(value: number): void;
  /** Go to the next track's `/play`. */
  skip(): void;
  /** Go back to this track's gate. */
  stop(): void;
  /** The volume, in `[0, 1]`. */
  value: number;
};

type Audio = {
  /** What the visualiser listens to; `null` until the first play. */
  analyser: AnalyserNode | null;
  control: Control;
  /** The track after this one, drawn in advance so skip can be a link. */
  next: Track | null;
  /** The track the URL names, or `null` if the catalogue has none. */
  track: Track | null;
};

function clamp(value: unknown): number {
  const volume = Number(value);

  return Number.isFinite(volume)
    ? Math.min(1, Math.max(0, volume))
    : DEFAULT_VOLUME;
}

/* Read through a call: the state after an await is not what it was before. */
const running = (context: AudioContext) => context.state === 'running';

/** Whether the context agreed to run. */
async function agreed(context: AudioContext): Promise<boolean> {
  try {
    await context.resume();

    return true;
  } catch {
    return false;
  }
}

/** Let the context run, or say it will not without a gesture. */
async function resume(context: AudioContext): Promise<boolean> {
  if (running(context)) {
    return true;
  }

  const wait =
    (navigator.userActivation?.hasBeenActive ?? true)
      ? RESUME_AFTER_GESTURE_MS
      : RESUME_COLD_MS;
  const resumed = await Promise.race([
    agreed(context),
    new Promise<boolean>((resolve) =>
      window.setTimeout(() => resolve(false), wait)
    ),
  ]);

  return resumed && running(context);
}

/** Silence a slot for good. */
function drop(slot: Slot): void {
  slot.element.pause();
  slot.element.removeAttribute('src');
  slot.element.load();
  slot.source?.disconnect();
  slot.gain?.disconnect();
}

export {
  ANALYSER_SMOOTHING,
  CROSSFADE_SECONDS,
  DEFAULT_VOLUME,
  FFT_SIZE,
  HISTORY_LENGTH,
  VOLUME_RAMP_SECONDS,
  clamp,
  drop,
  resume,
  type Audio,
  type Control,
  type Graph,
  type Slot,
};
