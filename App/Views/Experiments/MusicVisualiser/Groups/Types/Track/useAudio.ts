import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Routes
import { useMatch, useNavigate } from '@/Router';

// Context
import { useLocalStorageContext } from '@/LocalStorage';

// Catalog
import {
  draw,
  find,
  keyOf,
  type Track,
} from '@/Views/Experiments/MusicVisualiser/Catalog';

// Constants
import {
  PARAMS,
  PLAY_ROUTE,
  TRACK_ROUTE,
  VOLUME_STORAGE_KEY,
  toPlayPath,
  toTrackPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

/*
 * The track's audio, driven by the URL. `:track` says which file is
 * loaded; `/play` says whether it sounds. The controls only navigate, and
 * the two effects below follow the address, so back and forward, a shared
 * link and a skip all go the same way.
 *
 *   element ─▶ gain ─▶ analyser ─▶ master ─▶ speakers
 *
 * The graph is built on the first play and kept until the track route
 * unmounts. Each track gets its own element and gain; on a skip the old one
 * plays on until the new one actually sounds, and then the two cross.
 */

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

const ERROR = 'Could not play this track. Try again.';

type Graph = {
  analyser: AnalyserNode;
  context: AudioContext;
  master: GainNode;
};

/** One track's element, and its place in the graph once it has played. */
type Slot = {
  element: HTMLAudioElement;
  gain: GainNode | null;
  key: string;
  source: MediaElementAudioSourceNode | null;
};

export type Control = {
  error: string | null;
  loading: boolean;
  /** Go to this track's `/play`. */
  play(): void;
  playing: boolean;
  setValue(value: number): void;
  /** Go to the next track's `/play`. */
  skip(): void;
  /** Go back to this track's gate. */
  stop(): void;
  /** The volume, in `[0, 1]`. */
  value: number;
};

export type Audio = {
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
    context.resume().then(
      () => true,
      () => false
    ),
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

export default function useAudio(): Audio {
  const navigate = useNavigate();
  const storage = useLocalStorageContext();
  const trackMatch = useMatch({ end: false, path: TRACK_ROUTE });
  const isPlay = Boolean(useMatch(PLAY_ROUTE));

  const type = trackMatch?.params[PARAMS.type];
  const id = trackMatch?.params[PARAMS.track];
  const track = useMemo(() => (type && id ? find(type, id) : null), [id, type]);
  const key = track ? keyOf(track) : null;

  const history = useRef<string[]>([]);
  const next = useMemo(
    () => (key ? draw({ played: [...history.current, key] }) : null),
    [key]
  );

  const graph = useRef<Graph | null>(null);
  /* The track the URL names, and the one being heard. They differ mid-skip. */
  const current = useRef<Slot | null>(null);
  const audible = useRef<Slot | null>(null);
  const fading = useRef(new Set<Slot>());

  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [value, setValueState] = useState(() =>
    clamp(storage.getItem(VOLUME_STORAGE_KEY) ?? DEFAULT_VOLUME)
  );
  const valueRef = useRef(value);

  valueRef.current = value;

  const play = useCallback(() => {
    if (track) {
      navigate(toPlayPath(track));
    }
  }, [navigate, track]);

  const stop = useCallback(() => {
    if (track) {
      navigate(toTrackPath(track));
    }
  }, [navigate, track]);

  const skip = useCallback(() => {
    if (next) {
      navigate(toPlayPath(next));
    }
  }, [navigate, next]);

  /* The element's `ended` listener outlives renders; it reads skip through here. */
  const skipRef = useRef(skip);

  skipRef.current = skip;

  const setValue = useCallback(
    (volume: number) => {
      const clamped = clamp(volume);
      const built = graph.current;

      setValueState(clamped);
      storage.setItem(VOLUME_STORAGE_KEY, clamped as never);

      if (built) {
        const now = built.context.currentTime;

        built.master.gain.cancelScheduledValues(now);
        built.master.gain.setValueAtTime(built.master.gain.value, now);
        built.master.gain.linearRampToValueAtTime(
          clamped,
          now + VOLUME_RAMP_SECONDS
        );
      }
    },
    [storage]
  );

  /* The track has started to sound: bring it up and let the old one go. */
  const cross = useCallback((slot: Slot) => {
    const built = graph.current;

    if (current.current !== slot || !built || !slot.gain) {
      return;
    }

    setLoading(false);
    setPlaying(true);

    if (audible.current === slot) {
      return;
    }

    const now = built.context.currentTime;
    const outgoing = audible.current;

    slot.gain.gain.cancelScheduledValues(now);
    slot.gain.gain.setValueAtTime(0, now);
    slot.gain.gain.linearRampToValueAtTime(1, now + CROSSFADE_SECONDS);
    audible.current = slot;

    if (outgoing?.gain) {
      outgoing.gain.gain.cancelScheduledValues(now);
      outgoing.gain.gain.setValueAtTime(outgoing.gain.gain.value, now);
      outgoing.gain.gain.linearRampToValueAtTime(0, now + CROSSFADE_SECONDS);
      fading.current.add(outgoing);
      window.setTimeout(
        () => {
          if (fading.current.delete(outgoing)) {
            drop(outgoing);
          }
        },
        CROSSFADE_SECONDS * 1000 + 100
      );
    }
  }, []);

  /* `:track` - one element per track, loading as soon as the track is named. */
  useEffect(() => {
    if (!track || !key || current.current?.key === key) {
      return;
    }

    if (current.current && current.current !== audible.current) {
      drop(current.current);
    }

    history.current = [...history.current, key].slice(-HISTORY_LENGTH);

    const element = new Audio();
    const slot: Slot = { element, gain: null, key, source: null };

    /*
     * `crossOrigin` is what lets the analyser read the stream. The files
     * come through the same-origin route, so the server agrees.
     */
    element.crossOrigin = 'anonymous';
    element.preload = 'auto';
    element.src = track.url;
    element.addEventListener('playing', () => cross(slot));
    element.addEventListener('ended', () => {
      if (current.current === slot) {
        skipRef.current();
      }
    });
    element.addEventListener('error', () => {
      if (current.current === slot) {
        setError(ERROR);
        setLoading(false);
      }
    });

    current.current = slot;
    setError(null);
  }, [cross, key, track]);

  /* `/play` - sound the track, or hold it silent when the route is left. */
  useEffect(() => {
    const slot = current.current;

    if (!track || !slot) {
      return;
    }

    if (!isPlay) {
      slot.element.pause();
      audible.current?.element.pause();
      setLoading(false);
      setPlaying(false);

      return;
    }

    let cancelled = false;

    if (!graph.current) {
      const context = new AudioContext();
      const built: Graph = {
        analyser: context.createAnalyser(),
        context,
        master: context.createGain(),
      };

      built.analyser.fftSize = FFT_SIZE;
      built.analyser.smoothingTimeConstant = ANALYSER_SMOOTHING;
      built.master.gain.value = valueRef.current;
      built.analyser.connect(built.master).connect(context.destination);
      graph.current = built;
      setAnalyser(built.analyser);
    }

    const { analyser: input, context } = graph.current;

    if (!slot.source) {
      slot.source = context.createMediaElementSource(slot.element);
      slot.gain = context.createGain();
      slot.gain.gain.value = 0;
      slot.source.connect(slot.gain).connect(input);
    }

    setError(null);
    setLoading(true);

    void (async () => {
      const running = await resume(context);

      if (cancelled) {
        return;
      }

      /* A cold link: the browser wants a press first, and the gate has one. */
      if (!running) {
        setLoading(false);
        navigate(toTrackPath(track), { replace: true });

        return;
      }

      /* An old track held paused on its gate is not coming back. */
      if (
        audible.current &&
        audible.current !== slot &&
        audible.current.element.paused
      ) {
        drop(audible.current);
        audible.current = null;
      }

      try {
        await slot.element.play();
      } catch (caught) {
        if (!cancelled && (caught as DOMException).name !== 'AbortError') {
          setError(ERROR);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isPlay, key, navigate, track]);

  /* Leaving the track route: silence everything and close the graph. */
  useEffect(
    () => () => {
      [current.current, audible.current, ...fading.current].forEach(
        (slot) => slot && drop(slot)
      );
      fading.current.clear();
      current.current = null;
      audible.current = null;
      void graph.current?.context.close();
      graph.current = null;
      setAnalyser(null);
    },
    []
  );

  return {
    analyser,
    control: {
      error,
      loading,
      play,
      playing,
      setValue,
      skip,
      stop,
      value,
    },
    next,
    track,
  };
}
