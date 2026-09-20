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

const NAME = 'Ki radio';

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
  ambient: 'Ki radio · field',
  lofi: 'Ki radio · tape',
  piano: 'Ki radio · keys',
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
    id: `built-in:${family}:${seed}`,
    source: {
      durationSeconds: DURATION_SECONDS,
      kind: 'synth',
      seed,
      style: family,
    },
    station: NAME,
    title: title(seed),
    vibe: VIBES[family],
  };
}

/**
 * Random, but not too random: the family rotates so three piano pieces do
 * not land in a row, and the seed avoids anything already played.
 */
const builtIn: Provider = {
  name: NAME,
  async next(played) {
    const families = FAMILIES.filter(
      (family) => !played.at(-1)?.startsWith(`built-in:${family}:`)
    );
    const family = families[Math.floor(Math.random() * families.length)];

    let seed = Math.floor(Math.random() * 10000);

    while (played.includes(`built-in:${family}:${seed}`)) {
      seed = (seed + 1) % 10000;
    }

    return trackFor(seed, family);
  },
};

export { NAME, trackFor };
export default builtIn;
