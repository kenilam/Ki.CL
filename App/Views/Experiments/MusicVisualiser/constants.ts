import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

/** Route segment for this view. */
const PATH = 'music-visualiser';

/**
 * Dynamic segment carrying the track - `/:trackId`. Optional, and on the
 * same route as the view rather than a child of it, so moving between "no
 * track" and "this track" never remounts the player mid-song.
 */
const PARAM = 'trackId';

const TRACK_PATTERN = `:${PARAM}?`;

/** Root of every class and custom property this view owns. */
const CLASS_NAME = 'kicl--views--experiments--music-visualiser';

/** Local storage key for the listener's volume, in `[0, 1]`. */
const VOLUME_STORAGE_KEY = `${CLASS_NAME}--volume`;

/**
 * Absolute path for a track, or for the view itself when no track is given.
 * The URL is the single source of truth for what is playing: every track
 * that starts is written here, and a visit to a track's URL plays it.
 *
 * Track ids are built to be URL-safe (`built-in:piano:1234`), so they go in
 * as they are; a colon is legal in a path segment and reads better than
 * `%3A`.
 */
const toPath = (trackId?: string | null): string =>
  trackId ? `/${EXPERIMENTS}/${PATH}/${trackId}` : `/${EXPERIMENTS}/${PATH}`;

export { CLASS_NAME, PARAM, PATH, TRACK_PATTERN, VOLUME_STORAGE_KEY, toPath };
