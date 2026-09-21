import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

import type { Track } from './Catalog';

/** Route segment for this view. */
const PATH = 'music-visualiser';

/** The dynamic segments beneath it: `/:group/:type/:track`, then `/play`. */
const PARAMS = {
  group: 'group',
  track: 'track',
  type: 'type',
} as const;

const PLAY = 'play';

const BASE = `/${EXPERIMENTS}/${PATH}`;

/** Whole patterns, for `useMatch`: a track, and a track that is playing. */
const TRACK_ROUTE = `${BASE}/:${PARAMS.group}/:${PARAMS.type}/:${PARAMS.track}`;
const PLAY_ROUTE = `${TRACK_ROUTE}/${PLAY}`;

/** Root of every class and custom property this view owns. */
const CLASS_NAME = 'kicl--views--experiments--music-visualiser';

/** Local storage key for the listener's volume, in `[0, 1]`. */
const VOLUME_STORAGE_KEY = `${CLASS_NAME}--volume`;

type Location = {
  group?: string | null;
  track?: string | null;
  type?: string | null;
};

/**
 * Absolute path for a group, a type within it, or a track within that; or
 * the view itself when nothing is given. Deeper segments are only written
 * when the shallower ones are, so the result is always a valid prefix.
 */
const toPath = ({ group, type, track }: Location = {}): string => {
  const segments = [BASE];

  if (group) {
    segments.push(group);

    if (type) {
      segments.push(type);

      if (track) {
        segments.push(track);
      }
    }
  }

  return segments.join('/');
};

/** A track's own path: its gate. */
const toTrackPath = (track: Pick<Track, 'group' | 'id' | 'type'>): string =>
  toPath({ group: track.group, track: track.id, type: track.type });

/** The path that plays a track. */
const toPlayPath = (track: Pick<Track, 'group' | 'id' | 'type'>): string =>
  `${toTrackPath(track)}/${PLAY}`;

export {
  CLASS_NAME,
  PARAMS,
  PATH,
  PLAY,
  PLAY_ROUTE,
  TRACK_ROUTE,
  VOLUME_STORAGE_KEY,
  toPath,
  toPlayPath,
  toTrackPath,
};
