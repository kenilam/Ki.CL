import { CATEGORIES, TRACKS, type Entry } from './catalog';

/*
 * The one station: Open Lo-Fi, a public-domain (CC0) collection of lo-fi
 * tracks by Bilal Tahir. Its ten categories are the types in the URL, and
 * a track's id is its filename without the extension. The files are served
 * from the static bucket through the same-origin `/assets/static` route, so
 * the analyser is allowed to read them.
 */

const GROUP = 'open-lofi';

const NAME = 'Open Lo-Fi';

const BASE_URL = '/assets/static/music/open-lofi';

const ATTRIBUTION = {
  label: 'Open Lo-Fi by Bilal Tahir · CC0',
  url: 'https://github.com/btahir/open-lofi',
};

export type Track = {
  /** The category's label, shown under the title. */
  category: string;
  group: string;
  id: string;
  title: string;
  type: string;
  url: string;
};

const TYPES: readonly string[] = CATEGORIES.map((category) => category.slug);

const idOf = (entry: Entry) => entry.filename.replace(/\.mp3$/, '');

const toTrack = (entry: Entry): Track => ({
  category:
    CATEGORIES.find((category) => category.slug === entry.category)?.label ??
    NAME,
  group: GROUP,
  id: idOf(entry),
  title: entry.title,
  type: entry.category,
  url: `${BASE_URL}/${entry.filename}`,
});

/** What a track is remembered by, so a draw can avoid it. */
const keyOf = (track: Pick<Track, 'id' | 'type'>) =>
  `${track.type}/${track.id}`;

/** The track at `/:type/:id`, or `null` if the catalogue has none. */
function find(type: string, id: string): Track | null {
  const entry = TRACKS.find(
    (item) => item.category === type && idOf(item) === id
  );

  return entry ? toTrack(entry) : null;
}

/**
 * A track at random, held to `type` when given, and not one of `played`
 * while any other is left.
 */
function draw({
  played = [],
  type,
}: { played?: readonly string[]; type?: string } = {}): Track {
  const pool = TRACKS.map(toTrack).filter(
    (track) => !type || track.type === type
  );
  const fresh = pool.filter((track) => !played.includes(keyOf(track)));
  const choices = fresh.length > 0 ? fresh : pool;

  return choices[Math.floor(Math.random() * choices.length)];
}

export { ATTRIBUTION, GROUP, NAME, TYPES, draw, find, keyOf };
