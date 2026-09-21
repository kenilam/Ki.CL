import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

import type { Track } from './Spec';

/** Route segment for this view. */
const PATH = 'music-visualiser';

/**
 * The dynamic segments beneath it: `/:group/:type/:trackId`, then `/play`.
 * A group is a station (a provider), a type one of its families, a track
 * one piece. The view's index and a track's route each show a gate with a
 * play control; a group's and a type's index redirect to their first
 * child; the play route beneath a track is the one that sounds.
 */
const PARAMS = {
  group: 'group',
  track: 'trackId',
  type: 'type',
} as const;

const GROUP_PATTERN = `:${PARAMS.group}`;
const TYPE_PATTERN = `:${PARAMS.type}`;
const TRACK_PATTERN = `:${PARAMS.track}`;
const PLAY_PATTERN = 'play';

/** Root of every class and custom property this view owns. */
const CLASS_NAME = 'kicl--views--experiments--music-visualiser';

/** Local storage key for the listener's volume, in `[0, 1]`. */
const VOLUME_STORAGE_KEY = `${CLASS_NAME}--volume`;

type Location = {
  group?: string | null;
  trackId?: string | null;
  type?: string | null;
};

/**
 * Absolute path for a group, a type within it, or a track within that; or
 * the view itself when nothing is given. Deeper segments are only written
 * when the shallower ones are, so the result is always a valid prefix.
 */
const toPath = ({ group, type, trackId }: Location = {}): string => {
  const segments = [`/${EXPERIMENTS}/${PATH}`];

  if (group) {
    segments.push(group);

    if (type) {
      segments.push(type);

      if (trackId) {
        segments.push(trackId);
      }
    }
  }

  return segments.join('/');
};

/** A track's own path. */
const toTrackPath = (track: Pick<Track, 'group' | 'id' | 'type'>): string =>
  toPath({ group: track.group, trackId: track.id, type: track.type });

/** The path that plays a track. */
const toPlayPath = (track: Pick<Track, 'group' | 'id' | 'type'>): string =>
  `${toTrackPath(track)}/${PLAY_PATTERN}`;

/** The key a track is remembered by in history: its path below the view. */
const trackKey = (track: Pick<Track, 'group' | 'id' | 'type'>): string =>
  `${track.group}/${track.type}/${track.id}`;

export {
  CLASS_NAME,
  GROUP_PATTERN,
  PARAMS,
  PATH,
  PLAY_PATTERN,
  TRACK_PATTERN,
  TYPE_PATTERN,
  VOLUME_STORAGE_KEY,
  toPath,
  toPlayPath,
  toTrackPath,
  trackKey,
};
