import type {
  Provider,
  Track,
  Vibe,
  VibeFamily,
} from '@/Views/Experiments/MusicVisualiser/Spec';

/*
 * The built-in station. Its tracks are recipes for the synth rather than
 * files, so there is nothing to fetch and nothing that can be down.
 *
 * Titles are drawn from small word lists so a track can be named in the
 * chrome and told apart from the last one. They mean nothing.
 */

const NAME = 'Self composed Radio';

/** The group segment in the URL. */
const GROUP = 'self-composed';

/** Seconds per piece. Long enough to settle into; short enough to vary. */
const DURATION_SECONDS = 150;

const FAMILIES: VibeFamily[] = ['piano', 'lofi', 'ambient'];

const VIBES: Record<VibeFamily, Vibe> = {
  ambient: {
    energy: 0.25,
    family: 'ambient',
    scenes: { pools: 0.6, ribbons: 0.4 },
    warmth: 0.35,
  },
  lofi: {
    energy: 0.55,
    family: 'lofi',
    scenes: { pools: 0.3, ribbons: 0.3, rings: 0.4 },
    warmth: 0.8,
  },
  piano: {
    energy: 0.4,
    family: 'piano',
    scenes: { pools: 0.35, rings: 0.5, ribbons: 0.15 },
    warmth: 0.55,
  },
};

const FIRST = [
  'Amber',
  'Blue',
  'Early',
  'Evening',
  'Late',
  'Low',
  'Paper',
  'Quiet',
  'Slow',
  'Small',
];

const SECOND = [
  'Afternoon',
  'Corridor',
  'Garden',
  'Harbour',
  'Kitchen',
  'Light',
  'Rain',
  'Room',
  'Tide',
  'Window',
];

const ARTISTS: Record<VibeFamily, string> = {
  ambient: `${NAME} · field`,
  lofi: `${NAME} · tape`,
  piano: `${NAME} · keys`,
};

/**
 * A cheap hash from the seed to a pair of words, so the name follows the
 * seed the way the music does.
 */
function title(seed: number): string {
  const first = FIRST[seed % FIRST.length];
  const second = SECOND[Math.floor(seed / FIRST.length) % SECOND.length];

  return `${first} ${second}`;
}

function trackFor(seed: number, family: VibeFamily): Track {
  return {
    artist: ARTISTS[family],
    attribution: { label: 'Synthesised in your browser' },
    group: GROUP,
    id: String(seed),
    source: {
      durationSeconds: DURATION_SECONDS,
      kind: 'synth',
      seed,
      style: family,
    },
    station: NAME,
    title: title(seed),
    type: family,
    vibe: VIBES[family],
  };
}

function isFamily(type: string): type is VibeFamily {
  return (FAMILIES as string[]).includes(type);
}

/**
 * Random, but not too random: the family rotates so three piano pieces do
 * not land in a row, and the seed avoids anything already played.
 */
/** Seeds are a few digits; anything else is not one of ours. */
const SEED = /^\d{1,5}$/;

const key = (family: VibeFamily, seed: number) => `${GROUP}/${family}/${seed}`;

const builtIn: Provider = {
  async get(type, id) {
    if (!isFamily(type) || !SEED.test(id)) {
      return null;
    }

    return trackFor(Number(id), type);
  },
  group: GROUP,
  name: NAME,
  async next(played, type) {
    /* Held to a family if asked; otherwise never the family just played. */
    const families = type
      ? [type]
      : FAMILIES.filter(
          (family) => !played.at(-1)?.startsWith(`${GROUP}/${family}/`)
        );
    const family = families[Math.floor(Math.random() * families.length)];

    let seed = Math.floor(Math.random() * 10000);

    while (played.includes(key(family, seed))) {
      seed = (seed + 1) % 10000;
    }

    return trackFor(seed, family);
  },
  types: FAMILIES,
};

export { GROUP, NAME, trackFor };
export default builtIn;
