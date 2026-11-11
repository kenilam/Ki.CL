import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Routes
import { useMatch, useNavigate } from 'design/router';

// Context
import { useLocalStorageContext } from '@/local-storage';

// Catalog
import {
  draw,
  find,
  keyOf,
} from '@/views/experiments/music-visualiser/catalog';

// Audio
import {
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
  type Graph,
  type Slot,
} from './audio';

// Constants
import {
  PARAMS,
  PLAY_ROUTE,
  TRACK_ROUTE,
  VOLUME_STORAGE_KEY,
  toPlayPath,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

/*
 * The track's audio, driven by the URL. `:track` says which file is
 * loaded; `/play` says whether it sounds. The controls only navigate, and
 * the two effects below follow the address, so back and forward, a shared
 * link and a skip all go the same way.
 *
 *   element ─▶ gain ─▶ analyser ─▶ master ─▶ speakers
 *                          └─▶ tap, while a clip is recorded
 *
 * The graph is built on the first play and kept until the track route
 * unmounts. Each track gets its own element and gain; on a skip the old one
 * plays on until the new one actually sounds, and then the two cross.
 */

export function useAudio(): Audio {
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
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(false);
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

  const seek = useCallback((seconds: number) => {
    const slot = current.current;

    if (!slot) {
      return;
    }

    slot.element.currentTime = seconds;
    setElapsed(seconds);
  }, []);

  const capture = useCallback(() => {
    const built = graph.current;

    if (!built) {
      return null;
    }

    if (!built.tap) {
      built.tap = built.context.createMediaStreamDestination();
      built.analyser.connect(built.tap);
    }

    return built.tap.stream;
  }, []);

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
    element.addEventListener('durationchange', () => {
      if (current.current === slot) {
        setDuration(Number.isFinite(element.duration) ? element.duration : 0);
      }
    });
    element.addEventListener('timeupdate', () => {
      if (current.current === slot) {
        setElapsed(element.currentTime);
      }
    });
    element.addEventListener('ended', () => {
      if (current.current === slot) {
        skipRef.current();
      }
    });
    element.addEventListener('error', () => {
      if (current.current === slot) {
        setError(true);
        setLoading(false);
      }
    });

    current.current = slot;
    setDuration(0);
    setElapsed(0);
    setError(false);
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
        tap: null,
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

    setError(false);
    setLoading(true);

    /* An old track held paused on its gate is not coming back. */
    if (
      audible.current &&
      audible.current !== slot &&
      audible.current.element.paused
    ) {
      drop(audible.current);
      audible.current = null;
    }

    /*
     * Started before the context has agreed to run, not after. A new context
     * takes a moment to wake, and Chrome on iOS no longer counts the press by
     * then, so it refused the first track. The gain is at zero until `cross`.
     */
    const started = slot.element.play().then(
      () => null,
      (caught: DOMException) => caught
    );

    void (async () => {
      const running = await resume(context);

      if (cancelled) {
        return;
      }

      /* A cold link: the browser wants a press first, and the gate has one. */
      if (!running) {
        slot.element.pause();
        setLoading(false);
        navigate(toTrackPath(track), { replace: true });

        return;
      }

      const refused = await started;

      if (!cancelled && refused && refused.name !== 'AbortError') {
        setError(true);
        setLoading(false);
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
      capture,
      duration,
      elapsed,
      error,
      loading,
      play,
      playing,
      seek,
      setValue,
      skip,
      stop,
      value,
    },
    next,
    track,
  };
}
