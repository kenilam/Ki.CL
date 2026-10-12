/*
 * The Open Lo-Fi catalogue, as published in the collection's `catalog.json`
 * (version 1.0.0, 166 tracks). Regenerate from that file when the
 * collection changes; the audio itself is served from the static bucket.
 * Titles and category names are writing, so they are in the
 * `music-visualiser` namespace: `track.<category>.<file>` and
 * `category_<slug>`.
 */

export type Entry = {
  category: string;
  filename: string;
};

/** The category slugs, which are the types in the URL. */
export const CATEGORIES: readonly string[] = [
  'chillhop',
  'jazzhop',
  'ambient-lofi',
  'soul-rnb',
  'asian-lofi',
  'funk-soul',
  'seasonal-weather',
  'late-night',
  'activities',
  'hybrid',
];

export const TRACKS: readonly Entry[] = [
  {
    category: 'activities',
    filename: '2-am-debug-loop.mp3',
  },
  {
    category: 'activities',
    filename: 'brushstrokes-and-rain.mp3',
  },
  {
    category: 'activities',
    filename: 'butter-and-windowlight.mp3',
  },
  {
    category: 'activities',
    filename: 'chapter-by-lamplight.mp3',
  },
  {
    category: 'activities',
    filename: 'coffee-ring-notebook.mp3',
  },
  {
    category: 'activities',
    filename: 'continue-screen-dreams.mp3',
  },
  {
    category: 'activities',
    filename: 'cursor-after-midnight.mp3',
  },
  {
    category: 'activities',
    filename: 'dog-eared-pages.mp3',
  },
  {
    category: 'activities',
    filename: 'dust-in-the-curtains.mp3',
  },
  {
    category: 'activities',
    filename: 'exhale-the-morning.mp3',
  },
  {
    category: 'activities',
    filename: 'faded-corners-of-the-page.mp3',
  },
  {
    category: 'activities',
    filename: 'first-coffee-thoughts.mp3',
  },
  {
    category: 'activities',
    filename: 'graphite-in-the-quiet.mp3',
  },
  {
    category: 'activities',
    filename: 'graphite-mornings.mp3',
  },
  {
    category: 'activities',
    filename: 'hour-between-clicks.mp3',
  },
  {
    category: 'activities',
    filename: 'kettle-before-work.mp3',
  },
  {
    category: 'activities',
    filename: 'margin-notes-at-dusk.mp3',
  },
  {
    category: 'activities',
    filename: 'mat-and-morning-light.mp3',
  },
  {
    category: 'activities',
    filename: 'morning-in-the-hiss.mp3',
  },
  {
    category: 'activities',
    filename: 'morning-pages.mp3',
  },
  {
    category: 'activities',
    filename: 'pancakes-in-the-sun.mp3',
  },
  {
    category: 'activities',
    filename: 'penciled-sunbeams.mp3',
  },
  {
    category: 'activities',
    filename: 'pixel-quest-save-point.mp3',
  },
  {
    category: 'activities',
    filename: 'quiet-lungs-quiet-light.mp3',
  },
  {
    category: 'activities',
    filename: 'stacks-of-quiet-hours.mp3',
  },
  {
    category: 'activities',
    filename: 'sunday-light-through-lace.mp3',
  },
  {
    category: 'activities',
    filename: 'sunrise-stretch-flow.mp3',
  },
  {
    category: 'activities',
    filename: 'terminal-rain.mp3',
  },
  {
    category: 'activities',
    filename: 'watercolors-by-the-window.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'almost-floating.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'aurora-on-mute.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'blue-below-the-surface.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'cathedral-hiss.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'deep-space-loop.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'drifting-through-fog.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'first-light-on-the-ridge.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'ghosts-on-the-hillside.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'glasshouse-ghosts.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'green-after-midnight.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'misty-mountain-sunrise.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'moonlit-moss.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'orbiting-in-silence.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'polar-afterglow.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'satellite-lullaby.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'sea-glass-evening.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'soft-weightless-hours.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'stained-glass-static.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'tide-pools-at-twilight.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'underwater-dreamscape.mp3',
  },
  {
    category: 'ambient-lofi',
    filename: 'warm-constellations.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'bamboo-shadow-waltz.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'bells-before-sunrise.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'lanterns-in-slow-motion.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'misty-steam-quiet-dreams.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'moon-through-bamboo.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'paper-lantern-rain.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'teacup-morning-fog.mp3',
  },
  {
    category: 'asian-lofi',
    filename: 'temple-at-dawn.mp3',
  },
  {
    category: 'chillhop',
    filename: 'dusk-between-stoops.mp3',
  },
  {
    category: 'chillhop',
    filename: 'dust-on-the-morning-keys.mp3',
  },
  {
    category: 'chillhop',
    filename: 'glow-on-the-overpass.mp3',
  },
  {
    category: 'chillhop',
    filename: 'porchlight-golden-hour.mp3',
  },
  {
    category: 'chillhop',
    filename: 'sidewalk-slow-jam.mp3',
  },
  {
    category: 'chillhop',
    filename: 'soft-gold-sky.mp3',
  },
  {
    category: 'chillhop',
    filename: 'sunset-offbeat.mp3',
  },
  {
    category: 'chillhop',
    filename: 'window-seat-daydream.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'basement-groove-86.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'block-party-slow-jam.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'burnt-sunset-groove.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'cassette-basement-bounce.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'dust-on-the-needle.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'dusty-jukebox-heart.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'grandmas-kitchen-on-sunday.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'mirrorball-slow-roll.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'motel-soul-radio.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'neon-on-the-diner-floor.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'peach-cobbler-static.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'roller-rink-reverie.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'smoke-in-the-orange-sky.mp3',
  },
  {
    category: 'funk-soul',
    filename: 'summer-curbside-glow.mp3',
  },
  { category: 'hybrid', filename: 'cafe-da-tarde.mp3' },
  {
    category: 'hybrid',
    filename: 'cassette-pastel-nights.mp3',
  },
  {
    category: 'hybrid',
    filename: 'dusk-on-red-earth.mp3',
  },
  {
    category: 'hybrid',
    filename: 'end-scene-glow.mp3',
  },
  {
    category: 'hybrid',
    filename: 'midnight-steam-and-mango-skin.mp3',
  },
  { category: 'hybrid', filename: 'quiet-credits.mp3' },
  {
    category: 'hybrid',
    filename: 'savanna-slow-glow.mp3',
  },
  { category: 'hybrid', filename: 'vhs-heartbeat.mp3' },
  {
    category: 'jazzhop',
    filename: 'ashes-in-the-coffee-cup.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'breezy-afternoon-terrace.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'candlelit-at-70-bpm.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'dust-and-hardcovers.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'harbor-before-words.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'last-call-in-c-minor.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'linen-and-limoncello.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'midnight-amber-room.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'rain-on-the-boulevard.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'saxophone-in-the-rain.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'stacks-of-quiet-books.mp3',
  },
  {
    category: 'jazzhop',
    filename: 'velvet-cigarette-haze.mp3',
  },
  { category: 'late-night', filename: '3-am-echoes.mp3' },
  {
    category: 'late-night',
    filename: 'antenna-after-midnight.mp3',
  },
  {
    category: 'late-night',
    filename: 'blinds-and-headlights.mp3',
  },
  {
    category: 'late-night',
    filename: 'electric-puddles.mp3',
  },
  {
    category: 'late-night',
    filename: 'elevator-to-the-moon.mp3',
  },
  {
    category: 'late-night',
    filename: 'empty-street-static.mp3',
  },
  {
    category: 'late-night',
    filename: 'half-empty-coupe.mp3',
  },
  {
    category: 'late-night',
    filename: 'headlights-on-the-divider.mp3',
  },
  {
    category: 'late-night',
    filename: 'high-rise-haze.mp3',
  },
  {
    category: 'late-night',
    filename: 'last-call-at-table-nine.mp3',
  },
  {
    category: 'late-night',
    filename: 'last-train-home.mp3',
  },
  {
    category: 'late-night',
    filename: 'midnight-on-my-mind.mp3',
  },
  {
    category: 'late-night',
    filename: 'midnight-window-glow.mp3',
  },
  {
    category: 'late-night',
    filename: 'platform-after-rain.mp3',
  },
  {
    category: 'late-night',
    filename: 'rain-off-the-neon-signs.mp3',
  },
  {
    category: 'late-night',
    filename: 'rooftop-static-dreams.mp3',
  },
  {
    category: 'late-night',
    filename: 'streetlights-in-the-rearview.mp3',
  },
  {
    category: 'late-night',
    filename: 'warm-mile-markers.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'a-taste-of-spring.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'after-school-rain.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'amber-sidewalks.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'amber-windowpane.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'autumn-on-the-window-glass.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'bloom-between-showers.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'blossoms-on-the-pavement.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'embers-after-midnight.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'fallen-leaves-loop.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'fieldnotes-at-dawn.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'fireplace-loop.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'hammock-in-the-shade.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'lemonade-film-grain.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'mist-over-green-fields.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'moon-over-red-dunes.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'palm-breeze-nap.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'petals-after-rain.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'petals-in-the-breeze.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'picnic-polaroids.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'sidewalk-puddles.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'snow-on-the-needle.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'spring-garden-loops.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'starlight-in-the-sand.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'storm-over-side-streets.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'thunder-in-the-dust.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'tide-stained-polaroids.mp3',
  },
  {
    category: 'seasonal-weather',
    filename: 'winter-turntable.mp3',
  },
  {
    category: 'soul-rnb',
    filename: '3am-sink-light.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'barefoot-in-the-kitchen.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'candle-wax-heart.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'envelope-on-the-bed.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'golden-afternoon-groove.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'honey-on-the-speakers.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'kitchen-after-the-party.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'lazy-love-letter-afternoon.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'midnight-notes-on-the-floor.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'midnight-table-talk.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'old-photos-new-heart.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'polaroids-in-a-shoebox.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'porcelain-heartbeat.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'rain-on-your-hoodie.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'record-player-embrace.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'rooftop-slow-jam.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'scattered-sheet-music.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'skyline-and-satin.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'slow-dance-in-the-living-room.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'slow-dancing-by-the-stove.mp3',
  },
  {
    category: 'soul-rnb',
    filename: 'velvet-candle-smoke.mp3',
  },
];
