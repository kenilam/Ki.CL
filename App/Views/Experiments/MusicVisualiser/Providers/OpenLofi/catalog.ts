/*
 * The Open Lo-Fi catalogue, as published in the collection's `catalog.json`
 * (version 1.0.0, 166 tracks). Regenerate from that file when the
 * collection changes; the audio itself is served from the static bucket.
 */

export type Category = {
  label: string;
  slug: string;
};

export type Entry = {
  category: string;
  filename: string;
  title: string;
};

export const CATEGORIES: readonly Category[] = [
  { label: 'Chillhop & Cozy Beats', slug: 'chillhop' },
  { label: 'Jazz Lounge & Bookstore Grooves', slug: 'jazzhop' },
  { label: 'Ambient Drift & Dreamscapes', slug: 'ambient-lofi' },
  { label: 'Soul, Slow Jams & Warm Rooms', slug: 'soul-rnb' },
  { label: 'Asian & Zen Lo-Fi', slug: 'asian-lofi' },
  { label: 'Funk, Soul & Retro Bounce', slug: 'funk-soul' },
  { label: 'Seasons, Rain & Weather', slug: 'seasonal-weather' },
  { label: 'Late Night, Neon & After Hours', slug: 'late-night' },
  { label: 'Focus, Rituals & Daily Routines', slug: 'activities' },
  { label: 'Hybrid, World & Cinematic', slug: 'hybrid' },
];

