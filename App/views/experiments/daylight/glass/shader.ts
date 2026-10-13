/** How many places the shader can mark. */
const MAX_PLACES = 12;

const VERTEX = /* glsl */ `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
 * One stained-glass window, drawn per pixel: a globe of glass panes inside a
 * ring of beads and a crown of rays. Every pane is a Voronoi cell and every
 * black line is the lead between two of them. The globe's panes are lit by
 * where the sun is; the rays are warm on the side the sun is on and pale on
 * the other.
 */
const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec2 uSize;
uniform mat3 uView;
uniform vec3 uSun;
uniform vec3 uSunSeen;
uniform sampler2D uLand;
uniform float uSeconds;
uniform vec3 uPlaces[${MAX_PLACES}];
uniform int uPlaceCount;
uniform int uPlaceActive;

const float PI = 3.14159265;
const float GLOBE = 0.26;
const float BEADS_OUTER = 0.33;
const float RAYS = 16.0;
const float PANES = 9.0;
const vec3 LEAD = vec3(0.05, 0.045, 0.06);

float hash(float n) {
  return fract(sin(n) * 43758.5453);
}

vec3 hash3(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6))
  );

  return fract(sin(p) * 43758.5453);
}

/* The nearest pane's centre in xyz, and how far the pixel is from its edge in w. */
vec4 panes(vec3 p) {
  vec3 base = floor(p);
  vec3 nearest = vec3(0.0);
  float first = 8.0;
  float second = 8.0;

  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      for (int z = -1; z <= 1; z++) {
        vec3 cell = base + vec3(float(x), float(y), float(z));
        vec3 point = cell + hash3(cell);
        float far = length(point - p);

        if (far < first) {
          second = first;
          first = far;
          nearest = point;
        } else if (far < second) {
          second = far;
        }
      }
    }
  }

  return vec4(nearest, second - first);
}

/* Glass is never one flat colour: streaks, and a brighter middle. */
vec3 glass(vec3 colour, float seed, float edge, vec2 grain) {
  float streak = 0.5 + 0.5 * sin(dot(grain, vec2(cos(seed * 6.3), sin(seed * 6.3))) * 38.0 + seed * 40.0);
  float flicker = 0.94 + 0.06 * sin(uSeconds * (0.4 + seed) + seed * 50.0);

  return colour * (0.8 + 0.12 * streak + 0.2 * smoothstep(0.0, 0.3, edge)) * flicker;
}

vec4 globe(vec2 uv, float pixel) {
  vec3 seen = vec3(uv / GLOBE, 0.0);
  seen.z = sqrt(max(0.0, 1.0 - dot(seen.xy, seen.xy)));

  vec3 p = uView * seen;
  vec4 pane = panes(p * PANES);
  vec3 centre = normalize(pane.xyz);
  float seed = hash(dot(pane.xyz, vec3(1.0, 57.0, 113.0)));

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
  float light = dot(centre, uSun);
  float day = smoothstep(-0.1, 0.1, light);
  float dusk = 1.0 - smoothstep(0.0, 0.16, abs(light));

  vec3 sea = mix(
    mix(vec3(0.05, 0.08, 0.3), vec3(0.15, 0.2, 0.55), seed),
    mix(vec3(0.16, 0.6, 0.78), vec3(0.5, 0.84, 0.88), seed),
    day
  );
  vec3 ground = mix(
    mix(vec3(0.4, 0.36, 0.62), vec3(0.62, 0.68, 0.82), seed),
    mix(vec3(0.99, 0.78, 0.22), vec3(0.94, 0.47, 0.12), seed),
    day
  );

  sea = mix(sea, vec3(0.55, 0.22, 0.5), dusk * 0.55);
  ground = mix(ground, vec3(0.86, 0.26, 0.2), dusk * 0.7);

  float coast = smoothstep(0.45, 0.55, land);
  vec3 colour = glass(mix(sea, ground, coast), seed, pane.w, seen.xy * 3.0);

  /* A gold star in some of the night's sea panes. */
  vec3 offset = p * PANES - pane.xyz;
  vec2 local = vec2(dot(offset, normalize(cross(vec3(0.0, 1.0, 0.0), centre))), offset.y);
  float star = 1.0 - smoothstep(0.0, 0.012, abs(local.x) * abs(local.y));
  star *= 1.0 - smoothstep(0.1, 0.22, length(local));
  colour = mix(colour, vec3(1.0, 0.82, 0.35), star * step(0.72, seed) * (1.0 - day) * (1.0 - coast));

  /* Lead: between panes, along the coast, and round each place. */
  float lead = 1.0 - smoothstep(0.03, 0.03 + pixel * PANES * 1.5, pane.w);
  lead = max(lead, 1.0 - smoothstep(0.12, 0.3, abs(land - 0.5) * 2.0));

  for (int index = 0; index < ${MAX_PLACES}; index++) {
    if (index >= uPlaceCount) {
      break;
    }

    float away = distance(p, uPlaces[index]);
    float size = index == uPlaceActive ? 0.06 : 0.04;
    float bead = 1.0 - smoothstep(size - pixel * 2.0, size, away);
    vec3 gold = mix(vec3(1.0, 0.95, 0.75), vec3(0.98, 0.7, 0.2), smoothstep(0.0, size, away));

    colour = mix(colour, index == uPlaceActive ? vec3(1.0) : gold, bead);
    lead = mix(lead, 0.0, bead);
    lead = max(lead, (1.0 - smoothstep(size, size + 0.014, away)) * (1.0 - bead));
  }

  /* The glass is domed: darker at the rim, with a sheen from the upper left. */
  colour *= 0.72 + 0.28 * seen.z;
  colour += pow(max(dot(seen, normalize(vec3(-0.45, 0.55, 0.7))), 0.0), 28.0) * 0.22;

  return vec4(mix(colour, LEAD, lead), 1.0);
}

vec4 beads(vec2 uv, float radius, float angle, float pixel) {
  float slots = 30.0;
  float slot = floor(angle / (2.0 * PI) * slots);
  float seed = hash(slot + 7.0);
  float middle = (slot + 0.5) / slots * 2.0 * PI;
  float ring = (GLOBE + BEADS_OUTER) * 0.5;
  /* The angle is measured from the left, so the bead is on the far side of the cosine. */
  vec2 centre = -vec2(cos(middle), sin(middle)) * ring;
  float size = (BEADS_OUTER - GLOBE) * mix(0.24, 0.42, seed);
  float away = distance(uv, centre);

  vec3 cool = mix(
    mix(vec3(0.12, 0.3, 0.7), vec3(0.2, 0.65, 0.7), hash(slot + 3.0)),
    mix(vec3(0.4, 0.3, 0.7), vec3(0.45, 0.75, 0.5), hash(slot + 5.0)),
    step(0.5, seed)
  );
  vec3 marble = cool * (0.75 + 0.7 * (1.0 - smoothstep(0.0, size, distance(uv, centre + size * vec2(-0.3, 0.3)))));
  vec3 bed = glass(mix(vec3(0.04, 0.07, 0.22), vec3(0.08, 0.2, 0.3), seed), seed, 0.3, uv * 4.0);

  float inside = 1.0 - smoothstep(size - pixel, size, away);
  float lead = (1.0 - smoothstep(size, size + 0.004, away)) * (1.0 - inside);
  float edge = min(radius - GLOBE, BEADS_OUTER - radius);
  float spoke = abs(fract(angle / (2.0 * PI) * slots) - 0.5) * 2.0;

  lead = max(lead, 1.0 - smoothstep(0.0035, 0.0035 + pixel, edge));
  lead = max(lead, (1.0 - smoothstep(0.0, 0.05, 1.0 - spoke)) * (1.0 - inside));

  return vec4(mix(mix(bed, marble, inside), LEAD, lead), 1.0);
}

/* One layer of flames. Alpha is zero outside them. */
vec4 rays(float radius, float angle, float turn, float reach, float pixel, float warmth) {
  float sector = angle / (2.0 * PI) * RAYS + turn;
  float index = floor(sector);
  float seed = hash(index + turn * 31.0);
  float tall = reach * mix(0.62, 1.0, seed);
  float along = (radius - BEADS_OUTER) / tall;

  if (along < 0.0 || along > 1.0) {
    return vec4(0.0);
  }

  /* The flame leans one way or the other as it rises. */
  float across = fract(sector) - 0.5 - (seed - 0.5) * 0.9 * along * along;
  float spread = 0.5 * pow(1.0 - along, 0.7);
  float arc = 2.0 * PI / RAYS * radius;
  float inside = (spread - abs(across)) * arc;

  if (inside < 0.0) {
    return vec4(0.0);
  }

  float band = floor(along * 3.0 + seed);
  float shade = hash(index * 3.0 + band + step(0.0, across) * 17.0);
  vec3 warm = mix(
    mix(vec3(1.0, 0.86, 0.3), vec3(0.98, 0.6, 0.12), shade),
    mix(vec3(0.95, 0.4, 0.1), vec3(0.78, 0.13, 0.1), shade),
    smoothstep(0.2, 0.85, along)
  );
  vec3 pale = mix(
    mix(vec3(0.96, 0.94, 0.86), vec3(0.82, 0.86, 0.9), shade),
    mix(vec3(0.5, 0.72, 0.86), vec3(0.2, 0.42, 0.72), shade),
    smoothstep(0.35, 0.95, along) * step(0.45, seed)
  );
  vec3 colour = glass(mix(pale, warm, warmth), shade, 0.3, vec2(radius, angle) * 5.0);

  float lead = 1.0 - smoothstep(0.003, 0.003 + pixel, inside);
  lead = max(lead, 1.0 - smoothstep(0.002, 0.002 + pixel, abs(across) * arc));
  /* The cuts across a flame, where its colour changes. */
  float cut = abs(fract(along * 3.0 + seed) - 0.5) * 2.0;
  float came = 0.015 / tall;

  lead = max(lead, smoothstep(1.0 - came - pixel * 6.0 / tall, 1.0 - came, cut));

  return vec4(mix(colour, LEAD, clamp(lead, 0.0, 1.0)), smoothstep(0.0, pixel, inside));
}

void main() {
  /* On a wide page the window sits right of the middle, clear of the words. */
  float shortest = min(uSize.x, uSize.y) * 0.92;
  vec2 middle = uSize * 0.5 + vec2(max(0.0, uSize.x - uSize.y) * 0.22, 0.0);
  vec2 uv = (gl_FragCoord.xy - middle) / shortest;
  float pixel = 1.0 / shortest;
  float radius = length(uv);
  float angle = atan(uv.y, uv.x) + PI;

  /* Warm where the sun is, as the viewer sees it; all warm when it is behind them. */
  float side = length(uSunSeen.xy);
  float facing = dot(normalize(uv + 0.0001), uSunSeen.xy / max(side, 0.0001));
  float warmth = smoothstep(-0.35, 0.35, facing * side + uSunSeen.z * (1.0 - side));

  vec4 colour = vec4(0.0);

  if (radius < GLOBE) {
    colour = globe(uv, pixel);
  } else if (radius < BEADS_OUTER) {
    colour = beads(uv, radius, angle, pixel);
  } else {
    vec4 back = rays(radius, angle, 0.5, 0.1, pixel, warmth);
    vec4 front = rays(radius, angle, 0.0, 0.15, pixel, warmth);

    colour = mix(back, vec4(front.rgb, 1.0), front.a);
  }

  /* The lead round the globe. */
  float rim = 1.0 - smoothstep(0.004, 0.004 + pixel, abs(radius - GLOBE));

  colour = mix(colour, vec4(LEAD, 1.0), rim);
  gl_FragColor = vec4(colour.rgb * colour.a, colour.a);
}
`;

export { FRAGMENT, MAX_PLACES, VERTEX };
