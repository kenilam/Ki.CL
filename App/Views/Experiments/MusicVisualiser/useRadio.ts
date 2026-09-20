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
 * The URL is in charge: on a track's play route the track plays, and off
 * it nothing does. That route calls `start` when it mounts and `stop` when
 * it unmounts; skipping and a track ending navigate to the next track's
 * play route, and that route does the starting; pausing is leaving the
 * route, and the engine holds the track so coming back resumes it. So the
 * address bar is always a link to what is playing, and back and forward
 * through the history move between tracks like any other navigation.
 */

const DEFAULT_VOLUME = 0.5;

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
  /**
   * Play this track now, or resume it if it is the one held paused.
   * Resolves `false` when the browser will not sound it without a gesture.
   */
  start(track: Track): Promise<boolean>;
  state: PlaybackState;
  /** Hold the track, silent; the play route left. */
  stop(): void;
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
  const stateRef = useRef<PlaybackState>('idle');
  const volumeRef = useRef(DEFAULT_VOLUME);

  const [state, setState] = useState<PlaybackState>('idle');
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() =>
    clampVolume(storage.getItem(VOLUME_STORAGE_KEY) ?? DEFAULT_VOLUME)
  );

  trackRef.current = track;
  stateRef.current = state;
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
    async (upcoming: Track): Promise<boolean> => {
      const current = (engine.current ??= createEngine(volumeRef.current, {
        samplesUrl,
      }));
      const mine = ++generation.current;
      const held = trackRef.current;
      const resuming =
        held !== null &&
        trackKey(held) === trackKey(upcoming) &&
        stateRef.current === 'paused';

      setState('loading');
      setError(null);

      if (!resuming) {
        history.current = [...history.current, trackKey(upcoming)].slice(
          -HISTORY_LENGTH
        );
        setTrack(upcoming);
      }

      try {
        if (resuming) {
          await current.resume();
        } else {
          await current.play(upcoming.source, () => {
            if (mine === generation.current) {
              void next();
            }
          });
        }

        if (mine === generation.current) {
          setState('playing');
        }

        return true;
      } catch (caught) {
        if (mine !== generation.current) {
          return true;
        }

        if (caught instanceof PlaybackBlockedError) {
          setState('idle');

          return false;
        }

        console.error('Music Visualiser: could not start a track', caught);
        setError(ERROR_MESSAGES.play);
        setState('paused');

        return true;
      }
    },
    [next, samplesUrl]
  );

  const stop = useCallback(() => {
    generation.current += 1;
    engine.current?.pause();
    setState(trackRef.current ? 'paused' : 'idle');
  }, []);

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
    start,
    state,
    stop,
    track,
    volume,
  };
}
