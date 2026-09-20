import { useCallback, useEffect, useRef, useState } from 'react';

// Routes
import { useNavigate } from '@/Router';

// Context
import { useEnvContext } from '@/Env/Client';
import { useLocalStorageContext } from '@/LocalStorage';

// Spec
import type { PlaybackState, Track } from './Spec';

// Audio
import {
  PlaybackBlockedError,
  createEngine,
  type Engine,
} from './Audio/engine';

// Providers
import radio from './Providers';

// Constants
import { VOLUME_STORAGE_KEY, toPlayPath, trackKey } from './constants';

/*
 * Playback for the whole view: what is playing, whether it is, how loud,
 * and the engine behind it. It lives in the shell, above the routes, so
 * the engine and the picture survive every change of URL.
 *
 * The URL is in charge. A track's play route starts that track, by calling
 * `start` when it mounts, and stops it when it unmounts; skipping and a
 * track ending navigate to the next track's play route, and that route
 * does the starting. So the address bar is always a link to what is
 * playing, and back and forward through the history move between tracks
 * like any other navigation.
 */

const DEFAULT_VOLUME = 0.8;

/** Tracks remembered for the provider's no-repeat list. */
const HISTORY_LENGTH = 24;

const ERROR_MESSAGES = {
  next: 'Could not find the next track. Try again.',
  play: 'Could not play this track. Try again.',
};

export type Radio = {
  engine: Engine | null;
  error: string | null;
  /** Go to another track, within the station that is playing. */
  next(): void;
  setVolume(volume: number): void;
  /** Play this track now. */
  start(track: Track): void;
  state: PlaybackState;
  /** Silence and forget the track; the play route left. */
  stop(): void;
  /** Play if paused or blocked; pause if playing. */
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
  const { env } = useEnvContext();
  const samplesUrl = env?.KICL_MUSIC_SAMPLES_URL || undefined;
  const navigate = useNavigate();

  const engine = useRef<Engine | null>(null);
  const history = useRef<string[]>([]);
  const generation = useRef(0);
  const trackRef = useRef<Track | null>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const [state, setState] = useState<PlaybackState>('idle');
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() =>
    clampVolume(storage.getItem(VOLUME_STORAGE_KEY) ?? DEFAULT_VOLUME)
  );

  trackRef.current = track;
  volumeRef.current = volume;

  /* The station's next pick, as a navigation to its play route. */
  const next = useCallback(async () => {
    try {
      const upcoming = await radio.next(
        history.current,
        trackRef.current?.group
      );

      navigate(toPlayPath(upcoming));
    } catch (caught) {
      console.error('Music Visualiser: could not find the next track', caught);
      setError(ERROR_MESSAGES.next);
    }
  }, [navigate]);

  const start = useCallback(
    async (upcoming: Track) => {
      const current = (engine.current ??= createEngine(volumeRef.current, {
        samplesUrl,
      }));
      const mine = ++generation.current;

      history.current = [...history.current, trackKey(upcoming)].slice(
        -HISTORY_LENGTH
      );
      setTrack(upcoming);
      setState('loading');
      setError(null);

      try {
        await current.play(upcoming.source, () => {
          if (mine === generation.current) {
            void next();
          }
        });

        if (mine === generation.current) {
          setState('playing');
        }
      } catch (caught) {
        if (mine !== generation.current) {
          return;
        }

        if (caught instanceof PlaybackBlockedError) {
          setState('blocked');

          return;
        }

        console.error('Music Visualiser: could not start a track', caught);
        setError(ERROR_MESSAGES.play);
        setState('paused');
      }
    },
    [next, samplesUrl]
  );

  const stop = useCallback(() => {
    generation.current += 1;
    engine.current?.clear();
    setState('idle');
  }, []);

  const toggle = useCallback(() => {
    const current = engine.current;
    const playing = trackRef.current;

    if (state === 'playing' && current) {
      current.pause();
      setState('paused');
    } else if (state === 'paused' && current) {
      void current.resume().then(() => setState('playing'));
    } else if (state === 'blocked' && playing) {
      void start(playing);
    }
  }, [start, state]);

  const setVolume = useCallback(
    (value: number) => {
      const clamped = clampVolume(value);

      setVolumeState(clamped);
      engine.current?.setVolume(clamped);
      storage.setItem(VOLUME_STORAGE_KEY, clamped as never);
    },
    [storage]
  );

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
    next: () => void next(),
    setVolume,
    start: (upcoming) => void start(upcoming),
    state,
    stop,
    toggle,
    track,
    volume,
  };
}
