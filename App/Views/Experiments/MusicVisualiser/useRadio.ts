import { useCallback, useEffect, useRef, useState } from 'react';

// Context
import { useLocalStorageContext } from '@/LocalStorage';

// Spec
import type { PlaybackState, Track } from './Spec';

// Audio
import { createEngine, type Engine } from './Audio/engine';

// Providers
import radio from './Providers';

// Constants
import { VOLUME_STORAGE_KEY } from './constants';

/*
 * Playback state for the whole view: what is playing, whether it is, how
 * loud, and the engine behind it. The engine is made on the first press of
 * play - never on mount - because that press is the gesture the browser
 * needs before it will make a sound.
 */

const DEFAULT_VOLUME = 0.8;

/** Tracks remembered for the provider's no-repeat list. */
const HISTORY_LENGTH = 24;

const ERROR_MESSAGES = {
  next: 'Could not find the next track. Try again.',
};

export type Radio = {
  engine: Engine | null;
  error: string | null;
  /** Play if paused or idle; pause if playing. */
  next(): void;
  setVolume(volume: number): void;
  state: PlaybackState;
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
  const engine = useRef<Engine | null>(null);
  const history = useRef<string[]>([]);
  const generation = useRef(0);

  const [state, setState] = useState<PlaybackState>('idle');
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() =>
    clampVolume(storage.getItem(VOLUME_STORAGE_KEY) ?? DEFAULT_VOLUME)
  );

  const next = useCallback(async () => {
    const current = (engine.current ??= createEngine(volume));
    const mine = ++generation.current;

    setState('loading');
    setError(null);

    try {
      const upcoming = await radio.next(history.current);

      if (mine !== generation.current) {
        return;
      }

      history.current = [...history.current, upcoming.id].slice(
        -HISTORY_LENGTH
      );
      setTrack(upcoming);

      await current.play(upcoming.source, () => {
        if (mine === generation.current) {
          void next();
        }
      });

      if (mine === generation.current) {
        setState('playing');
      }
    } catch (caught) {
      console.error('Music Visualiser: next track failed', caught);

      if (mine === generation.current) {
        setError(ERROR_MESSAGES.next);
        setState('paused');
      }
    }
  }, [volume]);

  const toggle = useCallback(() => {
    const current = engine.current;

    if (!current || state === 'idle') {
      void next();

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
        void next();
      }
    }
  }, [next, state, track]);

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
    state,
    toggle,
    track,
    volume,
  };
}
