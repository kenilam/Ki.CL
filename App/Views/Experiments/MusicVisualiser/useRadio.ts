import { useCallback, useEffect, useRef, useState } from 'react';

// Routes
import { useNavigate, useParams } from '@/Router';

// Context
import { useLocalStorageContext } from '@/LocalStorage';

// Spec
import type { PlaybackState, Track } from './Spec';

// Audio
import { createEngine, type Engine } from './Audio/engine';

// Providers
import radio from './Providers';

// Constants
import { PARAM, VOLUME_STORAGE_KEY, toPath } from './constants';

/*
 * Playback state for the whole view: what is playing, whether it is, how
 * loud, and the engine behind it. The engine is made on the first press of
 * play - never on mount - because that press is the gesture the browser
 * needs before it will make a sound.
 *
 * The URL carries the track. Every track that starts is written to it, so
 * the address bar is always a link to what is playing; and a track named in
 * the URL on arrival is the one the gate offers to play. Back and forward
 * through the history move between tracks like any other navigation.
 */

const DEFAULT_VOLUME = 0.8;

/** Tracks remembered for the provider's no-repeat list. */
const HISTORY_LENGTH = 24;

const ERROR_MESSAGES = {
  next: 'Could not find the next track. Try again.',
  missing: 'That track could not be found. Playing something else.',
};

type Params = { [PARAM]?: string };

export type Radio = {
  engine: Engine | null;
  error: string | null;
  /** Skip to another track. */
  next(): void;
  /** The track the URL asks for, resolved, before anything has played. */
  requested: Track | null;
  setVolume(volume: number): void;
  state: PlaybackState;
  /** Play if paused or idle; pause if playing. */
  toggle(): void;
  track: Track | null;
  volume: number;
};

function clampVolume(value: unknown): number {
  const volume = Number(value);

  return Number.isFinite(volume)
    ? Math.min(1, Math.max(0, volume))
    : DEFAULT_VOLUME;
}

export default function useRadio(): Radio {
  const storage = useLocalStorageContext();
  const navigate = useNavigate();
  const params = useParams<Params>();
  const requestedId = params[PARAM] ?? null;

  const engine = useRef<Engine | null>(null);
  const history = useRef<string[]>([]);
  const generation = useRef(0);
  const trackRef = useRef<Track | null>(null);
  const stateRef = useRef<PlaybackState>('idle');

  const [state, setState] = useState<PlaybackState>('idle');
  const [track, setTrack] = useState<Track | null>(null);
  const [requested, setRequested] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() =>
    clampVolume(storage.getItem(VOLUME_STORAGE_KEY) ?? DEFAULT_VOLUME)
  );

  trackRef.current = track;
  stateRef.current = state;

  /**
   * Start a track: the one with `id`, or the provider's next choice. Falls
   * back to the next choice when an id cannot be resolved, and says so.
   */
  const start = useCallback(
    async (id: string | null) => {
      const current = (engine.current ??= createEngine(volume));
      const mine = ++generation.current;

      setState('loading');
      setError(null);

      try {
        let upcoming = id ? await radio.get(id) : null;

        if (id && !upcoming) {
          setError(ERROR_MESSAGES.missing);
        }

        upcoming ??= await radio.next(history.current);

        if (mine !== generation.current) {
          return;
        }

        history.current = [...history.current, upcoming.id].slice(
          -HISTORY_LENGTH
        );
        setTrack(upcoming);
        navigate(toPath(upcoming.id), { replace: true });

        await current.play(upcoming.source, () => {
          if (mine === generation.current) {
            void start(null);
          }
        });

        if (mine === generation.current) {
          setState('playing');
        }
      } catch (caught) {
        console.error('Music Visualiser: could not start a track', caught);

        if (mine === generation.current) {
          setError(ERROR_MESSAGES.next);
          setState('paused');
        }
      }
    },
    [navigate, volume]
  );

  const next = useCallback(() => void start(null), [start]);

  const toggle = useCallback(() => {
    const current = engine.current;

    if (!current || state === 'idle') {
      void start(requestedId);

      return;
    }

    if (state === 'playing') {
      current.pause();
      setState('paused');

      return;
    }

    if (state === 'paused') {
      if (track) {
        void current.resume().then(() => setState('playing'));
      } else {
        void start(null);
      }
    }
  }, [requestedId, start, state, track]);

  const setVolume = useCallback(
    (value: number) => {
      const clamped = clampVolume(value);

      setVolumeState(clamped);
      engine.current?.setVolume(clamped);
      storage.setItem(VOLUME_STORAGE_KEY, clamped as never);
    },
    [storage]
  );

  /*
   * The URL changed under us. Before anything plays, resolve the track it
   * names so the gate can say what it will play. Once playing, a different
   * id means the listener went back or forward, or followed a link: play it.
   * Our own `replace` after a track starts arrives here too, with the id of
   * the track already playing, and is ignored.
   */
  useEffect(() => {
    if (stateRef.current === 'idle') {
      if (!requestedId) {
        setRequested(null);

        return;
      }

      let cancelled = false;

      void radio.get(requestedId).then((found) => {
        if (!cancelled) {
          setRequested(found);
        }
      });

      return () => {
        cancelled = true;
      };
    }

    if (requestedId && requestedId !== trackRef.current?.id) {
      void start(requestedId);
    }
  }, [requestedId, start]);

  // Silence the graph when the view unmounts; the context is not reusable.
  useEffect(() => {
    return () => {
      generation.current += 1;
      engine.current?.clear();
      void engine.current?.context.close();
      engine.current = null;
    };
  }, []);

  return {
    engine: engine.current,
    error,
    next,
    requested,
    setVolume,
    state,
    toggle,
    track,
    volume,
  };
}
