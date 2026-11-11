import { useCallback } from 'react';

// API
import { useApolloClient } from 'api/provider';

// Song
import { useSongContext } from '@/views/experiments/kinetic-light/song/context';
import type { Song } from '@/views/experiments/kinetic-light/song/use-song';

// Stage
import { DEFAULT_SETTINGS } from '@/views/experiments/kinetic-light/stage/settings';

type Choice = Pick<
  NonNullable<Song['arrangement']>,
  'beat' | 'glow' | 'hue' | 'voice' | 'zoom'
>;

type Save = <Key extends keyof Choice>(key: Key, value: Choice[Key]) => void;

const START = {
  ...DEFAULT_SETTINGS,
  __typename: 'KineticLightArrangement',
  beat: 'KIT',
  sections: [],
  steps: 4,
  voice: 'GRAND',
};

const useSave = (): Save => {
  const client = useApolloClient();
  const { song } = useSongContext();

  return useCallback<Save>(
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
};

export { useSave };
