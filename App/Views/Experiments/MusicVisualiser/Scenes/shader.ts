import type { SceneName } from '@/Views/Experiments/MusicVisualiser/Spec';

/*
 * All three scenes live in one fragment shader, each as a function from
 * screen position to a colour weight per ink. The stage picks two by index
 * and a mix between them, so a crossfade is one `mix()` and never a second
 * pass or a second canvas.
 *
 * The colour work is the same as the home background: inks laid over paper
 * and blended in Oklab, then a light ordered dither so the surface has the
 * site's grain rather than a smooth gradient's plastic.
 */

/** Index of each scene, as the shader knows it. */
export const SCENE_INDEX: Record<SceneName, number> = {
  pools: 0,
  ribbons: 1,
  rings: 2,
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
 * Pools: four soft ellipses of ink, one per palette entry, drifting on
 * their own clocks. Bass swells them; the section's energy sets how much
 * of the paper they cover at rest.
 */
void pools(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  float t = u_time * 0.035;
  /* The bass swells the pools, gently, and the section's energy sets their rest size. */
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
 * Ribbons: bands of ink streaming across a warped field. Mids push the
 * flow; brightness tightens the bands so a sparkle reads as fine lines and
 * a dark passage as broad washes.
 */
void ribbons(vec2 uv, float aspect, inout float w[MAX_INKS]) {
  float t = u_time * (0.022 + ease(u_mid) * 0.02);
  vec2 p = uv * vec2(aspect, 1.0);

  vec2 q = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 - t * 0.7 + 4.0));
  vec2 r = vec2(
    fbm(p * 2.0 + q * 1.8 + t * 0.4),
    fbm(p * 2.0 + q * 1.8 - t * 0.3 + 2.0)
  );
  float field = fbm(p * 1.2 + r * 2.2);

  /*
   * One phase runs through the field; each ink takes a slice of it, so the
   * bands come round in palette order and every colour has its turn.
   */
  float frequency = 4.0 + ease(u_centroid) * 6.0;
  float phase = field * frequency + p.x * 1.2 - t * 1.6;
  float lift = 0.2 + ease(u_energy) * 0.3;

  for (int i = 0; i < MAX_INKS; i++) {
    float offset = float(i) / float(MAX_INKS);
    float band = 0.5 + 0.5 * sin((phase - offset) * 6.28318);
    w[i] = smoothstep(0.55, 0.95, band) * (0.55 + lift);
  }

  /* A soft wash of the last ink under it all, lifted by the air in the sound. */
  w[MAX_INKS - 1] += field * 0.3 * (0.5 + ease(u_high));
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

    /* Slow to grow, wide, and long to fade: a ripple on still water. */
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

void scene(int index, vec2 uv, float aspect, inout float w[MAX_INKS]) {
  for (int i = 0; i < MAX_INKS; i++) w[i] = 0.0;
  if (index == 1) { ribbons(uv, aspect, w); return; }
  if (index == 2) { rings(uv, aspect, w); return; }
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
