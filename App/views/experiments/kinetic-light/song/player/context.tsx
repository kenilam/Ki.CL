import React, { useCallback, useContext, useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// API
import { useApolloClient } from 'api/provider';

// Readers
import type { Piece } from '@/views/experiments/kinetic-light/read/piece';

// Song
import { DEFAULT_SETTINGS } from '@/views/experiments/kinetic-light/stage/settings';
import {
  useSong,
  type Song,
} from '@/views/experiments/kinetic-light/song/use-song';

// Hooks
import { useTransport, type Transport } from './use-transport';

// Constants
import { PATH as EXPERIMENTS } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/kinetic-light/constants';

type Choice = Pick<
  NonNullable<Song['arrangement']>,
  'beat' | 'glow' | 'hue' | 'speed' | 'voice'
>;

type Value = {
  loading: boolean;
  piece: Piece;
  playable: boolean;
  save: <Key extends keyof Choice>(key: Key, value: Choice[Key]) => void;
  song?: Song;
  transport: Transport;
};

const Context = React.createContext<Value | null>(null);

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
  const { t } = useTranslation();
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

  useEffect(() => {
    if (!piece) {
      return;
    }

    document.title = t('document_title', {
      routes: [EXPERIMENTS, PATH, piece.title].join(' | '),
    });
  }, [piece, t]);

  return {
    loading,
    piece: piece ?? SILENCE,
    playable: Boolean(piece),
    save,
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

export { Context as PlayerContext, usePlayer, usePlayerContext };
