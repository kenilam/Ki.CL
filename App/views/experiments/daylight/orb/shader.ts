/** How many places the shader can mark. */
const MAX_PLACES = 12;

const VERTEX = /* glsl */ `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
 * One ink drawing, per pixel. The globe is shaded with stipple, dark dots on
 * paper where it is day and paper dots on black where it is night. Round it,
 * fine rays run out, red-orange toward the sun and blue away from it. A sun
 * stands on the side the real one is on and a moon on the other, and both
 * go round as the globe is turned.
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

/* Where the sun and the moon stand, as a share of the drawing's height. */
const float ORBIT = 0.39;
const float BODY = 0.034;

/* An engraved sun: a paper disc in a ring of spikes, long and short by turns. */
vec4 sunBody(vec2 at, vec2 grain, float pixel) {
  float radius = length(at);
  float sector = (atan(at.y, at.x) + PI) / (2.0 * PI) * 16.0;
  float longer = mod(floor(sector), 2.0);
  float reach = BODY * mix(0.6, 1.05, longer);
  float along = (radius - BODY * 1.12) / reach;

  /* The short spikes wave, as flames do in an old woodcut. */
  float across = abs(fract(sector) - 0.5 + (1.0 - longer) * 0.16 * sin(along * 5.0));
  float spike = step(0.0, along) * step(along, 1.0) * (1.0 - smoothstep(0.0, 0.06, across - 0.44 * (1.0 - along)));
  float disc = 1.0 - smoothstep(BODY, BODY + pixel, radius);
  float edge = 1.0 - smoothstep(pixel, pixel * 2.0, abs(radius - BODY));
  float shade = stipple(grain, 0.5 * smoothstep(-0.2, 1.0, dot(at / BODY, vec2(0.6, -0.7))));

  vec3 colour = mix(SUNLIT, mix(PAPER, SUNLIT, shade), disc);

  colour = mix(colour, INK, edge);

  /* A clear space round it, so it stands off the rays behind. */
  float halo = 1.0 - smoothstep(BODY * 2.4, BODY * 2.4 + pixel, radius);

  return vec4(mix(INK, colour, max(disc, spike)), halo);
}

/* An engraved moon: a crescent, its back to the sun. */
vec4 moonBody(vec2 at, vec2 away, vec2 grain, float pixel) {
  float size = BODY * 1.5;
  float outer = length(at);
  float inner = length(at - away * size * 0.42);
  float crescent = (1.0 - smoothstep(size, size + pixel, outer)) * smoothstep(size * 0.86, size * 0.86 + pixel, inner);
  float edge = max(
    1.0 - smoothstep(pixel, pixel * 2.0, abs(outer - size)),
    1.0 - smoothstep(pixel, pixel * 2.0, abs(inner - size * 0.86))
  ) * crescent;
  float shade = stipple(grain, 0.55 * smoothstep(size * 0.86, size * 1.25, inner));
  vec3 colour = mix(mix(PAPER, MOONLIT, shade), MOONLIT, edge);
  float halo = 1.0 - smoothstep(size * 1.5, size * 1.5 + pixel, outer);

  return vec4(mix(INK, colour, crescent), halo);
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
  float hatch = step(fract((abs(uv.x) + abs(uv.y)) * 60.0), 0.3) * smoothstep(0.5, 0.52, radius);

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

  /* Stipple dots are a fixed size on the page, about three pixels apart. */
  vec2 grain = gl_FragCoord.xy / max(3.0, shortest * 0.0038);

  /* Toward the sun as the viewer sees it; all round when it is behind them. */
  float side = length(uSunSeen.xy);
  float facing = dot(normalize(uv + 0.0001), uSunSeen.xy / max(side, 0.0001));
  float warmth = smoothstep(-0.4, 0.5, facing * side + uSunSeen.z * (1.0 - side));

  vec3 colour = sky(uv, radius, pixel, warmth);

  /* The sun on the side the real one is on, the moon across from it. */
  vec2 toward = side > 0.0001 ? uSunSeen.xy / side : vec2(0.0, 1.0);
  vec4 sun = sunBody(uv - toward * ORBIT, grain, pixel);
  vec4 moon = moonBody(uv + toward * ORBIT, -toward, grain, pixel);

  colour = mix(colour, sun.rgb, sun.a);
  colour = mix(colour, moon.rgb, moon.a);

  if (radius < GLOBE) {
    colour = globe(uv, grain, pixel);
  }

  /* The edge of the globe, in paper. */
  colour = mix(colour, PAPER, 1.0 - smoothstep(pixel, pixel * 2.5, abs(radius - GLOBE)));
  gl_FragColor = vec4(colour, 1.0);
}
`;

export { FRAGMENT, MAX_PLACES, VERTEX };
