/**
 * The vocabulary shared by the provider, the engine, the director and the
 * stage. Everything here is plain data so a track can come from a network
 * provider or from the built-in station and the rest of the view cannot tell.
 */

/** The three families the visuals know how to dress. */
export type VibeFamily = 'ambient' | 'lofi' | 'piano';

/** Every scene the stage can draw. */
export type SceneName = 'pools' | 'ribbons' | 'rings';

/**
 * What a track feels like, decided before a note plays.
 *
 * `energy` and `warmth` are in `[0, 1]`. `scenes` weights each scene for the
 * director's draw; a scene left out has weight zero and is never chosen for
 * this track.
 */
export type Vibe = {
  energy: number;
  family: VibeFamily;
  scenes: Partial<Record<SceneName, number>>;
  warmth: number;
};

/** An audio file the engine streams through a media element. */
export type StreamSource = {
  kind: 'stream';
  url: string;
};

/**
 * A piece the engine synthesises itself. `seed` makes it repeatable, so the
 * same track always plays the same way and can be skipped back to.
 */
export type SynthSource = {
  durationSeconds: number;
  kind: 'synth';
  seed: number;
  style: VibeFamily;
};

export type Source = StreamSource | SynthSource;

export type Attribution = {
  label: string;
  url?: string;
};

export type Track = {
  artist: string;
  attribution: Attribution;
  id: string;
  source: Source;
  station: string;
  title: string;
  vibe: Vibe;
};

/**
 * Where the tracks come from.
 *
 * `next` gets the ids already played this session so it can avoid repeats;
 * it may still repeat once the pool is exhausted.
 */
export type Provider = {
  /** The track with this id, for a deep link; `null` if it is not this provider's. */
  get(id: string): Promise<Track | null>;
  name: string;
  next(played: string[]): Promise<Track>;
};

/**
 * What the analyser hears, per frame.
 *
 * Every value is in `[0, 1]`. The bands are the share of energy below
 * 200 Hz, between 200 Hz and 2 kHz, and above; `centroid` is where the
 * spectral weight sits, low for dark sounds and high for bright ones;
 * `flux` is how much the spectrum moved since the last frame; `onset`
 * is set on the frames the flux jumps past its recent average, and holds
 * the strength of that jump.
 */
export type Features = {
  centroid: number;
  energy: number;
  flux: number;
  high: number;
  low: number;
  mid: number;
  onset: number;
};

/** The same features smoothed at three time scales. */
export type Smoothed = {
  fast: Features;
  medium: Features;
  slow: Features;
};

export type PlaybackState = 'idle' | 'loading' | 'paused' | 'playing';
