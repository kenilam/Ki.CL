import { FRAGMENT, MAX_PLACES, VERTEX } from './shader';

export type Scene = {
  /** The page's column in canvas pixels; the drawing stays inside it. */
  column: number;
  /** Index into `places` of the one picked, or -1. */
  active: number;
  /** The light theme: the sky is paper and its marks are ink. */
  light: boolean;
  /** Unit vectors in the globe's frame. */
  places: readonly (readonly number[])[];
  seconds: number;
  /** Where the globe faces, as longitude from 0 to 360 and latitude. The stars go by with it. */
  turn: readonly number[];
  /** The sun in the globe's frame, and as the viewer sees it. */
  sun: readonly number[];
  sunSeen: readonly number[];
  /** Viewer to globe, column-major. */
  view: readonly number[];
};

export type Renderer = {
  dispose(): void;
  draw(scene: Scene): void;
  resize(width: number, height: number): void;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));

    return null;
  }

  return shader;
}

/** The drawing's program, a quad to draw it on, and the land as a texture. */
export function createRenderer(
  canvas: HTMLCanvasElement,
  land: HTMLImageElement
): Renderer | null {
  const gl = canvas.getContext('webgl', { antialias: false });
  const vertex = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl?.createProgram();

  if (!gl || !vertex || !fragment || !program) {
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

  const quad = gl.createBuffer();
  const position = gl.getAttribLocation(program, 'aPosition');

  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, land);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  /* The map goes round the globe, so it repeats east to west. */
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const at = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    active: at('uPlaceActive'),
    column: at('uColumn'),
    count: at('uPlaceCount'),
    light: at('uLight'),
    places: at('uPlaces'),
    seconds: at('uSeconds'),
    size: at('uSize'),
    sun: at('uSun'),
    sunSeen: at('uSunSeen'),
    turn: at('uTurn'),
    view: at('uView'),
  };
  const places = new Float32Array(MAX_PLACES * 3);

  gl.uniform1i(at('uLand'), 0);

  return {
    dispose: () => {
      gl.deleteTexture(texture);
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
    },
    draw: (scene) => {
      scene.places
        .slice(0, MAX_PLACES)
        .forEach((place, index) => places.set(place, index * 3));

      gl.uniform2f(uniforms.size, canvas.width, canvas.height);
      gl.uniform1f(uniforms.column, scene.column);
      gl.uniformMatrix3fv(uniforms.view, false, scene.view);
      gl.uniform3fv(uniforms.sun, scene.sun);
      gl.uniform3fv(uniforms.sunSeen, scene.sunSeen);
      gl.uniform1f(uniforms.seconds, scene.seconds);
      gl.uniform2fv(uniforms.turn, scene.turn);
      gl.uniform3fv(uniforms.places, places);
      gl.uniform1i(uniforms.count, Math.min(scene.places.length, MAX_PLACES));
      gl.uniform1i(uniforms.active, scene.active);
      gl.uniform1f(uniforms.light, scene.light ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    resize: (width, height) => {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    },
  };
}
