import { clamp, lerp, random } from './seed';

/**
 * A taxon's colour is derived from the colour it grows out of, drifted by a
 * deterministic amount seeded on its own `nodeId`. Ancestry therefore reads
 * as a colour family rather than a set of unrelated hues, and the drift is
 * clamped to a green→teal band so the whole tree stays one ecosystem.
 *
 * Only the start colour is needed - no depth, no lineage - because each taxon
 * is handed the colour of whatever it grows from.
 */

/**
 * The band drift is fenced into: yellow-green, through green and teal, to
 * blue. Widened from the original green→teal, which held the whole tree
 * inside about forty degrees of hue - enough to tell siblings apart on
 * inspection, not enough to read as colour at a glance.
 *
 * It is still a fence, and deliberately so: hue carries ancestry here, and a
 * clade that can reach any hue stops looking related to the one it grew from.
 */
const HUE_MIN = 60;
const HUE_MAX = 240;
const SATURATION_MIN = 34;
const SATURATION_MAX = 56;
const LIGHTNESS_MIN = 36;
const LIGHTNESS_MAX = 78;

/**
 * Per-generation drift.
 *
 * This is what makes a branch legible as a change of colour rather than a
 * length of the same one - it is the gap between the colour a branch leaves
 * on and the one it arrives at, swept into its vertices. It has to be a
 * *step*, not a pull: a pull toward a fixed target decays geometrically, so
 * raising it only makes the whole tree reach the end of the band sooner and
 * sit there. Big enough to read on one branch, small enough that a family
 * still looks like a family.
 */
const HUE_DRIFT = 28;
const SATURATION_DRIFT = 12;
const LIGHTNESS_DRIFT = 15;

/**
 * How far each generation moves along the band, how much lighter it gets, and
 * how much saturation it gives up.
 *
 * The pull and the lightening are what make a branch legible as a *change*:
 * they set the gap between the colour a branch leaves on and the one it
 * arrives at, which is the gradient swept into its vertices. Too gentle and
 * every generation is its parent's colour, so the tree reads as one flat
 * green and the connection carries no information. The softening stays where
 * it was - the tone should stay washed as it travels, not turn enamel.
 */
/*
 * Gentle, because these converge. Unlike hue - which wanders symmetrically -
 * lightness and saturation are *meant* to trend as the tree travels outward:
 * brighter and more washed the further from the core. Kept small so the trend
 * takes the whole lineage to play out rather than the first few generations.
 */
const LIGHTEN = 0.14;
const SOFTEN = 0.08;

type Hsl = {
  h: number;
  s: number;
  l: number;
};

export function hexToHsl(hex: string): Hsl {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
  }

  h = (h * 60 + 360) % 360;

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex({ h, s, l }: Hsl): string {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const second = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const base = lightness - chroma / 2;

  let rgb: readonly [number, number, number];

  if (h < 60) {
    rgb = [chroma, second, 0];
  } else if (h < 120) {
    rgb = [second, chroma, 0];
  } else if (h < 180) {
    rgb = [0, chroma, second];
  } else if (h < 240) {
    rgb = [0, second, chroma];
  } else if (h < 300) {
    rgb = [second, 0, chroma];
  } else {
    rgb = [chroma, 0, second];
  }

  const channel = (value: number) =>
    Math.round((value + base) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${channel(rgb[0])}${channel(rgb[1])}${channel(rgb[2])}`;
}

/** The colour this taxon settles on, grown out of `startColor`. */
export function inherit(startColor: string, nodeId: string): string {
  const parent = hexToHsl(startColor);
  const next = random(`${nodeId}:colour`);

  /*
   * Hue wanders, it does not march.
   *
   * Pulling it toward one end of the band moved every generation the same
   * way, so a lineage arrived at the far end and sat there: the tree changed
   * colour with depth but siblings all matched, which is the opposite of
   * legible. Drifting symmetrically and reflecting off the edges keeps each
   * step visible and keeps the whole band in use.
   */
  const wandered = parent.h + (next() - 0.5) * 2 * HUE_DRIFT;

  const hue =
    wandered < HUE_MIN
      ? HUE_MIN + (HUE_MIN - wandered)
      : wandered > HUE_MAX
        ? HUE_MAX - (wandered - HUE_MAX)
        : wandered;

  const saturation = clamp(
    lerp(
      parent.s + (next() - 0.5) * 2 * SATURATION_DRIFT,
      SATURATION_MIN,
      SOFTEN
    ),
    SATURATION_MIN,
    SATURATION_MAX
  );

  // Lift outward, so the canopy reads distinctly brighter than the core.
  const lightness = clamp(
    lerp(
      parent.l + (next() - 0.5) * 2 * LIGHTNESS_DRIFT,
      LIGHTNESS_MAX,
      LIGHTEN
    ),
    LIGHTNESS_MIN,
    LIGHTNESS_MAX
  );

  return hslToHex({ h: hue, s: saturation, l: lightness });
}
