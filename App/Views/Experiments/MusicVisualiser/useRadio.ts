import { useCallback, useEffect, useRef, useState } from 'react';

// Routes
import { useMatch, useNavigate } from '@/Router';

// Context
import { useEnvContext } from '@/Env/Client';
import { useLocalStorageContext } from '@/LocalStorage';

// Spec
import type { PlaybackState, Track } from './Spec';

// Audio
import { createEngine, type Engine } from './Audio/engine';

// Providers
import radio from './Providers';

// Constants
import {
  FULL_PATTERN,
  PARAMS,
  VOLUME_STORAGE_KEY,
  toTrackPath,
  trackKey,
} from './constants';

/*
 * Playback state for the whole view: what is playing, whether it is, how
 * loud, and the engine behind it. The engine is made on the first press of
 * play - never on mount - because that press is the gesture the browser
 * needs before it will make a sound.
 *
 * The URL carries the track as `/:group/:type/:trackId`. Every track that
 * starts is written to it, so the address bar is always a link to what is
 * playing; a track named in the URL on arrival is the one the gate offers
 * to play; and back and forward through the history move between tracks
 * like any other navigation. The shell sits above the nested routes, so it
 * reads the path by matching it rather than from its own params.
 */

const DEFAULT_VOLUME = 0.8;

/** Tracks remembered for the provider's no-repeat list. */
const HISTORY_LENGTH = 24;

const ERROR_MESSAGES = {
  next: 'Could not find the next track. Try again.',
  missing: 'That track could not be found. Playing something else.',
};

/** Where the URL points: a group at least, a type and a track when there. */
type Target = {
  group?: string;
  id?: string;
  type?: string;
};

export type Radio = {
  engine: Engine | null;
  error: string | null;
  /** Skip to another track. */
  next(): void;
  /**
   * What the first press will play, before anything has: the track the URL
   * names, or the radio's pick when it names none. The gate links to it, so
   * the play control is an anchor with a real destination.
   */
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
  const { env } = useEnvContext();
  const samplesUrl = env?.KICL_MUSIC_SAMPLES_URL || undefined;
  const navigate = useNavigate();
  const match = useMatch(FULL_PATTERN);

  const group = match?.params[PARAMS.group];
  const type = match?.params[PARAMS.type];
  const id = match?.params[PARAMS.track];
  const targetKey = group && type && id ? `${group}/${type}/${id}` : null;

  const engine = useRef<Engine | null>(null);
  const history = useRef<string[]>([]);
  const generation = useRef(0);
  const trackRef = useRef<Track | null>(null);
  const stateRef = useRef<PlaybackState>('idle');
  const targetRef = useRef<Target>({});

  const [state, setState] = useState<PlaybackState>('idle');
  const [track, setTrack] = useState<Track | null>(null);
  const [requested, setRequested] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() =>
    clampVolume(storage.getItem(VOLUME_STORAGE_KEY) ?? DEFAULT_VOLUME)
  );

  trackRef.current = track;
  stateRef.current = state;
  targetRef.current = { group, id, type };

  /**
   * Start a track: the one at `at`, or the provider's next choice. Falls
   * back to the next choice when a named track cannot be resolved, and says
   * so.
   */
  const start = useCallback(
    async (at: Target | null) => {
      const current = (engine.current ??= createEngine(volume, { samplesUrl }));
      const mine = ++generation.current;

      setState('loading');
      setError(null);

      try {
        let upcoming =
          at?.group && at.type && at.id
            ? await radio.get(at.group, at.type, at.id)
            : null;

        if (at?.id && !upcoming) {
          setError(ERROR_MESSAGES.missing);
        }

        upcoming ??= await radio.next(history.current, at?.group);

        if (mine !== generation.current) {
          return;
        }

        history.current = [...history.current, trackKey(upcoming)].slice(
          -HISTORY_LENGTH
        );
        setTrack(upcoming);
        navigate(toTrackPath(upcoming), { replace: true });

        await current.play(upcoming.source, () => {
          if (mine === generation.current) {
            void start({ group: upcoming.group });
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
    [navigate, samplesUrl, volume]
  );

  /* Skipping stays within the station that is playing. */
  const next = useCallback(
    () =>
      void start({ group: trackRef.current?.group ?? targetRef.current.group }),
    [start]
  );

  const toggle = useCallback(() => {
    const current = engine.current;

    if (!current || state === 'idle') {
      void start(requested ?? targetRef.current);

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
        void start({ group: targetRef.current.group });
      }
    }
  }, [requested, start, state, track]);

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
   * The URL changed under us. Before anything plays, settle what the gate
   * will play: the track the URL names, or, when it names none, the radio's
   * own pick within the group, so the play control can link to a real track
   * either way. Once playing, a different track means the listener went
   * back or forward, or followed a link: play it. Our own `replace` after a
   * track starts arrives here too, with the track already playing, and is
   * ignored.
   */
  useEffect(() => {
    const at = targetRef.current;

    if (stateRef.current === 'idle') {
      let cancelled = false;

      const settle =
        at.group && at.type && at.id
          ? radio
              .get(at.group, at.type, at.id)
              .then((found) => found ?? radio.next([], at.group))
          : radio.next([], at.group);

      void settle
        .then((found) => {
          if (!cancelled) {
            setRequested(found);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setRequested(null);
          }
        });

      return () => {
        cancelled = true;
      };
    }

    if (
      targetKey &&
      trackRef.current &&
      targetKey !== trackKey(trackRef.current)
    ) {
      void start(at);
    }
  }, [group, targetKey, start]);

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
