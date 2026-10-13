/** How many places the shader can mark. */
const MAX_PLACES = 12;

const VERTEX = /* glsl */ `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
 * One ink drawing, per pixel, in two colours: black and paper. The globe is
 * shaded with stipple, dark dots on paper where it is day and paper dots on
 * black where it is night. Round it, fine rays run out on the side the sun is
 * on, and dots and rings are scattered like stars. It rests on a horizon, with
 * lines on the ground running in to where it touches.
 */
const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec2 uSize;
uniform float uColumn;
uniform mat3 uView;
uniform vec3 uSun;
uniform vec3 uSunSeen;
uniform sampler2D uLand;
uniform float uSeconds;
uniform vec3 uPlaces[${MAX_PLACES}];
uniform int uPlaceCount;
uniform int uPlaceActive;

const float PI = 3.14159265;
const float GLOBE = 0.2;
const float RAYS = 150.0;
const vec3 INK = vec3(0.045, 0.045, 0.05);
const vec3 PAPER = vec3(0.95, 0.93, 0.87);

/* The only colour in the drawing: the rays, toward the sun and away from it. */
const vec3 SUNLIT = vec3(0.98, 0.42, 0.16);
const vec3 MOONLIT = vec3(0.42, 0.6, 0.98);

float hash(float n) {
  return fract(sin(n) * 43758.5453);
}

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

/* 1 on a stipple dot. The tone is the share of the grid that gets one. */
float stipple(vec2 at, float tone) {
  vec2 cell = floor(at);
  vec2 centre = vec2(hash2(cell), hash2(cell + 17.0)) * 0.5 + 0.25;
  float away = length(fract(at) - centre);

  /* A tone of nothing draws nothing, whatever the hash rounds to. */
  return step(hash2(cell + 41.0), tone) * step(0.001, tone) * (1.0 - smoothstep(0.26, 0.4, away));
}

/* 1 on an arc of a circle: within width of radius, between two angles. */
float arc(vec2 at, float radius, float from, float to, float width, float pixel) {
  float angle = atan(at.y, at.x);
  float line = 1.0 - smoothstep(width, width + pixel, abs(length(at) - radius));

  return line * smoothstep(from, from + 0.15, angle) * (1.0 - smoothstep(to - 0.15, to, angle));
}

vec3 globe(vec2 uv, vec2 grain, float pixel) {
  vec3 seen = vec3(uv / GLOBE, 0.0);
  seen.z = sqrt(max(0.0, 1.0 - dot(seen.xy, seen.xy)));

  vec3 p = uView * seen;
  vec2 map = vec2(atan(p.x, p.z) / (2.0 * PI) + 0.5, 0.5 - asin(clamp(p.y, -1.0, 1.0)) / PI);

  /* Five taps, so the coast is a line and not a row of squares. */
  vec2 texel = vec2(1.0 / 512.0, 1.0 / 256.0) * 1.2;
  float land = (
    texture2D(uLand, map).r * 2.0 +
    texture2D(uLand, map + vec2(texel.x, 0.0)).r +
    texture2D(uLand, map - vec2(texel.x, 0.0)).r +
    texture2D(uLand, map + vec2(0.0, texel.y)).r +
    texture2D(uLand, map - vec2(0.0, texel.y)).r
  ) / 6.0;
  float ground = smoothstep(0.45, 0.55, land);
  float day = smoothstep(-0.03, 0.03, dot(p, uSun));

  /* The drawing's own light is from the upper left, wherever the sun is. */
  float shade = smoothstep(0.25, 1.1, 1.0 - dot(seen, normalize(vec3(-0.5, 0.55, 0.67))));
  float byDay = stipple(grain, ground * 0.5 + shade * 0.5);
  float byNight = stipple(grain, ground * 0.6 * (1.0 - shade * 0.6) + 0.015);
  vec3 colour = mix(mix(INK, PAPER, byNight), mix(PAPER, INK, byDay), day);

  /* Whatever is drawn in line is paper on the night and ink on the day. */
  vec3 line = mix(PAPER, INK, day);
  float coast = 1.0 - smoothstep(0.15, 0.4, abs(land - 0.5) * 2.0);

  colour = mix(colour, line, coast);

  /* Two strokes of gloss, as on a glass ball. */
  vec2 gloss = uv / GLOBE - vec2(0.02, -0.02);
  float strokes =
    arc(gloss, 0.8, 1.75, 2.9, 0.012, pixel / GLOBE) +
    arc(gloss, 0.62, -0.3, 0.75, 0.01, pixel / GLOBE);

  colour = mix(colour, line, clamp(strokes, 0.0, 1.0));

  for (int index = 0; index < ${MAX_PLACES}; index++) {
    if (index >= uPlaceCount) {
      break;
    }

    float away = distance(p, uPlaces[index]);
    float ring = 1.0 - smoothstep(0.008, 0.008 + pixel / GLOBE, abs(away - 0.045));
    float dot = 1.0 - smoothstep(0.016, 0.016 + pixel / GLOBE, away);
    float disc = 1.0 - smoothstep(0.045, 0.045 + pixel / GLOBE, away);

    /* The place picked is a full disc; the others are a ring round a dot. */
    colour = mix(colour, mix(INK, PAPER, day), disc);
    colour = mix(colour, line, index == uPlaceActive ? disc : max(ring, dot));
  }

  return colour;
}

vec3 ground(vec2 uv, vec2 grain, float horizon) {
  vec2 from = uv - vec2(0.0, horizon);
  float angle = atan(from.x, -from.y);
  float fan = 1.0 - smoothstep(0.75, 0.8, abs(angle));
  float lines = step(0.5, fract(angle * 22.0)) * fan;

  /* The lines thin out toward the horizon, where they would run together. */
  lines *= smoothstep(0.0, 0.06, -from.y);

  float shadow = 1.0 - smoothstep(0.2, 1.0, length(from * vec2(1.0, 3.4)) / (GLOBE * 1.25));
  float haze = 0.22 * (1.0 - smoothstep(0.0, 0.07, -from.y));
  /* A little grit everywhere, more under the globe and along the horizon. */
  float dots = stipple(grain, max(max(shadow, haze), 0.004));

  /* The lines are grey, not black, so the ground stays quiet. */
  return mix(PAPER, INK, max(max(lines * 0.45, dots), step(0.75, shadow)));
}

vec3 sky(vec2 uv, float radius, float pixel, float warmth) {
  vec3 colour = INK;

  /* Rays: red-orange and long toward the sun, blue and shorter away from it. */
  float sector = (atan(uv.y, uv.x) + PI) / (2.0 * PI) * RAYS;
  float index = floor(sector);
  float seed = hash(index);
  float across = abs(fract(sector) - 0.5) * (2.0 * PI / RAYS) * radius;
  float from = GLOBE * (1.1 + 0.12 * hash(index + 3.0));
  float to = from + (0.03 + 0.26 * seed * seed) * mix(0.55, 1.0, warmth);
  float ray = (1.0 - smoothstep(pixel * 0.5, pixel * 1.5, across)) * step(from, radius) * step(radius, to);

  ray *= step(hash(index + 9.0), mix(0.6, 1.0, warmth));
  ray *= mix(1.0, step(0.5, fract(radius * 70.0)), step(0.75, hash(index + 5.0)));
  colour = mix(colour, mix(MOONLIT, SUNLIT, warmth), ray);

  /* Stars: a few faint dots, and now and then a ring round one. */
  vec2 cell = floor(uv / 0.045);
  vec2 centre = (cell + 0.5 + (vec2(hash2(cell), hash2(cell + 7.0)) - 0.5) * 0.6) * 0.045;
  float kind = hash2(cell + 23.0);
  float away = length(uv - centre);
  float size = 0.045 * mix(0.05, 0.16, hash2(cell + 31.0));
  float star = 1.0 - smoothstep(size, size + pixel, away);

  star = max(star, step(0.8, kind) * (1.0 - smoothstep(pixel * 0.7, pixel * 1.7, abs(away - size * 2.6))));
  star *= step(hash2(cell + 3.0), 0.16) * step(GLOBE * 1.2, length(centre)) * step(length(centre), 0.48);
  star *= 0.4 + 0.15 * sin(uSeconds * (0.4 + kind) + kind * 40.0);
  colour = mix(colour, PAPER, star);

  /* Hatching fills the corners, beyond the rays, faint enough to read words over. */
  float hatch = step(fract((abs(uv.x) + uv.y) * 60.0), 0.3) * smoothstep(0.5, 0.52, radius);

  return mix(colour, PAPER, hatch * 0.1);
}

void main() {
  /*
   * The drawing is as tall as the page allows. On a wide page it takes at
   * most two thirds of the page's column and sits at the column's far edge,
   * which leaves the other third to the words.
   */
  bool wide = uSize.x > uSize.y;
  float column = min(uSize.x, uColumn);
  float fit = min(uSize.x, uSize.y) * 0.92;
  float shortest = wide ? min(fit, column * 0.66) : fit;
  vec2 middle = uSize * 0.5 + vec2(wide ? (column - shortest) * 0.5 : 0.0, 0.0);
  vec2 uv = (gl_FragCoord.xy - middle) / shortest;
  float pixel = 1.0 / shortest;
  float radius = length(uv);
  float horizon = -GLOBE * 0.97;

  /* Stipple dots are a fixed size on the page, about three pixels apart. */
  vec2 grain = gl_FragCoord.xy / max(3.0, shortest * 0.0038);

  /* Toward the sun as the viewer sees it; all round when it is behind them. */
  float side = length(uSunSeen.xy);
  float facing = dot(normalize(uv + 0.0001), uSunSeen.xy / max(side, 0.0001));
  float warmth = smoothstep(-0.4, 0.5, facing * side + uSunSeen.z * (1.0 - side));

  vec3 colour = uv.y < horizon ? ground(uv, grain, horizon) : sky(uv, radius, pixel, warmth);

  /* The horizon, and the edge of the globe, in paper. */
  colour = mix(colour, PAPER, (1.0 - smoothstep(pixel, pixel * 2.0, abs(uv.y - horizon))) * step(GLOBE, radius));

  if (radius < GLOBE) {
    colour = globe(uv, grain, pixel);
  }

  colour = mix(colour, PAPER, 1.0 - smoothstep(pixel, pixel * 2.5, abs(radius - GLOBE)));
  gl_FragColor = vec4(colour, 1.0);
}
`;

export { FRAGMENT, MAX_PLACES, VERTEX };
