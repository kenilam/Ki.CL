/**
 * Hierarchical colour inheritance. A node's colour is derived from its
 * parent's colour plus a small, deterministic variation seeded by its own
 * nodeId — so ancestry is legible as a colour family rather than a set of
 * independently-assigned hues. Variation is clamped to the green→teal band
 * so the whole tree stays one biological ecosystem.
 */

/** Strong green base at the origin of life. */
export const ROOT_COLOR = '#1e8f57';

/** Green through teal — descendants drift along this band, never out of it. */
const HUE_MIN = 96;
const HUE_MAX = 188;
const SAT_MIN = 30;
const SAT_MAX = 66;
const LIGHT_MIN = 30;
const LIGHT_MAX = 70;

/** Per-generation drift: enough to distinguish siblings, never to break family. */
const HUE_JITTER = 15;
const SAT_JITTER = 9;
const LIGHT_JITTER = 8;

/**
 * Nesting level is mapped onto the band *asymptotically*, not by a fixed
 * per-generation step. Real lineages reach depth 46, and a linear drift
 * pinned against the clamp by about depth 15 — which made the majority of
 * the tree one indistinguishable colour. `d / (d + HALFWAY)` spends the
 * whole band across the whole depth range instead.
 */
const DEPTH_HALFWAY = 16;
/** How strongly the depth target pulls against inherited colour. */
const DEPTH_PULL = 0.4;

function depthFraction(depth: number): number {
  return depth / (depth + DEPTH_HALFWAY);
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

type Hsl = { h: number; s: number; l: number };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;

  let rgb: [number, number, number];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];

  const toHex = (value: number) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
}

/**
 * Derive a descendant's colour from its ancestor's. Deterministic per nodeId,
 * so a node keeps the same colour across sessions exactly like its position.
 */
export function inheritColor(
  parentColor: string | null,
  nodeId: string,
  depth: number
): string {
  if (!parentColor || depth === 0) {
    return ROOT_COLOR;
  }

  const parent = hexToHsl(parentColor);
  const rand = mulberry32(hashString(nodeId));
  const root = hexToHsl(ROOT_COLOR);
  const t = depthFraction(depth);

  // Where this nesting level sits on the band, measured from the root colour.
  const hueTarget = lerp(root.h, HUE_MAX, t);
  const lightTarget = lerp(root.l, LIGHT_MAX, t);

  // Inherit from the parent, jitter for sibling identity, then pull toward
  // the level's target so ancestry stays legible without the family drifting
  // off the band or stalling against a clamp.
  const hue = clamp(
    lerp(parent.h + (rand() - 0.5) * 2 * HUE_JITTER, hueTarget, DEPTH_PULL),
    HUE_MIN,
    HUE_MAX
  );
  const saturation = clamp(
    parent.s + (rand() - 0.5) * 2 * SAT_JITTER,
    SAT_MIN,
    SAT_MAX
  );
  // Lift lightness outward so the canopy reads brighter than the core.
  const lightness = clamp(
    lerp(parent.l + (rand() - 0.5) * 2 * LIGHT_JITTER, lightTarget, DEPTH_PULL),
    LIGHT_MIN,
    LIGHT_MAX
  );

  return hslToHex({ h: hue, s: saturation, l: lightness });
}

/** Slightly darker variant, for the shaded underside of a node. */
export function shade(hex: string, amount = 12): string {
  const hsl = hexToHsl(hex);
  return hslToHex({ ...hsl, l: clamp(hsl.l - amount, 8, 92) });
}

/** Lightness the page background sits at — recession washes toward this. */
const BACKGROUND_LIGHTNESS = 94;

/**
 * Push a colour back into the page *through the colour channel* rather than
 * by going translucent: desaturate it and lift its lightness toward the
 * background. Bodies stay fully opaque, so a receded ancestor reads as
 * distant rather than see-through.
 */
export function recede(hex: string, amount: number): string {
  const t = clamp(amount, 0, 1);
  const hsl = hexToHsl(hex);
  return hslToHex({
    h: hsl.h,
    s: hsl.s * (1 - 0.72 * t),
    l: hsl.l + (BACKGROUND_LIGHTNESS - hsl.l) * 0.72 * t,
  });
}
