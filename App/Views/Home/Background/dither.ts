import type { Pool, Renderer } from './Spec';

/*
 * A dither gradient in the print sense: colour that blends continuously, then
 * a fine ordered screen laid over it. The screen is what an eight-bit display
 * did to fake more tones than it had - each pixel is pushed to one of a few
 * levels, with the decision made against a fixed 8×8 threshold matrix
 * (Bayer) so the error falls in a regular, woven pattern rather than as
 * noise. Here the levels are deliberately few, so the pattern is visible: it
 * is the texture, not an artefact.
 *
 * It runs on the GPU as a fragment shader because the screen is per pixel at
 * device resolution and a CPU loop over a 4K canvas would not keep up. The
 * colour underneath is a handful of soft pools of ink, mixed in Oklab so a
 * cream meeting a blue passes through a clean lilac rather than a grey.
 */

/** How many pools the shader is compiled for. The stylesheet may use fewer. */
const MAX_POOLS = 6;

const VERTEX = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

const int MAX_POOLS = ${MAX_POOLS};

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_cell;
uniform float u_levels;
uniform vec3 u_paper;
uniform int u_count;
uniform vec3 u_ink[MAX_POOLS];
uniform vec4 u_pool[MAX_POOLS];
uniform vec2 u_shape[MAX_POOLS];

/*
 * The copy sits in the middle, and it has to be read over this. A soft
 * clearing settles the centre back toward the paper, whatever the viewport,
 * without draining it: enough colour is kept that the light still reaches
 * behind the words.
 */
const float CLEARING_INNER = 0.14;
const float CLEARING_OUTER = 0.55;
const float CLEARING_KEEP = 0.28;

/** How far a pool reaches past its radius before it has faded out. */
const float FALLOFF = 1.6;

/**
 * Domain warp: the pools are ellipses, and ellipses read as shapes. Bending
 * the space they are drawn into with a couple of slow sines lets their edges
 * wander like spilled light instead.
 */
const float WARP_LARGE = 0.07;
const float WARP_SMALL = 0.03;

/** A whisper of grain on top of the screen, so it never reads as a grid. */
const float GRAIN = 0.03;

/**
 * Chroma after the mix. Below one it settles the light further into the
 * page; the inks are already muted in the stylesheet, so this only trims
 * what the overlaps add.
 */
const float CHROMA = 0.92;

const float SPEED = 0.1;

vec3 toLinear(vec3 c) {
  return pow(c, vec3(2.2));
}

vec3 toSrgb(vec3 c) {
  return pow(max(c, 0.0), vec3(1.0 / 2.2));
}

vec3 toOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;

  l = pow(l, 1.0 / 3.0);
  m = pow(m, 1.0 / 3.0);
  s = pow(s, 1.0 / 3.0);

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

  float l = l_ * l_ * l_;
  float m = m_ * m_ * m_;
  float s = s_ * s_ * s_;

  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

