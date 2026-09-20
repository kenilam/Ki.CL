import type { SceneName } from '@/Views/Experiments/MusicVisualiser/Spec';

import { SPECTRUM_BANDS } from '@/Views/Experiments/MusicVisualiser/Audio/features';

/*
 * Every scene lives in one fragment shader, each as a function from screen
 * position to a colour weight per ink. The stage picks two by index and a
 * mix between them, so a crossfade is one `mix()` and never a second pass
 * or a second canvas.
 *
 * The scenes hear the music two ways: a handful of eased numbers (energy,
 * the three bands, brightness) and the spectrum itself, one texel a band,
 * which the bars, the halo, the wave and the rest read by position.
 *
 * The colour work is the same as the home background: inks laid over paper
 * and blended in Oklab, then a light ordered dither so the surface has the
 * site's grain rather than a smooth gradient's plastic.
 */

/** Index of each scene, as the shader knows it. */
export const SCENE_INDEX: Record<SceneName, number> = {
  pools: 0,
  clouds: 1,
  rings: 2,
  bars: 3,
  halo: 4,
  wave: 5,
  tunnel: 6,
  kaleidoscope: 7,
  stars: 8,
  terrain: 9,
  hive: 10,
  orb: 11,
};

/** How many onsets the rings scene remembers. */
export const MAX_RINGS = 8;

/** How many inks the palette may hold. */
export const MAX_INKS = 6;

