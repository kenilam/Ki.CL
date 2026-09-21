import type {
  Features,
  Smoothed,
} from '@/Views/Experiments/MusicVisualiser/Spec';

/*
 * Turns what the analyser hears into a handful of numbers the stage can
 * drive with. All of it is cheap enough to run every frame: one pass over
 * the frequency bins and one over the waveform.
 */

/** Band edges in hertz. Bass sits below the first, air above the second. */
const LOW_HZ = 200;
const MID_HZ = 2000;

/**
 * Time constants, in seconds, of the three smoothers. Fast follows the beat,
 * medium follows a phrase, slow describes the section - the director reads
 * the slow one to tell when the music has moved on.
 */
const FAST_SECONDS = 0.08;
const MEDIUM_SECONDS = 2;
const SLOW_SECONDS = 15;

/**
 * An onset is flux this many times its own medium average. Higher is
 * stricter; below about 1.3 every frame of a sustained pad counts.
 */
const ONSET_RATIO = 1.8;

/** Quietest flux that may count as an onset, so silence never fires one. */
const ONSET_FLOOR = 0.02;

/** Frames between two onsets at the very least, so a hit reads as one. */
const ONSET_REFRACTORY_SECONDS = 0.12;

/**
 * The spectrum the scenes draw with: this many bands, spaced by octave
 * from the low edge to the high one, so bass and air each get their share
 * of the picture rather than the top half of it going to hiss.
 */
export const SPECTRUM_BANDS = 128;
const SPECTRUM_LOW_HZ = 30;
const SPECTRUM_HIGH_HZ = 14000;

/**
 * Each band is shown against its own recent peak, so a mix with little air
 * still lights its top bands, and the whole thing is eased over a quarter
 * second so it sways rather than flickers. The peak forgets over eight
 * seconds; below the floor a band is taken as empty rather than blown up.
 */
const SPECTRUM_SECONDS = 0.25;
const PEAK_SECONDS = 8;
const PEAK_FLOOR = 0.08;

const EMPTY: Features = {
  centroid: 0,
  energy: 0,
  flux: 0,
  high: 0,
  low: 0,
  mid: 0,
  onset: 0,
};

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function emptyFeatures(): Features {
  return { ...EMPTY };
}

/**
 * The state one extractor carries between frames: the previous spectrum for
 * flux, the smoothers, and the onset gate.
 */
export type Extractor = {
  /** The latest raw frame. */
  raw: Features;
  smoothed: Smoothed;
  /**
   * `SPECTRUM_BANDS` bytes, low to high, each a band's level against its
   * recent peak, eased: what a texture for the scenes is made from.
   */
  spectrum: Uint8Array;
  /** Feed one frame. `dt` is the seconds since the last one. */
  update(dt: number): void;
};

/**
 * Exponential smoothing with a fixed time constant, so the result does not
 * depend on the frame rate.
 */
function smooth(
  previous: number,
  next: number,
  dt: number,
  seconds: number
): number {
  const alpha = 1 - Math.exp(-dt / seconds);

  return previous + (next - previous) * alpha;
}

function smoothFeatures(
  target: Features,
  next: Features,
  dt: number,
  seconds: number
): void {
  target.centroid = smooth(target.centroid, next.centroid, dt, seconds);
  target.energy = smooth(target.energy, next.energy, dt, seconds);
  target.flux = smooth(target.flux, next.flux, dt, seconds);
  target.high = smooth(target.high, next.high, dt, seconds);
  target.low = smooth(target.low, next.low, dt, seconds);
  target.mid = smooth(target.mid, next.mid, dt, seconds);
  /*
   * Onsets are impulses, not levels. The fast smoother lets one ring for a
   * few frames; the slower two would only blur them into nothing, so they
   * carry the rate of onsets instead - useful as a measure of busyness.
   */
  target.onset = smooth(target.onset, next.onset, dt, seconds);
}

