import { COLUMN_SHARE, FIT, GLOBE, TALL_SCALE } from './layout';

/** How many places the shader can mark. */
const MAX_PLACES = 12;

const VERTEX = /* glsl */ `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
 * One ink drawing, per pixel, on black in the dark theme and on paper in the
 * light one. The globe is shaded with stipple, dark dots on paper where it is
 * day and paper dots on black where it is night, in both themes. Round it,
 * fine rays run out, red-orange toward the sun and blue away from it. A sun
 * stands on the side the real one is on and a moon on the other, and both
 * go round as the globe is turned. Stars and a few clouds go by with it.
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
uniform float uLight;
uniform vec2 uTurn;
uniform float uDrop;
uniform float uStretch;

const float PI = 3.14159265;
const float GLOBE = ${GLOBE};
const float RAYS = 150.0;

/* The stars' grid, and how many of its cells pass in one turn of the globe. */
const float STAR = 0.045;
const float STAR_TURN = 24.0;
const vec3 INK = vec3(0.045, 0.045, 0.05);
const vec3 PAPER = vec3(0.95, 0.93, 0.87);

/* The only colour in the drawing: the rays, toward the sun and away from it. */
const vec3 SUNLIT = vec3(0.98, 0.42, 0.16);
const vec3 MOONLIT = vec3(0.42, 0.6, 0.98);

/* What the sun's and the moon's colour fades to when they are far: a warm grey. */
const vec3 FADED = vec3(0.6, 0.59, 0.56);

/* What the sky is drawn on, and what its stars, hatching and outlines are drawn in. */
vec3 ground() {
  return mix(INK, PAPER, uLight);
}

vec3 mark() {
  return mix(PAPER, INK, uLight);
}

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
vec4 sunBody(vec2 at, vec2 grain, float pixel, vec3 tint) {
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

  vec3 colour = mix(tint, mix(PAPER, tint, shade), disc);

  colour = mix(colour, INK, edge);

  return vec4(colour, max(disc, spike));
}

/* An engraved moon: a crescent, its back to the sun. */
vec4 moonBody(vec2 at, vec2 away, vec2 grain, float pixel, vec3 tint) {
  float size = BODY * 1.5;
  float outer = length(at);
  float inner = length(at - away * size * 0.42);
  float crescent = (1.0 - smoothstep(size, size + pixel, outer)) * smoothstep(size * 0.86, size * 0.86 + pixel, inner);
  float edge = max(
    1.0 - smoothstep(pixel, pixel * 2.0, abs(outer - size)),
    1.0 - smoothstep(pixel, pixel * 2.0, abs(inner - size * 0.86))
  ) * crescent;
  float shade = stipple(grain, 0.55 * smoothstep(size * 0.86, size * 1.25, inner));
  vec3 colour = mix(mix(PAPER, tint, shade), tint, edge);
  return vec4(colour, crescent);
}

/*
 * How far a ray may run with a body in the way that keeps a clear space round it. A
 * ray aimed at the body stops short of it. One that passes just beside it
 * runs on past, so the rays close in round the body.
 */
float around(float to, vec2 along, vec2 centre, float clear) {
  float reach = dot(centre, along);
  float miss = abs(centre.x * along.y - centre.y * along.x);

  if (reach <= 0.0) {
    return to;
  }

  if (miss < clear) {
    return min(to, reach - sqrt(clear * clear - miss * miss));
  }

  return mix(to, max(to, reach + clear * 0.5), 1.0 - smoothstep(clear, clear * 2.2, miss));
}

vec3 sky(vec2 uv, float radius, float pixel, float warmth, vec3 sunAt, vec3 moonAt) {
  vec3 colour = ground();

  /* Rays: red-orange and long toward the sun, blue and shorter away from it. */
  float sector = (atan(uv.y, uv.x) + PI) / (2.0 * PI) * RAYS;
  float index = floor(sector);
  float seed = hash(index);
  float across = abs(fract(sector) - 0.5) * (2.0 * PI / RAYS) * radius;
  float from = GLOBE * (1.1 + 0.12 * hash(index + 3.0));
  float to = from + (0.03 + 0.26 * seed * seed) * mix(0.55, 1.0, warmth);
  /* The ray's own direction, so the whole of it is shaped alike. */
  float bearing = (index + 0.5) / RAYS * 2.0 * PI - PI;
  vec2 along = vec2(cos(bearing), sin(bearing));

  to = around(to, along, sunAt.xy, sunAt.z);
  to = around(to, along, moonAt.xy, moonAt.z);

  float ray = (1.0 - smoothstep(pixel * 0.5, pixel * 1.5, across)) * step(from, radius) * step(radius, to);

  ray *= step(hash(index + 9.0), mix(0.6, 1.0, warmth));
  ray *= mix(1.0, step(0.5, fract(radius * 70.0)), step(0.75, hash(index + 5.0)));
  /* On paper the rays are a little darker, or the blue ones are lost. */
  colour = mix(colour, mix(MOONLIT, SUNLIT, warmth) * mix(1.0, 0.82, uLight), ray);

  /*
   * Stars: a few faint dots, and now and then a ring round one. They go by as
   * the globe is turned, and after a whole turn the same ones are back.
   */
  vec2 drift = uTurn / 360.0 * STAR_TURN * STAR;
  vec2 place = floor((uv + drift) / STAR);
  vec2 cell = vec2(mod(place.x, STAR_TURN), place.y);
  vec2 centre = (place + 0.5 + (vec2(hash2(cell), hash2(cell + 7.0)) - 0.5) * 0.6) * STAR - drift;
  float kind = hash2(cell + 23.0);
  float away = length(uv - centre);
  float size = STAR * mix(0.05, 0.16, hash2(cell + 31.0));
  float star = 1.0 - smoothstep(size, size + pixel, away);

  star = max(star, step(0.8, kind) * (1.0 - smoothstep(pixel * 0.7, pixel * 1.7, abs(away - size * 2.6))));
  /* They fade in and out at the globe and at the hatching, so none appears at once as it goes by. */
  float outward = length(centre);

  star *= step(hash2(cell + 3.0), 0.16) * smoothstep(GLOBE * 1.15, GLOBE * 1.4, outward) * (1.0 - smoothstep(0.43, 0.5, outward));
  star *= 0.4 + 0.15 * sin(uSeconds * (0.4 + kind) + kind * 40.0);
  colour = mix(colour, mark(), star);

  /* Hatching fills the corners, beyond the rays, faint enough to read words over. */
  float hatch = step(fract((abs(uv.x) + abs(uv.y)) * 60.0), 0.3) * smoothstep(0.5, 0.52, radius);

  return mix(colour, mark(), hatch * 0.1);
}

/* The clouds' grid, and how many of its cells pass in one turn of the globe. */
const vec2 CLOUD = vec2(0.42, 0.3);
const float CLOUD_TURN = 5.0;

/* How far outside a hump of a cloud a point is: a circle sitting on the base. */
float hump(vec2 at, float along, float lift, float size) {
  return length(at - vec2(along, lift)) - size;
}

/* One of three clouds: a plain one, a tall one and a long low one. */
float humps(vec2 at, float kind) {
  if (kind < 0.34) {
    return min(
      min(hump(at, -0.5, 0.0, 0.34), hump(at, -0.1, 0.12, 0.5)),
      min(hump(at, 0.35, 0.04, 0.4), hump(at, 0.7, 0.0, 0.22))
    );
  }

  if (kind < 0.67) {
    return min(
      min(hump(at, -0.6, 0.0, 0.24), hump(at, -0.25, 0.08, 0.4)),
      min(hump(at, 0.15, 0.2, 0.5), hump(at, 0.6, 0.02, 0.3))
    );
  }

  return min(
    min(hump(at, -0.72, 0.0, 0.2), hump(at, -0.38, 0.03, 0.32)),
    min(min(hump(at, 0.02, 0.0, 0.3), hump(at, 0.4, 0.06, 0.36)), hump(at, 0.76, 0.0, 0.18))
  );
}

/*
 * A few clouds over the whole drawing, the globe too: a flat base under a
 * row of humps, in paper with an ink outline and a little stipple at the
 * base. They are nearer than the stars, so they go by faster as the globe is
 * turned.
 */
vec4 cloud(vec2 uv, vec2 grain, float pixel) {
  vec2 drift = uTurn / 360.0 * CLOUD_TURN * CLOUD;
  vec2 place = floor((uv + drift) / CLOUD);
  vec2 cell = vec2(mod(place.x, CLOUD_TURN), place.y);
  vec2 centre = (place + 0.5 + (vec2(hash2(cell + 51.0), hash2(cell + 57.0)) - 0.5) * 0.3) * CLOUD - drift;

  /* A cloud grows from nothing at the hatching, so none is cut off or fades to grey. */
  float grown = 1.0 - smoothstep(0.4, 0.54, length(centre));
  float width = mix(0.1, 0.16, hash2(cell + 61.0)) * grown;
  vec2 at = (uv - centre) / max(width, 0.0001);

  /* Half of them face the other way. */
  at.x *= hash2(cell + 67.0) < 0.5 ? -1.0 : 1.0;

  float edge = humps(at, hash2(cell + 73.0));
  float unit = pixel / max(width, 0.0001);
  float body = (1.0 - smoothstep(0.0, unit, edge)) * step(0.0, at.y);
  float line = max(1.0 - smoothstep(unit * 1.5, unit * 2.5, abs(edge)), 1.0 - smoothstep(unit * 1.5, unit * 2.5, at.y));
  float shade = stipple(grain, 0.3 * (1.0 - smoothstep(0.0, 0.22, at.y)));
  /* On paper the cloud is white, so it stands off the sky as it does on black. */
  vec3 colour = mix(mix(mix(PAPER, vec3(1.0), uLight), INK, shade), INK, line);

  return vec4(colour, body * step(hash2(cell + 71.0), 0.6) * step(0.001, grown));
}

void main() {
  /*
   * The drawing is as tall as the page allows. On a wide page it takes at
   * most two thirds of the page's column and sits at the column's far edge,
   * which leaves the other third to the words.
   */
  /* The canvas can be taller than what is seen of it; the page's shape is read from that part. */
  float seen = uSize.y / uStretch;
  bool wide = uSize.x > seen;
  float column = min(uSize.x, uColumn);
  float fit = min(uSize.x, seen) * ${FIT};

  /*
   * On a tall page, a phone, the drawing is a little wider than the page, so
   * the globe is larger, and it sits below the middle, under the words.
   */
  float shortest = wide ? min(fit, column * ${COLUMN_SHARE}) : fit * ${TALL_SCALE};
  vec2 middle = uSize * 0.5 + (wide ? vec2((column - shortest) * 0.5, 0.0) : vec2(0.0, -uSize.y * uDrop));
  vec2 uv = (gl_FragCoord.xy - middle) / shortest;
  float pixel = 1.0 / shortest;
  float radius = length(uv);

  /* Stipple dots are a fixed size on the page, about three pixels apart. */
  vec2 grain = gl_FragCoord.xy / max(3.0, shortest * 0.0038);

  /* Toward the sun as the viewer sees it; all round when it is behind them. */
  float side = length(uSunSeen.xy);
  float facing = dot(normalize(uv + 0.0001), uSunSeen.xy / max(side, 0.0001));
  float warmth = smoothstep(-0.4, 0.5, facing * side + uSunSeen.z * (1.0 - side));

  /*
   * The sun on the side the real one is on, the moon across from it. Each is
   * larger and more coloured the nearer it is to the viewer: with the sun
   * behind the globe it is small and nearly grey, and the moon is large and
   * blue. Only the colour goes; the far one stays as bright. Side by side, with the
   * edge of day facing the viewer, both keep their full colour.
   */
  vec2 toward = side > 0.0001 ? uSunSeen.xy / side : vec2(0.0, 1.0);
  float near = smoothstep(-1.0, 1.0, uSunSeen.z);
  float sunSize = mix(0.4, 1.8, near);
  float moonSize = mix(1.8, 0.4, near);

  /* A large one stands a little closer in, so it stays off the hatching. */
  vec2 sunAt = toward * (ORBIT - (sunSize - 1.0) * 0.04);
  vec2 moonAt = -toward * (ORBIT - (moonSize - 1.0) * 0.04);

  /* The rays keep clear of both: they stop short of them and close in round them. */
  vec3 colour = sky(
    uv,
    radius,
    pixel,
    warmth,
    vec3(sunAt, BODY * 2.45 * sunSize),
    vec3(moonAt, BODY * 1.85 * moonSize)
  );

  vec4 sun = sunBody((uv - sunAt) / sunSize, grain, pixel / sunSize, mix(FADED, SUNLIT, mix(0.15, 1.0, smoothstep(0.0, 0.45, near))));
  vec4 moon = moonBody((uv - moonAt) / moonSize, -toward, grain, pixel / moonSize, mix(FADED, MOONLIT, mix(0.15, 1.0, 1.0 - smoothstep(0.55, 1.0, near))));

  colour = mix(colour, sun.rgb, sun.a);
  colour = mix(colour, moon.rgb, moon.a);

  if (radius < GLOBE) {
    colour = globe(uv, grain, pixel);
  }

  /* The edge of the globe. */
  colour = mix(colour, mark(), 1.0 - smoothstep(pixel, pixel * 2.5, abs(radius - GLOBE)));

  /* The clouds are over everything, the globe too. */
  vec4 clouds = cloud(uv, grain, pixel);

  colour = mix(colour, clouds.rgb, clouds.a);
  gl_FragColor = vec4(colour, 1.0);
}
`;

export { FRAGMENT, MAX_PLACES, VERTEX };