export const TRACKS: readonly Entry[] = [
  {
    category: 'activities',
    filename: '2-am-debug-loop.mp3',
    title: '2 AM Debug Loop',
  },
  {
    category: 'activities',
    filename: 'brushstrokes-and-rain.mp3',
    title: 'Brushstrokes and Rain',
  },
  {
    category: 'activities',
    filename: 'butter-and-windowlight.mp3',
    title: 'Butter and Windowlight',
  },
  {
    category: 'activities',
    filename: 'chapter-by-lamplight.mp3',
    title: 'Chapter By Lamplight',
  },
  {
    category: 'activities',
    filename: 'coffee-ring-notebook.mp3',
    title: 'Coffee Ring Notebook',
  },
  {
    category: 'activities',
    filename: 'continue-screen-dreams.mp3',
    title: 'Continue Screen Dreams',
  },
  {
    category: 'activities',
    filename: 'cursor-after-midnight.mp3',
    title: 'Cursor After Midnight',
  },
  {
    category: 'activities',
    filename: 'dog-eared-pages.mp3',
    title: 'Dog Eared Pages',
  },
  {
    category: 'activities',
    filename: 'dust-in-the-curtains.mp3',
    title: 'Dust in the Curtains',
  },
  {
    category: 'activities',
    filename: 'exhale-the-morning.mp3',
    title: 'Exhale the Morning',
  },
  {
    category: 'activities',
    filename: 'faded-corners-of-the-page.mp3',
    title: 'Faded Corners of the Page',
  },
  {
    category: 'activities',
    filename: 'first-coffee-thoughts.mp3',
    title: 'First Coffee Thoughts',
  },
  {
    category: 'activities',
    filename: 'graphite-in-the-quiet.mp3',
    title: 'Graphite in the Quiet',
  },
  {
    category: 'activities',
    filename: 'graphite-mornings.mp3',
    title: 'Graphite Mornings',
  },
  {
    category: 'activities',
    filename: 'hour-between-clicks.mp3',
    title: 'Hour Between Clicks',
  },
  {
    category: 'activities',
    filename: 'kettle-before-work.mp3',
    title: 'Kettle Before Work',
  },
  {
    category: 'activities',
    filename: 'margin-notes-at-dusk.mp3',
    title: 'Margin Notes at Dusk',
  },
  {
    category: 'activities',
    filename: 'mat-and-morning-light.mp3',
    title: 'Mat and Morning Light',
  },
  {
    category: 'activities',
    filename: 'morning-in-the-hiss.mp3',
    title: 'Morning in the Hiss',
  },
  {
    category: 'activities',
    filename: 'morning-pages.mp3',
    title: 'Morning Pages',
  },
  {
    category: 'activities',
    filename: 'pancakes-in-the-sun.mp3',
    title: 'Pancakes in the Sun',
  },
  {
    category: 'activities',
    filename: 'penciled-sunbeams.mp3',
    title: 'Penciled Sunbeams',
  },
  {
    category: 'activities',
    filename: 'pixel-quest-save-point.mp3',
    title: 'Pixel Quest Save Point',
  },
  {
    category: 'activities',
    filename: 'quiet-lungs-quiet-light.mp3',
    title: 'Quiet Lungs Quiet Light',
  },
  {
    category: 'activities',
    filename: 'stacks-of-quiet-hours.mp3',
    title: 'Stacks of Quiet Hours',
  },
  {
    category: 'activities',
    filename: 'sunday-light-through-lace.mp3',
    title: 'Sunday Light Through Lace',
  },
  {
    category: 'activities',
    filename: 'sunrise-stretch-flow.mp3',
    title: 'Sunrise Stretch Flow',
  },
  {
    category: 'activities',
    filename: 'terminal-rain.mp3',
    title: 'Terminal Rain',
  },
  {
    category: 'activities',
    filename: 'watercolors-by-the-window.mp3',
    title: 'Watercolors By the Window',
  },
  {
    category: 'ambient-lofi',
    filename: 'almost-floating.mp3',
    title: 'Almost Floating',
  },
  {
    category: 'ambient-lofi',
    filename: 'aurora-on-mute.mp3',
    title: 'Aurora on Mute',
  },
  {
    category: 'ambient-lofi',
    filename: 'blue-below-the-surface.mp3',
    title: 'Blue Below the Surface',
  },
  {
    category: 'ambient-lofi',
    filename: 'cathedral-hiss.mp3',
    title: 'Cathedral Hiss',
  },
  {
    category: 'ambient-lofi',
    filename: 'deep-space-loop.mp3',
    title: 'Deep Space Loop',
  },
  {
    category: 'ambient-lofi',
    filename: 'drifting-through-fog.mp3',
    title: 'Drifting Through Fog',
  },
  {
    category: 'ambient-lofi',
    filename: 'first-light-on-the-ridge.mp3',
    title: 'First Light on the Ridge',
  },
  {
    category: 'ambient-lofi',
    filename: 'ghosts-on-the-hillside.mp3',
    title: 'Ghosts on the Hillside',
  },
  {
    category: 'ambient-lofi',
    filename: 'glasshouse-ghosts.mp3',
    title: 'Glasshouse Ghosts',
  },
  {
    category: 'ambient-lofi',
    filename: 'green-after-midnight.mp3',
    title: 'Green After Midnight',
  },
  {
    category: 'ambient-lofi',
    filename: 'misty-mountain-sunrise.mp3',
    title: 'Misty Mountain Sunrise',
  },
  {
    category: 'ambient-lofi',
    filename: 'moonlit-moss.mp3',
    title: 'Moonlit Moss',
  },
  {
    category: 'ambient-lofi',
    filename: 'orbiting-in-silence.mp3',
    title: 'Orbiting in Silence',
  },
  {
    category: 'ambient-lofi',
    filename: 'polar-afterglow.mp3',
    title: 'Polar Afterglow',
  },
  {
    category: 'ambient-lofi',
    filename: 'satellite-lullaby.mp3',
    title: 'Satellite Lullaby',
  },
  {
    category: 'ambient-lofi',
    filename: 'sea-glass-evening.mp3',
    title: 'Sea Glass Evening',
  },
  {
    category: 'ambient-lofi',
    filename: 'soft-weightless-hours.mp3',
    title: 'Soft Weightless Hours',
  },
  {
    category: 'ambient-lofi',
    filename: 'stained-glass-static.mp3',
    title: 'Stained Glass Static',
  },
  {
    category: 'ambient-lofi',
    filename: 'tide-pools-at-twilight.mp3',
    title: 'Tide Pools at Twilight',
  },
  {
    category: 'ambient-lofi',
    filename: 'underwater-dreamscape.mp3',
    title: 'Underwater Dreamscape',
  },
  {
    category: 'ambient-lofi',
    filename: 'warm-constellations.mp3',
    title: 'Warm Constellations',
  },
  {
    category: 'asian-lofi',
    filename: 'bamboo-shadow-waltz.mp3',
    title: 'Bamboo Shadow Waltz',
  },
  {
    category: 'asian-lofi',
    filename: 'bells-before-sunrise.mp3',
    title: 'Bells Before Sunrise',
  },
  {
    category: 'asian-lofi',
    filename: 'lanterns-in-slow-motion.mp3',
    title: 'Lanterns in Slow Motion',
  },
  {
    category: 'asian-lofi',
    filename: 'misty-steam-quiet-dreams.mp3',
    title: 'Misty Steam Quiet Dreams',
  },
  {
    category: 'asian-lofi',
    filename: 'moon-through-bamboo.mp3',
    title: 'Moon Through Bamboo',
  },
  {
    category: 'asian-lofi',
    filename: 'paper-lantern-rain.mp3',
    title: 'Paper Lantern Rain',
  },
  {
    category: 'asian-lofi',
    filename: 'teacup-morning-fog.mp3',
    title: 'Teacup Morning Fog',
  },
  {
    category: 'asian-lofi',
    filename: 'temple-at-dawn.mp3',
    title: 'Temple at Dawn',
  },
  {
    category: 'chillhop',
    filename: 'dusk-between-stoops.mp3',
    title: 'Dusk Between Stoops',
  },
  {
    category: 'chillhop',
    filename: 'dust-on-the-morning-keys.mp3',
    title: 'Dust on the Morning Keys',
  },
  {
    category: 'chillhop',
    filename: 'glow-on-the-overpass.mp3',
    title: 'Glow on the Overpass',
  },
  {
    category: 'chillhop',
    filename: 'porchlight-golden-hour.mp3',
    title: 'Porchlight Golden Hour',
  },
  {
    category: 'chillhop',
    filename: 'sidewalk-slow-jam.mp3',
    title: 'Sidewalk Slow Jam',
  },
  {
    category: 'chillhop',
    filename: 'soft-gold-sky.mp3',
    title: 'Soft Gold Sky',
  },
  {
    category: 'chillhop',
    filename: 'sunset-offbeat.mp3',
    title: 'Sunset Offbeat',
  },
  {
    category: 'chillhop',
    filename: 'window-seat-daydream.mp3',
    title: 'Window Seat Daydream',
  },
  {
    category: 'funk-soul',
    filename: 'basement-groove-86.mp3',
    title: 'Basement Groove 86',
  },
  {
    category: 'funk-soul',
    filename: 'block-party-slow-jam.mp3',
    title: 'Block Party Slow Jam',
  },
  {
    category: 'funk-soul',
    filename: 'burnt-sunset-groove.mp3',
    title: 'Burnt Sunset Groove',
  },
  {
    category: 'funk-soul',
    filename: 'cassette-basement-bounce.mp3',
    title: 'Cassette Basement Bounce',
  },
  {
    category: 'funk-soul',
    filename: 'dust-on-the-needle.mp3',
    title: 'Dust on the Needle',
  },
  {
    category: 'funk-soul',
    filename: 'dusty-jukebox-heart.mp3',
    title: 'Dusty Jukebox Heart',
  },
  {
    category: 'funk-soul',
    filename: 'grandmas-kitchen-on-sunday.mp3',
    title: 'Grandmas Kitchen on Sunday',
  },
  {
    category: 'funk-soul',
    filename: 'mirrorball-slow-roll.mp3',
    title: 'Mirrorball Slow Roll',
  },
  {
    category: 'funk-soul',
    filename: 'motel-soul-radio.mp3',
    title: 'Motel Soul Radio',
  },
  {
    category: 'funk-soul',
    filename: 'neon-on-the-diner-floor.mp3',
    title: 'Neon on the Diner Floor',
  },
  {
    category: 'funk-soul',
    filename: 'peach-cobbler-static.mp3',
    title: 'Peach Cobbler Static',
  },
  {
    category: 'funk-soul',
    filename: 'roller-rink-reverie.mp3',
    title: 'Roller Rink Reverie',
  },
  {
    category: 'funk-soul',
    filename: 'smoke-in-the-orange-sky.mp3',
    title: 'Smoke in the Orange Sky',
  },
  {
    category: 'funk-soul',
    filename: 'summer-curbside-glow.mp3',
    title: 'Summer Curbside Glow',
  },
  { category: 'hybrid', filename: 'cafe-da-tarde.mp3', title: 'Cafe Da Tarde' },
  {
    category: 'hybrid',
    filename: 'cassette-pastel-nights.mp3',
    title: 'Cassette Pastel Nights',
  },
  {
    category: 'hybrid',
    filename: 'dusk-on-red-earth.mp3',
    title: 'Dusk on Red Earth',
  },
  {
    category: 'hybrid',
    filename: 'end-scene-glow.mp3',
    title: 'End Scene Glow',
  },
  {
    category: 'hybrid',
    filename: 'midnight-steam-and-mango-skin.mp3',
    title: 'Midnight Steam and Mango Skin',
  },
  { category: 'hybrid', filename: 'quiet-credits.mp3', title: 'Quiet Credits' },
  {
    category: 'hybrid',
    filename: 'savanna-slow-glow.mp3',
    title: 'Savanna Slow Glow',
  },
  { category: 'hybrid', filename: 'vhs-heartbeat.mp3', title: 'VHS Heartbeat' },
  {
    category: 'jazzhop',
    filename: 'ashes-in-the-coffee-cup.mp3',
    title: 'Ashes in the Coffee Cup',
  },
  {
    category: 'jazzhop',
    filename: 'breezy-afternoon-terrace.mp3',
    title: 'Breezy Afternoon Terrace',
  },
  {
    category: 'jazzhop',
    filename: 'candlelit-at-70-bpm.mp3',
    title: 'Candlelit at 70 BPM',
  },
  {
    category: 'jazzhop',
    filename: 'dust-and-hardcovers.mp3',
    title: 'Dust and Hardcovers',
  },
  {
    category: 'jazzhop',
    filename: 'harbor-before-words.mp3',
    title: 'Harbor Before Words',
  },
  {
    category: 'jazzhop',
    filename: 'last-call-in-c-minor.mp3',
    title: 'Last Call in C Minor',
  },
  {
    category: 'jazzhop',
    filename: 'linen-and-limoncello.mp3',
    title: 'Linen and Limoncello',
  },
  {
    category: 'jazzhop',
    filename: 'midnight-amber-room.mp3',
    title: 'Midnight Amber Room',
  },
  {
    category: 'jazzhop',
    filename: 'rain-on-the-boulevard.mp3',
    title: 'Rain on the Boulevard',
  },
  {
    category: 'jazzhop',
    filename: 'saxophone-in-the-rain.mp3',
    title: 'Saxophone in the Rain',
  },
  {
    category: 'jazzhop',
    filename: 'stacks-of-quiet-books.mp3',
    title: 'Stacks of Quiet Books',
  },
  {
    category: 'jazzhop',
    filename: 'velvet-cigarette-haze.mp3',
    title: 'Velvet Cigarette Haze',
  },
  { category: 'late-night', filename: '3-am-echoes.mp3', title: '3 AM Echoes' },
  {
    category: 'late-night',
    filename: 'antenna-after-midnight.mp3',
    title: 'Antenna After Midnight',
  },
  {
    category: 'late-night',
    filename: 'blinds-and-headlights.mp3',
    title: 'Blinds and Headlights',
  },
  {
    category: 'late-night',
    filename: 'electric-puddles.mp3',
    title: 'Electric Puddles',
  },
  {
    category: 'late-night',
    filename: 'elevator-to-the-moon.mp3',
    title: 'Elevator To the Moon',
  },
  {
    category: 'late-night',
    filename: 'empty-street-static.mp3',
    title: 'Empty Street Static',
  },
  {
    category: 'late-night',
    filename: 'half-empty-coupe.mp3',
    title: 'Half Empty Coupe',
  },
  {
    category: 'late-night',
    filename: 'headlights-on-the-divider.mp3',
    title: 'Headlights on the Divider',
  },
  {
    category: 'late-night',
    filename: 'high-rise-haze.mp3',
    title: 'High Rise Haze',
  },
  {
    category: 'late-night',
    filename: 'last-call-at-table-nine.mp3',
    title: 'Last Call at Table Nine',
  },
  {
    category: 'late-night',
    filename: 'last-train-home.mp3',
    title: 'Last Train Home',
  },
  {
    category: 'late-night',
    filename: 'midnight-on-my-mind.mp3',
    title: 'Midnight on My Mind',
  },
  {
    category: 'late-night',
    filename: 'midnight-window-glow.mp3',
    title: 'Midnight Window Glow',
  },
  {
    category: 'late-night',
    filename: 'platform-after-rain.mp3',
    title: 'Platform After Rain',
  },
  {
    category: 'late-night',
    filename: 'rain-off-the-neon-signs.mp3',
    title: 'Rain Off the Neon Signs',
  },
  {
    category: 'late-night',
    filename: 'rooftop-static-dreams.mp3',
    title: 'Rooftop Static Dreams',
  },
  {
    category: 'late-night',
    filename: 'streetlights-in-the-rearview.mp3',
    title: 'Streetlights in the Rearview',
  },
  {
    category: 'late-night',
    filename: 'warm-mile-markers.mp3',
    title: 'Warm Mile Markers',
  },
  {
    category: 'seasonal-weather',
    filename: 'a-taste-of-spring.mp3',
    title: 'A Taste of Spring',
  },
  {
    category: 'seasonal-weather',
    filename: 'after-school-rain.mp3',
    title: 'After School Rain',
  },
  {
    category: 'seasonal-weather',
    filename: 'amber-sidewalks.mp3',
    title: 'Amber Sidewalks',
  },
  {
    category: 'seasonal-weather',
    filename: 'amber-windowpane.mp3',
    title: 'Amber Windowpane',
  },
  {
    category: 'seasonal-weather',
    filename: 'autumn-on-the-window-glass.mp3',
    title: 'Autumn on the Window Glass',
  },
  {
    category: 'seasonal-weather',
    filename: 'bloom-between-showers.mp3',
    title: 'Bloom Between Showers',
  },
  {
    category: 'seasonal-weather',
    filename: 'blossoms-on-the-pavement.mp3',
    title: 'Blossoms on the Pavement',
  },
  {
    category: 'seasonal-weather',
    filename: 'embers-after-midnight.mp3',
    title: 'Embers After Midnight',
  },
  {
    category: 'seasonal-weather',
    filename: 'fallen-leaves-loop.mp3',
    title: 'Fallen Leaves Loop',
  },
  {
    category: 'seasonal-weather',
    filename: 'fieldnotes-at-dawn.mp3',
    title: 'Fieldnotes at Dawn',
  },
  {
    category: 'seasonal-weather',
    filename: 'fireplace-loop.mp3',
    title: 'Fireplace Loop',
  },
  {
    category: 'seasonal-weather',
    filename: 'hammock-in-the-shade.mp3',
    title: 'Hammock in the Shade',
  },
  {
    category: 'seasonal-weather',
    filename: 'lemonade-film-grain.mp3',
    title: 'Lemonade Film Grain',
  },
  {
    category: 'seasonal-weather',
    filename: 'mist-over-green-fields.mp3',
    title: 'Mist Over Green Fields',
  },
  {
    category: 'seasonal-weather',
    filename: 'moon-over-red-dunes.mp3',
    title: 'Moon Over Red Dunes',
  },
  {
    category: 'seasonal-weather',
    filename: 'palm-breeze-nap.mp3',
    title: 'Palm Breeze Nap',
  },
  {
    category: 'seasonal-weather',
    filename: 'petals-after-rain.mp3',
    title: 'Petals After Rain',
  },
  {
    category: 'seasonal-weather',
    filename: 'petals-in-the-breeze.mp3',
    title: 'Petals in the Breeze',
  },
  {
    category: 'seasonal-weather',
    filename: 'picnic-polaroids.mp3',
    title: 'Picnic Polaroids',
  },
  {
    category: 'seasonal-weather',
    filename: 'sidewalk-puddles.mp3',
    title: 'Sidewalk Puddles',
  },
  {
    category: 'seasonal-weather',
    filename: 'snow-on-the-needle.mp3',
    title: 'Snow on the Needle',
  },
  {
    category: 'seasonal-weather',
    filename: 'spring-garden-loops.mp3',
    title: 'Spring Garden Loops',
  },
  {
    category: 'seasonal-weather',
    filename: 'starlight-in-the-sand.mp3',
    title: 'Starlight in the Sand',
  },
  {
    category: 'seasonal-weather',
    filename: 'storm-over-side-streets.mp3',
    title: 'Storm Over Side Streets',
  },
  {
    category: 'seasonal-weather',
    filename: 'thunder-in-the-dust.mp3',
    title: 'Thunder in the Dust',
  },
  {
    category: 'seasonal-weather',
    filename: 'tide-stained-polaroids.mp3',
    title: 'Tide Stained Polaroids',
  },
  {
    category: 'seasonal-weather',
    filename: 'winter-turntable.mp3',
    title: 'Winter Turntable',
  },
  {
    category: 'soul-rnb',
    filename: '3am-sink-light.mp3',
    title: '3AM Sink Light',
  },
  {
    category: 'soul-rnb',
    filename: 'barefoot-in-the-kitchen.mp3',
    title: 'Barefoot in the Kitchen',
  },
  {
    category: 'soul-rnb',
    filename: 'candle-wax-heart.mp3',
    title: 'Candle Wax Heart',
  },
  {
    category: 'soul-rnb',
    filename: 'envelope-on-the-bed.mp3',
    title: 'Envelope on the Bed',
  },
  {
    category: 'soul-rnb',
    filename: 'golden-afternoon-groove.mp3',
    title: 'Golden Afternoon Groove',
  },
  {
    category: 'soul-rnb',
    filename: 'honey-on-the-speakers.mp3',
    title: 'Honey on the Speakers',
  },
  {
    category: 'soul-rnb',
    filename: 'kitchen-after-the-party.mp3',
    title: 'Kitchen After the Party',
  },
  {
    category: 'soul-rnb',
    filename: 'lazy-love-letter-afternoon.mp3',
    title: 'Lazy Love Letter Afternoon',
  },
  {
    category: 'soul-rnb',
    filename: 'midnight-notes-on-the-floor.mp3',
    title: 'Midnight Notes on the Floor',
  },
  {
    category: 'soul-rnb',
    filename: 'midnight-table-talk.mp3',
    title: 'Midnight Table Talk',
  },
  {
    category: 'soul-rnb',
    filename: 'old-photos-new-heart.mp3',
    title: 'Old Photos New Heart',
  },
  {
    category: 'soul-rnb',
    filename: 'polaroids-in-a-shoebox.mp3',
    title: 'Polaroids in A Shoebox',
  },
  {
    category: 'soul-rnb',
    filename: 'porcelain-heartbeat.mp3',
    title: 'Porcelain Heartbeat',
  },
  {
    category: 'soul-rnb',
    filename: 'rain-on-your-hoodie.mp3',
    title: 'Rain on Your Hoodie',
  },
  {
    category: 'soul-rnb',
    filename: 'record-player-embrace.mp3',
    title: 'Record Player Embrace',
  },
  {
    category: 'soul-rnb',
    filename: 'rooftop-slow-jam.mp3',
    title: 'Rooftop Slow Jam',
  },
  {
    category: 'soul-rnb',
    filename: 'scattered-sheet-music.mp3',
    title: 'Scattered Sheet Music',
  },
  {
    category: 'soul-rnb',
    filename: 'skyline-and-satin.mp3',
    title: 'Skyline and Satin',
  },
  {
    category: 'soul-rnb',
    filename: 'slow-dance-in-the-living-room.mp3',
    title: 'Slow Dance in the Living Room',
  },
  {
    category: 'soul-rnb',
    filename: 'slow-dancing-by-the-stove.mp3',
    title: 'Slow Dancing By the Stove',
  },
  {
    category: 'soul-rnb',
    filename: 'velvet-candle-smoke.mp3',
    title: 'Velvet Candle Smoke',
  },
];
