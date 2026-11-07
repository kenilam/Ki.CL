import React, { useCallback, useContext, useEffect, useRef } from 'react';

// API
import {
  useApolloClient,
  type Kicl_KineticLightReadingQuery,
} from 'api/provider';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

// Context
import type { Settings } from '@/views/experiments/kinetic-light/stage/context';

// Hooks
import { useSong } from './use-song';
import { useTransport, type Transport } from './use-transport';

import { DEFAULT as DEFAULT_SETTINGS } from './settings';

type Song = NonNullable<Kicl_KineticLightReadingQuery['kineticLightReading']>;

type Choice = Pick<
  NonNullable<Song['arrangement']>,
  'beat' | 'glow' | 'hue' | 'speed' | 'voice'
>;

type Value = {
  loading: boolean;
  piece: Piece;
  playable: boolean;
  save: <Key extends keyof Choice>(key: Key, value: Choice[Key]) => void;
  setSetting: (key: keyof Settings, value: number) => void;
  settings: React.RefObject<Settings>;
  song?: Song;
  transport: Transport;
};

const Context = React.createContext<Value | null>(null);

const settingsOf = (
  arrangement: Song['arrangement'] | undefined
): Settings => ({
  ...DEFAULT_SETTINGS,
  ...arrangement,
  glow: arrangement?.glow ?? DEFAULT_SETTINGS.glow,
  hue: arrangement?.hue ?? DEFAULT_SETTINGS.hue,
  speed: arrangement?.speed ?? DEFAULT_SETTINGS.speed,
});

const SILENCE: Piece = {
  beatsPerBar: 4,
  notes: [],
  source: 'notes',
  tempo: 120,
  title: '',
};

const START = {
  ...DEFAULT_SETTINGS,
  __typename: 'KineticLightArrangement',
  beat: 'KIT',
  sections: [],
  steps: 4,
  voice: 'GRAND',
};

const usePlayer = (): Value => {
  const client = useApolloClient();
  const { loading, piece, song } = useSong();
  const arrangement = song?.arrangement;
  const transport = useTransport(piece ?? SILENCE, arrangement);
  const save = useCallback<Value['save']>(
    (key, value) => {
      if (!song) {
        return;
      }

      client.cache.modify({
        fields: {
          arrangement: (existing: object | null) => ({
            ...START,
            ...existing,
            [key]: value,
          }),
        },
        id: client.cache.identify(song),
      });
    },
    [client, song]
  );
  const settings = useRef(settingsOf(arrangement));
  const setSetting = useCallback((key: keyof Settings, value: number) => {
    settings.current[key] = value;
  }, []);

  useEffect(() => {
    settings.current = settingsOf(arrangement);
  }, [arrangement, piece]);

  return {
    loading,
    piece: piece ?? SILENCE,
    playable: Boolean(piece),
    save,
    setSetting,
    settings,
    song,
    transport,
  };
};

const usePlayerContext = (): Value => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('usePlayerContext needs a Player above it.');
  }

  return value;
};

export {
  Context as PlayerContext,
  DEFAULT_SETTINGS,
  settingsOf,
  usePlayer,
  usePlayerContext,
  type Settings,
  type Song,
};
