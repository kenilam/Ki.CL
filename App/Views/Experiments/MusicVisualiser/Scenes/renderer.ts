import type {
  Features,
  SceneName,
} from '@/Views/Experiments/MusicVisualiser/Spec';

import { SPECTRUM_BANDS } from '@/Views/Experiments/MusicVisualiser/Audio/features';

import { FRAGMENT, MAX_INKS, MAX_RINGS, SCENE_INDEX, VERTEX } from './shader';

/*
 * A thin wrapper over one WebGL program and a full-screen quad. It owns
 * nothing about the music or the scenes; it takes numbers and draws.
 */

export type Palette = {
  /** Packed `0xRRGGBB` inks, first underneath. Up to `MAX_INKS`. */
  inks: number[];
  paper: number;
};

export type Frame = {
  cell: number;
  features: Features;
  levels: number;
  mix: number;
  palette: Palette;
  ringStrengths: Float32Array;
  ringTimes: Float32Array;
  sceneA: SceneName;
  sceneB: SceneName;
  seconds: number;
  /** In `[0, 1]`, per track: phases the camera so no two tracks move alike. */
  seed: number;
  slowEnergy: number;
  /** `SPECTRUM_BANDS` bytes, low to high, or `null` before anything plays. */
  spectrum: Uint8Array | null;
  warmth: number;
};

export type Renderer = {
  dispose(): void;
  draw(frame: Frame): void;
  resize(width: number, height: number): void;
};

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

function unpack(colour: number, target: Float32Array, offset: number): void {
  target[offset] = ((colour >> 16) & 255) / 255;
  target[offset + 1] = ((colour >> 8) & 255) / 255;
  target[offset + 2] = (colour & 255) / 255;
}

export function createRenderer(canvas: HTMLCanvasElement): Renderer | null {
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

  /*
   * The spectrum rides in a one-row texture, one texel a band, linear
   * filtering so a scene may read between bands. Unpack alignment is set
   * to one byte since the row is not a multiple of four.
   */
  const audio = gl.createTexture();

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, audio);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  const silence = new Uint8Array(SPECTRUM_BANDS);

  const uniform = (name: string) => gl.getUniformLocation(program, name);

  const uniforms = {
    audio: uniform('u_audio'),
    cell: uniform('u_cell'),
    centroid: uniform('u_centroid'),
    energy: uniform('u_energy'),
    high: uniform('u_high'),
    ink: uniform('u_ink[0]'),
    levels: uniform('u_levels'),
    low: uniform('u_low'),
    mid: uniform('u_mid'),
    mix: uniform('u_mix'),
    paper: uniform('u_paper'),
    resolution: uniform('u_resolution'),
    ringStrength: uniform('u_ring_strength[0]'),
    ringTime: uniform('u_ring_time[0]'),
    sceneA: uniform('u_scene_a'),
    sceneB: uniform('u_scene_b'),
    seed: uniform('u_seed'),
    slowEnergy: uniform('u_slow_energy'),
    time: uniform('u_time'),
    warmth: uniform('u_warmth'),
  };

  const inks = new Float32Array(MAX_INKS * 3);
  const paper = new Float32Array(3);

  gl.uniform1i(uniforms.audio, 0);

  return {
    dispose() {
      gl.deleteTexture(audio);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
    draw(frame) {
      const { features, palette } = frame;

      unpack(palette.paper, paper, 0);

      for (let index = 0; index < MAX_INKS; index++) {
        // A short palette repeats its last ink rather than falling to black.
        const ink = palette.inks[Math.min(index, palette.inks.length - 1)];

        unpack(ink ?? palette.paper, inks, index * 3);
      }

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        SPECTRUM_BANDS,
        1,
        0,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        frame.spectrum ?? silence
      );

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, frame.seconds);
      gl.uniform3fv(uniforms.paper, paper);
      gl.uniform3fv(uniforms.ink, inks);
      gl.uniform1i(uniforms.sceneA, SCENE_INDEX[frame.sceneA]);
      gl.uniform1i(uniforms.sceneB, SCENE_INDEX[frame.sceneB]);
      gl.uniform1f(uniforms.mix, frame.mix);
      gl.uniform1f(uniforms.energy, features.energy);
      gl.uniform1f(uniforms.low, features.low);
      gl.uniform1f(uniforms.mid, features.mid);
      gl.uniform1f(uniforms.high, features.high);
      gl.uniform1f(uniforms.centroid, features.centroid);
      gl.uniform1f(uniforms.seed, frame.seed);
      gl.uniform1f(uniforms.slowEnergy, frame.slowEnergy);
      gl.uniform1f(uniforms.warmth, frame.warmth);
      gl.uniform1fv(uniforms.ringTime, frame.ringTimes.subarray(0, MAX_RINGS));
      gl.uniform1fv(
        uniforms.ringStrength,
        frame.ringStrengths.subarray(0, MAX_RINGS)
      );
      gl.uniform1f(uniforms.cell, frame.cell);
      gl.uniform1f(uniforms.levels, frame.levels);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    },
  };
}