/* Bayer 8×8 built recursively from the 2×2 matrix, as a threshold in [0, 1). */
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float bayer8(vec2 a) {
  return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.y = 1.0 - uv.y;

  float aspect = u_resolution.x / u_resolution.y;
  float s = u_time * SPEED;

  vec2 warped = uv + vec2(
    WARP_LARGE * sin(uv.y * 4.0 + s * 1.7) + WARP_SMALL * sin(uv.y * 9.0 - s),
    WARP_LARGE * cos(uv.x * 3.0 - s * 1.3) + WARP_SMALL * cos(uv.x * 7.0 + s * 0.6)
  );

  vec3 paper = toOklab(toLinear(u_paper));
  vec3 colour = paper;

  for (int i = 0; i < MAX_POOLS; i++) {
    if (i >= u_count) {
      break;
    }

    vec4 pool = u_pool[i];
    vec2 shape = u_shape[i];
    vec2 d = vec2((warped.x - pool.x) * aspect, warped.y - pool.y);
    float c = cos(shape.x);
    float sn = sin(shape.x);
    vec2 u = vec2((d.x * c - d.y * sn) / pool.z, (d.x * sn + d.y * c) / pool.w);
    float coverage = shape.y * exp(-dot(u, u) * FALLOFF);

    colour = mix(colour, toOklab(toLinear(u_ink[i])), clamp(coverage, 0.0, 1.0));
  }

  vec2 centred = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float clearing = smoothstep(CLEARING_INNER, CLEARING_OUTER, length(centred));

  colour = mix(paper, colour, mix(CLEARING_KEEP, 1.0, clearing));
  colour.yz *= CHROMA;

  vec3 rgb = toSrgb(fromOklab(colour));

  vec2 cell = floor(gl_FragCoord.xy / u_cell);
  float threshold = bayer8(cell);

  rgb += (hash(cell) - 0.5) * GRAIN;
  rgb = floor(rgb * u_levels + threshold) / u_levels;

  gl_FragColor = vec4(clamp(rgb, 0.0, 1.0), 1.0);
}
`;

/**
 * Four pools, laid down in this order, so the last sits on top where they
 * overlap. The composition is a diagonal: a broad field across the right and
 * top, a glow low on the right, a warm rim low on the left, and a bright band
 * running in from the top left toward the centre. Each wanders a few percent
 * around its home on its own slow cycle.
 */
function pools(seconds: number): Pool[] {
  const s = seconds * 0.1;

  return [
    {
      angle: 0.35,
      rx: 1.5,
      ry: 1,
      weight: 1,
      x: 1.05 + 0.04 * Math.cos(s * 0.9),
      y: 0.22 + 0.05 * Math.sin(s * 1.2),
    },
    {
      angle: -0.55,
      rx: 0.75,
      ry: 0.38,
      weight: 1,
      x: 0.86 + 0.05 * Math.sin(s * 0.8),
      y: 0.72 + 0.04 * Math.cos(s * 1),
    },
    {
      angle: -0.6,
      rx: 0.9,
      ry: 0.45,
      weight: 0.95,
      x: 0.12 + 0.05 * Math.sin(s * 1.1),
      y: 0.78 + 0.04 * Math.cos(s * 1.3),
    },
    {
      angle: -0.62,
      rx: 1.1,
      ry: 0.4,
      weight: 1,
      x: 0.28 + 0.05 * Math.sin(s * 0.7),
      y: 0.24 + 0.05 * Math.cos(s * 0.8),
    },
  ];
}

function unpack(rgb: number): [number, number, number] {
  return [
    ((rgb >> 16) & 0xff) / 255,
    ((rgb >> 8) & 0xff) / 255,
    (rgb & 0xff) / 255,
  ];
}

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Set the canvas up for drawing, or return `null` where WebGL is unavailable
 * - the page then simply shows its paper.
 */
function createRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    premultipliedAlpha: false,
  });

  if (!gl) {
    return null;
  }

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();

  if (!vertex || !fragment || !program) {
    return null;
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }

  gl.useProgram(program);

  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const position = gl.getAttribLocation(program, 'a_position');

  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);

  const uniforms = {
    cell: uniform('u_cell'),
    count: uniform('u_count'),
    ink: uniform('u_ink[0]'),
    levels: uniform('u_levels'),
    paper: uniform('u_paper'),
    pool: uniform('u_pool[0]'),
    resolution: uniform('u_resolution'),
    shape: uniform('u_shape[0]'),
    time: uniform('u_time'),
  };

  const inks = new Float32Array(MAX_POOLS * 3);
  const poolData = new Float32Array(MAX_POOLS * 4);
  const shapeData = new Float32Array(MAX_POOLS * 2);

  return {
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },

    draw(seconds, palette, cell, levels) {
      const count = Math.min(palette.inks.length, MAX_POOLS);
      const layout = pools(seconds);

      inks.fill(0);
      poolData.fill(0);
      shapeData.fill(0);

      for (let i = 0; i < count; i++) {
        const pool = layout[i % layout.length];

        inks.set(unpack(palette.inks[i]), i * 3);
        poolData.set([pool.x, pool.y, pool.rx, pool.ry], i * 4);
        shapeData.set([pool.angle, pool.weight], i * 2);
      }

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, seconds);
      gl.uniform1f(uniforms.cell, cell);
      gl.uniform1f(uniforms.levels, levels);
      gl.uniform3fv(uniforms.paper, unpack(palette.paper));
      gl.uniform1i(uniforms.count, count);
      gl.uniform3fv(uniforms.ink, inks);
      gl.uniform4fv(uniforms.pool, poolData);
      gl.uniform2fv(uniforms.shape, shapeData);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },

    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    },
  };
}

export { createRenderer };