export const VERTEX = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT = `
precision highp float;

const int MAX_INKS = ${MAX_INKS};
const int MAX_RINGS = ${MAX_RINGS};
const float BANDS = ${SPECTRUM_BANDS}.0;
const float PI = 3.14159265;
const float TAU = 6.28318531;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink[MAX_INKS];

/* Which two scenes, and how far from the first to the second. */
uniform int u_scene_a;
uniform int u_scene_b;
uniform float u_mix;

/* What the music is doing right now, and on average. */
uniform float u_energy;
uniform float u_low;
uniform float u_mid;
uniform float u_high;
uniform float u_centroid;
uniform float u_slow_energy;
uniform float u_warmth;

/* The spectrum, low to high, one texel a band, each against its recent peak. */
uniform sampler2D u_audio;

/* Onsets the rings scene draws from: when each began, and how hard. */
uniform float u_ring_time[MAX_RINGS];
uniform float u_ring_strength[MAX_RINGS];

/* Dither cell in device pixels and tone count, as on the home page. */
uniform float u_cell;
uniform float u_levels;

const float GRAIN = 0.025;
const float CHROMA = 0.92;

/* A gentle curve for anything the music drives: no hard corners at the ends. */
float ease(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * (3.0 - 2.0 * x);
}

/* The level of the band at \`x\`, from 0 (the lowest) to 1 (the highest). */
float band(float x) {
  return texture2D(u_audio, vec2(clamp(x, 0.0, 1.0), 0.5)).r;
}

/* A soft bump centred on \`c\`: how an ink claims a slice of a value. */
float bell(float x, float c, float width) {
  float d = (x - c) / width;
  return exp(-d * d * 2.0);
}

/* A thin line wherever \`v\` passes a whole number. */
float thread(float v) {
  return smoothstep(0.86, 1.0, abs(fract(v) - 0.5) * 2.0);
}

vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
vec3 toSrgb(vec3 c) { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }

vec3 toOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(l, 1.0 / 3.0); m = pow(m, 1.0 / 3.0); s = pow(s, 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
  );
}

vec3 fromOklab(vec3 c) {
  float l_ = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m_ = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s_ = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  float l = l_ * l_ * l_; float m = m_ * m_ * m_; float s = s_ * s_ * s_;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

/*
 * A hexagonal tiling: the point within its cell, and the cell's centre.
 * Cells are one unit apart, pointed at the top and bottom.
 */
vec4 hexCell(vec2 p) {
  const vec2 R = vec2(1.0, 1.7320508);
  vec2 h = R * 0.5;
  vec2 a = mod(p, R) - h;
  vec2 b = mod(p - h, R) - h;
  vec2 local = dot(a, a) < dot(b, b) ? a : b;
  return vec4(local, p - local);
}

/* Distance from a cell's centre in hexagonal terms: 0.5 at its edges. */
float hexDist(vec2 p) {
  p = abs(p);
  return max(p.x, dot(p, vec2(0.5, 0.8660254)));
}

/*
 * Pools: soft ellipses of ink, one per palette entry, drifting on their
 * own clocks. Bass swells them; the section's energy sets how much of the
 * paper they cover at rest.
 */
void pools(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  float t = u_time * 0.035;
  float breathe = 1.0 + ease(u_low) * 0.18 + u_slow_energy * 0.15;

  vec2 warp = vec2(
    sin(uv.y * 2.1 + t * 1.3) * 0.05,
    cos(uv.x * 1.7 - t * 1.1) * 0.05
  ) * (1.0 + ease(u_mid) * 0.6);
  vec2 p = uv + warp;

  for (int i = 0; i < MAX_INKS; i++) {
    float fi = float(i);
    vec2 centre = vec2(
      0.5 + 0.36 * sin(t * (0.7 + fi * 0.13) + fi * 1.9),
      0.5 + 0.32 * cos(t * (0.6 + fi * 0.11) + fi * 2.7)
    );
    vec2 d = (p - centre) * vec2(aspect, 1.0);
    float r = (0.26 + 0.05 * sin(t * 1.6 + fi)) * breathe;
    float v = 1.0 - smoothstep(r * 0.2, r * 1.7, length(d));
    w[i] = v * (0.7 + 0.3 * ease(u_energy));
  }
}

/*
 * Clouds: masses of billow drifting on a slow wind, a second layer of
 * noise folded through the first so they pile and curl. The section's
 * energy and the bass thicken the cover; the thin sky between them takes
 * the last ink, and the masses take the rest by density, so the edges are
 * lit and the bellies shaded.
 */
void clouds(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  float t = u_time * 0.02;
  vec2 p = uv * vec2(aspect, 1.0);
  vec2 wind = vec2(t, t * 0.18);

  float shape = fbm(p * 1.0 + wind);
  float billow = fbm(p * 2.2 - wind * 0.5 + shape * 1.8);
  float density = shape * 0.75 + billow * 0.5;

  float cover = 0.64 - u_slow_energy * 0.12 - ease(u_low) * 0.06;
  float mass = smoothstep(cover - 0.12, cover + 0.3, density);
  float lit = 1.0 - smoothstep(cover + 0.05, cover + 0.4, density);
  float belly = smoothstep(cover + 0.2, cover + 0.5, density);

  /* Sky between the masses, deeper at the top; sunlit edges in the brightest warm ink; shaded bellies in a cool one. */
  w[MAX_INKS - 1] += (1.0 - mass) * (0.5 - uv.y * 0.25 + ease(u_high) * 0.15);
  w[1] += mass * lit * 0.9;
  w[0] += mass * (1.0 - lit) * (1.0 - belly) * 0.55;
  w[4] += mass * belly * 0.55;

  /* A faint tint of every ink through the body, so the palette still shows. */
  for (int i = 0; i < MAX_INKS - 1; i++) {
    w[i] += mass * bell(density, cover + 0.05 + float(i) * 0.09, 0.1) * 0.2;
  }
}

/*
 * Rings: each onset starts a ring at the centre that grows and fades. Hard
 * hits are bright and wide; soft ones a whisper. Under them a slow bloom
 * keeps the frame from being empty between notes.
 */
void rings(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 d = (uv - 0.5) * vec2(aspect, 1.0);
  float dist = length(d);
  float angle = atan(d.y, d.x);
  float t = u_time;

  float bloom = 1.0 - smoothstep(0.0, 0.55 + u_slow_energy * 0.3, dist);
  w[0] += bloom * (0.3 + ease(u_low) * 0.25);

  for (int i = 0; i < MAX_RINGS; i++) {
    float age = t - u_ring_time[i];
    float strength = u_ring_strength[i];
    if (age < 0.0 || strength <= 0.0) continue;

    float speed = 0.09 + strength * 0.06;
    float radius = age * speed;
    float width = 0.03 + strength * 0.04 + age * 0.012;
    float wobble = 1.0 + 0.02 * sin(angle * 5.0 + age * 1.5);
    float ring = exp(-pow((dist - radius * wobble) / width, 2.0));
    float rise = smoothstep(0.0, 0.6, age);
    float fade = exp(-age * (0.45 - strength * 0.1));

    int ink = int(mod(float(i), float(MAX_INKS - 1))) + 1;
    for (int k = 1; k < MAX_INKS; k++) {
      if (k == ink) w[k] += ring * rise * fade * strength * 1.1;
    }
  }
}

/*
 * Bars: the spectrum as columns, mirrored from the middle of the screen so
 * the bass stands at the centre and the air at the sides, each column
 * reaching up and down from a centre line. The inks run from the foot of
 * a bar to its tip; a haze hangs over the tips.
 */
void bars(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  const float COLUMNS = 56.0;
  float column = floor(uv.x * COLUMNS);
  float across = fract(uv.x * COLUMNS);
  float pos = abs((column + 0.5) / COLUMNS - 0.5) * 2.0;
  float level = pow(band(pos * 0.9 + 0.02), 1.4);
  float height = 0.05 + level * (0.32 + ease(u_energy) * 0.12);
  float gap = smoothstep(0.1, 0.3, across) * smoothstep(0.1, 0.3, 1.0 - across);
  float d = abs(uv.y - 0.5);
  float inside = (1.0 - smoothstep(height - 0.006, height + 0.006, d)) * gap;
  float along = d / max(height, 0.001);

  for (int i = 0; i < MAX_INKS; i++) {
    w[i] += inside * bell(along, float(i) / float(MAX_INKS - 1), 0.28);
  }

  w[MAX_INKS - 1] += exp(-max(d - height, 0.0) * 14.0) * level * 0.35 * gap;
}

/*
 * Halo: the spectrum around a circle, bass at the top and air at the
 * bottom, the two sides mirrored. Within it a disc breathes with the bass;
 * beyond the tips a glow.
 */
void halo(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 d = (uv - 0.5) * vec2(aspect, 1.0);
  float r = length(d);
  float pos = abs(atan(d.x, -d.y)) / PI;
  const float SEGMENTS = 64.0;
  float segment = fract(pos * SEGMENTS);
  float gap = smoothstep(0.12, 0.3, segment) * smoothstep(0.12, 0.3, 1.0 - segment);
  float level = pow(band(pos * 0.92 + 0.02), 1.3);
  float base = 0.2 + u_slow_energy * 0.04 + ease(u_low) * 0.02;
  float top = base + 0.03 + level * 0.22;
  float inside = smoothstep(base - 0.005, base + 0.005, r)
    * (1.0 - smoothstep(top - 0.006, top + 0.006, r)) * gap;
  float along = (r - base) / max(top - base, 0.001);

  for (int i = 0; i < MAX_INKS; i++) {
    w[i] += inside * bell(along, float(i) / float(MAX_INKS - 1), 0.28);
  }

  w[0] += (1.0 - smoothstep(base * 0.3, base * 0.95, r)) * (0.25 + ease(u_low) * 0.25);
  w[MAX_INKS - 1] += exp(-max(r - top, 0.0) * 18.0) * level * 0.3 * gap;
}

/*
 * Wave: lines across the middle, each a sum of six slow sines whose
 * heights are six bands of the spectrum, so the line swells where the
 * music does without ever jittering the way a raw waveform would. One
 * line per ink, each a little out of phase with the last.
 */
void wave(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  float x = (uv.x - 0.5) * aspect;
  float t = u_time;
  float amplitude = 0.1 + ease(u_energy) * 0.2;
  float width = 0.004 + ease(u_high) * 0.003;
  float edge = smoothstep(0.0, 0.15, uv.x) * smoothstep(0.0, 0.15, 1.0 - uv.x);

  for (int i = 0; i < MAX_INKS; i++) {
    float fi = float(i);
    float y = 0.0;

    for (int k = 0; k < 6; k++) {
      float fk = float(k);
      float level = band(0.05 + fk * 0.17);
      y += level * sin(x * (2.5 + fk * 2.2) + t * (0.25 + fk * 0.11) + fi * 0.6) / (1.0 + fk * 0.7);
    }

    float line = 0.5 + y * amplitude + (fi - 2.5) * 0.012;
    float dist = abs(uv.y - line);
    w[i] += (exp(-dist * dist / (width * width)) * 0.9 + exp(-dist * 22.0) * 0.18) * edge;
  }
}

/*
 * Tunnel: rings of ink receding to a point that wanders a little off
 * centre, the walls lit by the spectrum around them - bass on the right,
 * air on the left - and the far end dark.
 */
void tunnel(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 d = (uv - 0.5) * vec2(aspect, 1.0);
  d += vec2(sin(u_time * 0.07), cos(u_time * 0.05)) * 0.06;
  float r = length(d);
  float angle = atan(d.y, d.x);
  float depth = 0.4 / (r + 0.04) + u_time * 0.12;
  float spokes = 0.5 + 0.5 * cos(angle * 6.0 + depth * 0.5);
  float level = band(abs(angle) / PI * 0.9);
  float near = smoothstep(0.02, 0.35, r);
  float lift = (0.45 + spokes * 0.2 + level * 0.35) * near * (0.7 + ease(u_energy) * 0.3);

  for (int i = 0; i < MAX_INKS; i++) {
    float phase = fract(depth * 0.35 - float(i) / float(MAX_INKS));
    w[i] += bell(phase, 0.5, 0.18) * lift;
  }
}

/*
 * Kaleidoscope: the screen folded into six mirrored wedges, a warped
 * noise field within each, the inks cycling through the field so the
 * pattern turns like a lens. Brightness follows the band at each radius.
 */
void kaleidoscope(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 d = (uv - 0.5) * vec2(aspect, 1.0);
  float r = length(d);
  float angle = atan(d.y, d.x) + u_time * 0.03;
  const float SECTOR = TAU / 6.0;
  angle = mod(angle, SECTOR);
  angle = abs(angle - SECTOR * 0.5);
  vec2 p = vec2(cos(angle), sin(angle)) * r;
  float t = u_time * 0.02;
  vec2 q = vec2(fbm(p * 2.5 + t), fbm(p * 2.5 - t + 3.0));
  float field = fbm(p * 3.0 + q * 1.5 + t * 0.5);
  float level = band(clamp(r * 1.4, 0.0, 1.0));
  float phase = field * 2.5 + r * 2.0 - u_time * 0.04 + level * 0.3;
  float vignette = 1.0 - smoothstep(0.35, 0.75, r);
  float lift = (0.55 + ease(u_energy) * 0.3) * (0.4 + 0.6 * vignette);

  for (int i = 0; i < MAX_INKS; i++) {
    w[i] += bell(fract(phase - float(i) / float(MAX_INKS)), 0.5, 0.2) * lift;
  }
}

/*
 * Stars: three layers of points drifting up at different speeds, each
 * listening to one band of the spectrum and swelling when it sounds. The
 * bass widens them all a little.
 */
void stars(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 p = uv * vec2(aspect, 1.0);
  float t = u_time;

  for (int layer = 0; layer < 3; layer++) {
    float fl = float(layer);
    float scale = 6.0 + fl * 5.0;
    vec2 drift = vec2(t * 0.004 * (1.0 + fl), -t * 0.01 * (1.0 + fl * 0.5));
    vec2 g = p * scale + drift;
    vec2 cell = floor(g);
    vec2 f = fract(g);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 offset = vec2(float(x), float(y));
        vec2 id = cell + offset;
        float h = hash(id + fl * 17.0);
        if (h < 0.55) continue;

        vec2 centre = offset + vec2(hash(id + 1.3), hash(id + 7.1));
        centre += 0.15 * vec2(sin(t * 0.3 + h * 20.0), cos(t * 0.25 + h * 30.0));
        float dist = length(f - centre);
        float twinkle = 0.5 + 0.5 * sin(t * (0.6 + h * 1.5) + h * 40.0);
        float level = band(h);
        float radius = (0.05 + level * 0.12 + ease(u_low) * 0.05) / (1.0 + fl * 0.5);
        float glow = exp(-dist * dist / (radius * radius)) * (0.35 + twinkle * 0.3 + level * 0.5);
        int ink = int(mod(floor(h * 60.0), float(MAX_INKS)));

        for (int k = 0; k < MAX_INKS; k++) {
          if (k == ink) w[k] += glow;
        }
      }
    }
  }
}

/*
 * Terrain: ridges one behind another, the near ones lower on the screen
 * and higher in relief, each raised by the spectrum across it and by a
 * slow roll of noise. A nearer ridge hides what is behind it.
 */
void terrain(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  const int ROWS = 14;
  float x = (uv.x - 0.5) * aspect;
  float t = u_time * 0.05;

  for (int row = 0; row < ROWS; row++) {
    float fr = float(row);
    float depth = fr / float(ROWS - 1);
    float baseline = 0.3 + depth * 0.55;
    float px = x / (0.45 + depth * 0.8);
    float fall = 1.0 - smoothstep(0.6, 1.4, abs(px));
    float ridge = band(clamp(abs(px) * 1.1, 0.0, 1.0)) * (0.05 + depth * 0.14) * fall
      + fbm(vec2(px * 2.0 + t, fr * 0.7 - t * 0.6)) * (0.03 + depth * 0.06);
    float y = baseline - ridge;
    float dist = uv.y - y;
    float mass = smoothstep(-0.002, 0.004, dist);
    float line = exp(-dist * dist / (0.00002 + depth * 0.00004));
    int ink = int(min(depth * float(MAX_INKS), float(MAX_INKS - 1)));
    float bright = 0.35 + depth * 0.55;

    for (int k = 0; k < MAX_INKS; k++) {
      w[k] *= 1.0 - mass;
      if (k == ink) w[k] += line * bright + mass * 0.06;
    }
  }
}

/*
 * Hive: a hexagonal tiling, every cell filled with nested hexagons, the
 * colour turning with the angle and again with the distance from the
 * centre so the inks spiral out in arms. The band at each cell's radius
 * pushes its rings outward.
 */
void hive(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 d = (uv - 0.5) * vec2(aspect, 1.0);
  const float SCALE = 7.0;
  vec4 cell = hexCell(d * SCALE);
  vec2 centre = cell.zw / SCALE;
  float r = length(centre);
  float angle = atan(centre.y, centre.x);
  float phase = angle / TAU * 2.0 + r * 0.9 - u_time * 0.02;
  float level = band(clamp(r * 1.3, 0.0, 1.0));
  float hd = hexDist(cell.xy) * 2.0;
  float rings = 0.5 + 0.5 * cos(hd * TAU * 3.0 - level * 3.0 - u_time * 0.4);
  float border = smoothstep(0.86, 0.98, hd);
  float tone = (0.35 + rings * 0.45 + level * 0.25) * (1.0 - border * 0.8);

  for (int i = 0; i < MAX_INKS; i++) {
    w[i] += bell(fract(phase - float(i) / float(MAX_INKS)), 0.5, 0.2) * tone;
  }
}

/*
 * Orb: a sphere drawn as a mesh of latitude and longitude, its surface
 * crumpled by noise and its silhouette wobbling, turning slowly, with the
 * far side showing faintly through. It breathes with the bass and glows
 * with the energy; the lines brighten where their band sounds.
 */
void orb(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  vec2 d = (uv - 0.5) * vec2(aspect, 1.0);
  float r = length(d);
  float angle = atan(d.y, d.x);
  float t = u_time;
  float radius = 0.3 + ease(u_low) * 0.03 + u_slow_energy * 0.03;
  float wobble = (fbm(vec2(cos(angle), sin(angle)) * 3.5 + t * 0.12) - 0.5) * 0.2;
  float edge = radius * (1.0 + wobble);
  float inside = 1.0 - smoothstep(edge - 0.004, edge + 0.004, r);

  float nr = min(r / edge, 1.0);
  float z = sqrt(max(0.0, 1.0 - nr * nr));
  vec3 n = vec3(d / edge, z);
  n.xy += (vec2(fbm(n.xy * 3.5 + t * 0.1), fbm(n.yx * 3.5 - t * 0.08)) - 0.5) * 0.16;

  /* Latitude, longitude and a diagonal between them: a mesh of triangles, not a globe. */
  const float LINES = 18.0;
  float lat = asin(clamp(n.y, -1.0, 1.0));
  float lon = atan(n.x, n.z) + t * 0.12;
  float backLon = atan(n.x, -n.z) - t * 0.12;
  float front = max(
    max(thread(lat / PI * LINES), thread(lon / PI * LINES)),
    thread((lat + lon * 0.5) / PI * LINES)
  );
  float back = max(thread(lat / PI * LINES + 0.5), thread(backLon / PI * LINES));
  float level = band(nr);
  float mesh = (front * 0.9 + back * 0.45 * (1.0 - z * 0.6)) * inside;
  float glow = exp(-max(r - edge, 0.0) * 6.0) * (0.5 + ease(u_energy) * 0.3);
  float body = inside * (0.2 + z * 0.15);

  w[1] += inside * (1.0 - z) * 0.2;
  w[3] += glow * (1.0 - inside) + body;
  w[4] += mesh * (0.8 + level * 0.3) + inside * (1.0 - nr) * 0.15;
  w[5] += mesh * level * 0.4;
}

void scene(int index, vec2 uv, float aspect, inout float w[MAX_INKS]) {
  for (int i = 0; i < MAX_INKS; i++) w[i] = 0.0;
  if (index == 1) { clouds(uv, aspect, w); return; }
  if (index == 2) { rings(uv, aspect, w); return; }
  if (index == 3) { bars(uv, aspect, w); return; }
  if (index == 4) { halo(uv, aspect, w); return; }
  if (index == 5) { wave(uv, aspect, w); return; }
  if (index == 6) { tunnel(uv, aspect, w); return; }
  if (index == 7) { kaleidoscope(uv, aspect, w); return; }
  if (index == 8) { stars(uv, aspect, w); return; }
  if (index == 9) { terrain(uv, aspect, w); return; }
  if (index == 10) { hive(uv, aspect, w); return; }
  if (index == 11) { orb(uv, aspect, w); return; }
  pools(uv, aspect, w);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.y = 1.0 - uv.y;
  float aspect = u_resolution.x / u_resolution.y;

  float a[MAX_INKS];
  float b[MAX_INKS];
  scene(u_scene_a, uv, aspect, a);
  scene(u_scene_b, uv, aspect, b);
  float blend = smoothstep(0.0, 1.0, u_mix);

  /*
   * Warmth leans the mix a little toward the warm half of the palette and
   * away from the cool half. A lean, not a switch: every ink still shows.
   */
  vec3 colour = toOklab(toLinear(u_paper));
  for (int i = 0; i < MAX_INKS; i++) {
    float warm = i < MAX_INKS / 2 ? 1.0 : -1.0;
    float lean = 1.0 + warm * (u_warmth - 0.5) * 0.3;
    float weight = clamp(mix(a[i], b[i], blend) * lean, 0.0, 1.0);
    colour = mix(colour, toOklab(toLinear(u_ink[i])), weight);
  }
  colour.yz *= CHROMA;

  vec3 rgb = toSrgb(fromOklab(colour));

  vec2 cell = floor(gl_FragCoord.xy / u_cell);
  float threshold = bayer8(cell) - 0.5;
  float grain = (hash(cell + fract(u_time)) - 0.5) * GRAIN;
  rgb = floor(rgb * u_levels + threshold + grain + 0.5) / u_levels;

  gl_FragColor = vec4(rgb, 1.0);
}
`;