export function createExtractor(analyser: AnalyserNode): Extractor {
  const bins = analyser.frequencyBinCount;
  const spectrum = new Uint8Array(bins);
  const previous = new Float32Array(bins);
  const waveform = new Uint8Array(analyser.fftSize);

  const hzPerBin = analyser.context.sampleRate / analyser.fftSize;
  const lowEdge = Math.max(1, Math.round(LOW_HZ / hzPerBin));
  const midEdge = Math.max(lowEdge + 1, Math.round(MID_HZ / hzPerBin));

  /* Band edges in analyser bins, spaced by octave; every band has at least one bin. */
  const edges = new Int32Array(SPECTRUM_BANDS + 1);

  for (let band = 0; band <= SPECTRUM_BANDS; band++) {
    const hz =
      SPECTRUM_LOW_HZ *
      Math.pow(SPECTRUM_HIGH_HZ / SPECTRUM_LOW_HZ, band / SPECTRUM_BANDS);
    const bin = Math.min(bins - 1, Math.round(hz / hzPerBin));

    edges[band] = band === 0 ? bin : Math.max(edges[band - 1] + 1, bin);
  }

  const peaks = new Float32Array(SPECTRUM_BANDS);
  const levels = new Float32Array(SPECTRUM_BANDS);
  const bands = new Uint8Array(SPECTRUM_BANDS);

  const raw = emptyFeatures();
  const smoothed: Smoothed = {
    fast: emptyFeatures(),
    medium: emptyFeatures(),
    slow: emptyFeatures(),
  };

  let sinceOnset = Infinity;

  const update = (dt: number) => {
    analyser.getByteFrequencyData(spectrum);
    analyser.getByteTimeDomainData(waveform);

    let low = 0;
    let mid = 0;
    let high = 0;
    let weighted = 0;
    let total = 0;
    let flux = 0;

    for (let index = 0; index < bins; index++) {
      const magnitude = spectrum[index] / 255;

      if (index < lowEdge) {
        low += magnitude;
      } else if (index < midEdge) {
        mid += magnitude;
      } else {
        high += magnitude;
      }

      total += magnitude;
      weighted += magnitude * index;

      const delta = magnitude - previous[index];

      if (delta > 0) {
        flux += delta;
      }

      previous[index] = magnitude;
    }

    let sum = 0;

    for (let index = 0; index < waveform.length; index++) {
      const sample = (waveform[index] - 128) / 128;

      sum += sample * sample;
    }

    /*
     * RMS of the waveform, scaled so a loud master sits near one. Music
     * peaks well below full scale, and a curve here keeps quiet passages
     * from reading as nothing at all.
     */
    const rms = Math.sqrt(sum / waveform.length);

    raw.energy = clamp01(Math.pow(rms * 3, 0.8));
    raw.low = clamp01(low / lowEdge);
    raw.mid = clamp01(mid / (midEdge - lowEdge));
    raw.high = clamp01((high / (bins - midEdge)) * 3);
    raw.centroid = total > 0 ? clamp01((weighted / total / bins) * 4) : 0;
    raw.flux = clamp01(flux / 24);

    sinceOnset += dt;

    const threshold = Math.max(ONSET_FLOOR, smoothed.medium.flux * ONSET_RATIO);
    const fired =
      raw.flux > threshold && sinceOnset >= ONSET_REFRACTORY_SECONDS;

    raw.onset = fired ? clamp01((raw.flux - threshold) * 4 + 0.3) : 0;

    if (fired) {
      sinceOnset = 0;
    }

    smoothFeatures(smoothed.fast, raw, dt, FAST_SECONDS);
    smoothFeatures(smoothed.medium, raw, dt, MEDIUM_SECONDS);
    smoothFeatures(smoothed.slow, raw, dt, SLOW_SECONDS);

    const forget = Math.exp(-dt / PEAK_SECONDS);

    for (let band = 0; band < SPECTRUM_BANDS; band++) {
      const from = edges[band];
      const to = Math.min(bins, Math.max(from + 1, edges[band + 1]));
      let sum = 0;

      for (let index = from; index < to; index++) {
        sum += spectrum[index] / 255;
      }

      const level = sum / (to - from);

      peaks[band] = Math.max(peaks[band] * forget, level);
      levels[band] = smooth(
        levels[band],
        level / Math.max(peaks[band], PEAK_FLOOR),
        dt,
        SPECTRUM_SECONDS
      );
      bands[band] = Math.round(clamp01(levels[band]) * 255);
    }
  };

  return { raw, smoothed, spectrum: bands, update };
}

export { emptyFeatures };
