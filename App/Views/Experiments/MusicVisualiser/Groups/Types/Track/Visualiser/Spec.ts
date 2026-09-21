/** Every scene the stage can draw; `shader.ts` says what each one is. */
export type SceneName =
  | 'bars'
  | 'clouds'
  | 'halo'
  | 'hive'
  | 'kaleidoscope'
  | 'orb'
  | 'pools'
  | 'rings'
  | 'stars'
  | 'terrain'
  | 'tunnel'
  | 'wave';

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
