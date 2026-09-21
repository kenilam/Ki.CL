import type {
  Provider,
  Track,
  Vibe,
} from '@/Views/Experiments/MusicVisualiser/Spec';

import { CATEGORIES, TRACKS, type Entry } from './catalog';

/*
 * Open Lo-Fi: a public-domain (CC0) collection of lo-fi tracks by Bilal
 * Tahir, https://github.com/btahir/open-lofi. Its ten categories are the
 * station's types; a track's id is its filename without the extension.
 *
 * The audio is streamed from the static bucket through the same-origin
 * `/assets/static` route, so the analyser may read it. The base is set by
 * the shell from `KICL_MUSIC_OPEN_LOFI_URL`; see `configure`.
 */

const NAME = 'Open Lo-Fi';

/** The group segment in the URL. */
const GROUP = 'open-lofi';

/** Where the files live unless the environment says otherwise. */
const DEFAULT_URL = '/assets/static/music/open-lofi';

const ATTRIBUTION = {
  label: 'Open Lo-Fi by Bilal Tahir · CC0',
  url: 'https://github.com/btahir/open-lofi',
};

/** How the picture dresses each category: family, energy, warmth, scenes. */
const VIBES: Record<string, Vibe> = {
  activities: {
    energy: 0.5,
    family: 'lofi',
    scenes: {
      bars: 0.4,
      hive: 0.4,
      pools: 0.3,
      rings: 0.3,
      terrain: 0.4,
      wave: 0.3,
    },
    warmth: 0.7,
  },
  'ambient-lofi': {
    energy: 0.3,
    family: 'ambient',
    scenes: {
      clouds: 0.6,
      orb: 0.5,
      pools: 0.4,
      stars: 0.5,
      tunnel: 0.2,
      wave: 0.3,
    },
    warmth: 0.35,
  },
  'asian-lofi': {
    energy: 0.4,
    family: 'lofi',
    scenes: {
      clouds: 0.4,
      hive: 0.3,
      kaleidoscope: 0.3,
      pools: 0.4,
      rings: 0.4,
      wave: 0.3,
    },
    warmth: 0.6,
  },
  chillhop: {
    energy: 0.55,
    family: 'lofi',
    scenes: {
      bars: 0.5,
      halo: 0.5,
      hive: 0.4,
      rings: 0.3,
      terrain: 0.4,
      tunnel: 0.3,
    },
    warmth: 0.75,
  },
  'funk-soul': {
    energy: 0.7,
    family: 'lofi',
    scenes: { bars: 0.5, halo: 0.5, hive: 0.5, kaleidoscope: 0.4, tunnel: 0.4 },
    warmth: 0.85,
  },
  hybrid: {
    energy: 0.55,
    family: 'lofi',
    scenes: {
      halo: 0.4,
      kaleidoscope: 0.4,
      orb: 0.4,
      stars: 0.3,
      terrain: 0.3,
      tunnel: 0.4,
    },
    warmth: 0.6,
  },
  jazzhop: {
    energy: 0.45,
    family: 'piano',
    scenes: {
      clouds: 0.3,
      halo: 0.4,
      pools: 0.4,
      rings: 0.5,
      stars: 0.3,
      wave: 0.4,
    },
    warmth: 0.7,
  },
  'late-night': {
    energy: 0.45,
    family: 'lofi',
    scenes: {
      bars: 0.3,
      halo: 0.3,
      orb: 0.4,
      stars: 0.5,
      tunnel: 0.4,
      wave: 0.3,
    },
    warmth: 0.5,
  },
  'seasonal-weather': {
    energy: 0.45,
    family: 'lofi',
    scenes: {
      clouds: 0.6,
      pools: 0.4,
      rings: 0.4,
      stars: 0.3,
      terrain: 0.3,
      wave: 0.3,
    },
    warmth: 0.6,
  },
  'soul-rnb': {
    energy: 0.5,
    family: 'lofi',
    scenes: {
      halo: 0.4,
      hive: 0.3,
      kaleidoscope: 0.3,
      pools: 0.4,
      rings: 0.4,
      wave: 0.4,
    },
    warmth: 0.85,
  },
};

const FALLBACK_VIBE: Vibe = VIBES.activities;

const TYPES: readonly string[] = CATEGORIES.map((category) => category.slug);

let baseUrl = DEFAULT_URL;

/** Point the station at where the files are served from. */
function configure(url: string | undefined): void {
  baseUrl = (url || DEFAULT_URL).replace(/\/+$/, '');
}

const idOf = (entry: Entry) => entry.filename.replace(/\.mp3$/, '');

const key = (entry: Entry) => `${GROUP}/${entry.category}/${idOf(entry)}`;

function trackFor(entry: Entry): Track {
  const category = CATEGORIES.find((item) => item.slug === entry.category);

  return {
    artist: category?.label ?? NAME,
    attribution: ATTRIBUTION,
    group: GROUP,
    id: idOf(entry),
    source: { kind: 'stream', url: `${baseUrl}/${entry.filename}` },
    station: NAME,
    title: entry.title,
    type: entry.category,
    vibe: VIBES[entry.category] ?? FALLBACK_VIBE,
  };
}

const openLofi: Provider = {
  async get(type, id) {
    const entry = TRACKS.find(
      (item) => item.category === type && idOf(item) === id
    );

    return entry ? trackFor(entry) : null;
  },
  group: GROUP,
  name: NAME,
  async next(played, type) {
    /* Held to a category if asked; otherwise never the category just played. */
    const last = played.at(-1);
    const categories = type
      ? [type]
      : TYPES.filter((slug) => !last?.startsWith(`${GROUP}/${slug}/`));
    const pool = TRACKS.filter((entry) => categories.includes(entry.category));
    const fresh = pool.filter((entry) => !played.includes(key(entry)));
    const choices = fresh.length > 0 ? fresh : pool;

    if (choices.length === 0) {
      throw new Error(`${NAME}: no track of type ${type ?? 'any'}`);
    }

    return trackFor(choices[Math.floor(Math.random() * choices.length)]);
  },
  types: TYPES,
};

export { GROUP, NAME, configure };
export default openLofi;
