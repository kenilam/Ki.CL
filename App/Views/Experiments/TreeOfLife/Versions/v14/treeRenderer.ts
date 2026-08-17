/**
 * 2D WebGL tree drawer - visual parity with the former SVG poster
 * (tapered gradient ribbons, pedicels, rank markers, growth, focus dim).
 *
 * Wind: local hinge flutter only for branches with depth ≤ WIND_MAX_DEPTH.
 * Deeper branches inherit parent tip pose (worldDeg from ancestors, localDeg=0)
 * so the canopy stays connected without per-tip wind cost.
 */
import {
  rankVisual,
  type RankShape,
} from '@/Views/Experiments/TreeOfLife/tree';

import {
  cubicAt,
  darkenHex,
  hangPedicelPoints,
  hexToRgb,
  pedicelAttachT,
  quadraticStrokeMesh,
  taperedRibbonMesh,
  type BranchCurve,
  type LayoutNode,
  type LayoutResult,
  type Vec2,
} from './layoutEngine';

export const WIND_MAX_DEPTH = 2;

const BRANCH_MS = 520;
const PEDICEL_MS = 280;
const NODE_MS = 220;
const ORIGIN_GREEN: [number, number, number] = [
  0x0d / 255,
  0xae / 255,
  0x6b / 255,
];

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
layout(location=1) in vec4 a_color;
uniform vec2 u_resolve;
uniform vec2 u_camera;
uniform float u_scale;
uniform float u_rootOffsetY;
uniform float u_canopyDeg;
out vec4 v_color;
void main() {
  float rad = u_canopyDeg * 0.017453292519943295;
  float c = cos(rad);
  float s = sin(rad);
  vec2 p = a_pos;
  // Canopy sway about the origin joint (0,0) in tree space.
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  p = p + vec2(0.0, u_rootOffsetY);
  p = p * u_scale + u_camera * u_scale;
  vec2 clip = vec2(p.x / u_resolve.x, -(p.y / u_resolve.y));
  gl_Position = vec4(clip, 0.0, 1.0);
  v_color = a_color;
}`;

const FRAG_SRC = `#version 300 es
precision highp float;
in vec4 v_color;
out vec4 outColor;
void main() {
  outColor = v_color;
}`;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function branchDelay(growthDepth: number): number {
  return Math.max(0, growthDepth - 1) * (BRANCH_MS + PEDICEL_MS + NODE_MS);
}

function pedicelRevealDelay(growthDepth: number): number {
  return branchDelay(growthDepth) + BRANCH_MS;
}

function nodeRevealDelay(
  growthDepth: number,
  isOrigin: boolean,
  hasPedicel: boolean
): number {
  if (isOrigin) {
    return 0;
  }
  const afterBranch = pedicelRevealDelay(growthDepth);
  return hasPedicel ? afterBranch + PEDICEL_MS : afterBranch;
}

function growthDuration(growthDepth: number): number {
  return Math.max(1, growthDepth) * (BRANCH_MS + PEDICEL_MS + NODE_MS) + 64;
}

function windPhase(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function rotateVec(point: Vec2, origin: Vec2, deg: number): Vec2 {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const dx = point[0] - origin[0];
  const dy = point[1] - origin[1];
  return [origin[0] + dx * cos - dy * sin, origin[1] + dx * sin + dy * cos];
}

function hingeCurve(
  curve: BranchCurve,
  hinge: Vec2,
  worldDeg: number
): BranchCurve {
  const origin = curve.p0;
  const tilted: BranchCurve = {
    p0: origin,
    c1: rotateVec(curve.c1, origin, worldDeg),
    c2: rotateVec(curve.c2, origin, worldDeg),
    p3: rotateVec(curve.p3, origin, worldDeg),
  };
  const dx = hinge[0] - tilted.p0[0];
  const dy = hinge[1] - tilted.p0[1];
  if (dx === 0 && dy === 0) {
    return tilted;
  }
  return {
    p0: [tilted.p0[0] + dx, tilted.p0[1] + dy],
    c1: [tilted.c1[0] + dx, tilted.c1[1] + dy],
    c2: [tilted.c2[0] + dx, tilted.c2[1] + dy],
    p3: [tilted.p3[0] + dx, tilted.p3[1] + dy],
  };
}

function rgb01(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  return [r / 255, g / 255, b / 255];
}

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('WebGL shader alloc failed');
  }
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? 'compile error';
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
}

function pushDisk(
  out: number[],
  cx: number,
  cy: number,
  radius: number,
  rgb: [number, number, number],
  alpha: number,
  segments = 20
): void {
  for (let i = 0; i < segments; i += 1) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    out.push(cx, cy, rgb[0], rgb[1], rgb[2], alpha);
    out.push(
      cx + Math.cos(a0) * radius,
      cy + Math.sin(a0) * radius,
      rgb[0],
      rgb[1],
      rgb[2],
      alpha
    );
    out.push(
      cx + Math.cos(a1) * radius,
      cy + Math.sin(a1) * radius,
      rgb[0],
      rgb[1],
      rgb[2],
      alpha
    );
  }
}

function pushRing(
  out: number[],
  cx: number,
  cy: number,
  inner: number,
  outer: number,
  rgb: [number, number, number],
  alpha: number,
  segments = 28
): void {
  for (let i = 0; i < segments; i += 1) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const c0 = Math.cos(a0);
    const s0 = Math.sin(a0);
    const c1 = Math.cos(a1);
    const s1 = Math.sin(a1);
    const push = (x: number, y: number) => {
      out.push(x, y, rgb[0], rgb[1], rgb[2], alpha);
    };
    push(cx + c0 * inner, cy + s0 * inner);
    push(cx + c0 * outer, cy + s0 * outer);
    push(cx + c1 * outer, cy + s1 * outer);
    push(cx + c0 * inner, cy + s0 * inner);
    push(cx + c1 * outer, cy + s1 * outer);
    push(cx + c1 * inner, cy + s1 * inner);
  }
}

function pushRoundedRect(
  out: number[],
  cx: number,
  cy: number,
  half: number,
  rx: number,
  rgb: [number, number, number],
  alpha: number,
  rotationDeg: number,
  scale: number
): void {
  const rad = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const s = half * scale;
  const corner = Math.min(rx * scale, s * 0.9);
  // Approximate rounded square as a disk-smoothed diamond/box via 4 fans + core.
  // Core quad
  const corners: Vec2[] = [
    [-s + corner, -s],
    [s - corner, -s],
    [s, -s + corner],
    [s, s - corner],
    [s - corner, s],
    [-s + corner, s],
    [-s, s - corner],
    [-s, -s + corner],
  ];
  const xform = (p: Vec2): Vec2 => [
    cx + (p[0] * cos - p[1] * sin),
    cy + (p[0] * sin + p[1] * cos),
  ];
  const hub = xform([0, 0]);
  for (let i = 0; i < corners.length; i += 1) {
    const a = xform(corners[i]!);
    const b = xform(corners[(i + 1) % corners.length]!);
    out.push(hub[0], hub[1], rgb[0], rgb[1], rgb[2], alpha);
    out.push(a[0], a[1], rgb[0], rgb[1], rgb[2], alpha);
    out.push(b[0], b[1], rgb[0], rgb[1], rgb[2], alpha);
  }
}

function markerAnim(
  shape: RankShape,
  timeMs: number
): { scale: number; rotDeg: number } {
  // ~6s alternate ease - matches Styles.scss keyframes.
  const period = 6000;
  const u = (timeMs % period) / period;
  const wave = Math.sin(u * Math.PI * 2) * 0.5 + 0.5;
  if (shape === 'diamond') {
    return { scale: 0.88 + 0.24 * wave, rotDeg: -12 + 24 * wave };
  }
  if (shape === 'square') {
    return { scale: 0.82 + 0.32 * wave, rotDeg: 0 };
  }
  // tip / default circle breathe
  return { scale: 0.85 + 0.3 * wave, rotDeg: 0 };
}

function pushRankMarker(
  out: number[],
  cx: number,
  cy: number,
  radius: number,
  rank: string | null | undefined,
  colorHex: string,
  expanding: boolean,
  alpha: number,
  timeMs: number,
  nodeScale: number
): number {
  const visual = rankVisual(rank);
  const anim = markerAnim(visual.shape, timeMs);
  let r =
    Math.max(1.1, radius * visual.scale) * (expanding ? 1.35 : 1) * nodeScale;
  r *= anim.scale;
  const rgb = rgb01(darkenHex(colorHex));
  const hit = Math.max(r * 2.2, 8);

  switch (visual.shape) {
    case 'double-ring':
      pushRing(
        out,
        cx,
        cy,
        r * 1.28 - Math.max(0.7, r * 0.18),
        r * 1.28,
        rgb,
        alpha * 0.55
      );
      pushRing(
        out,
        cx,
        cy,
        r * 1.14 - Math.max(0.85, r * 0.22),
        r * 1.14,
        rgb,
        alpha
      );
      pushDisk(out, cx, cy, r, rgb, alpha);
      break;
    case 'ring':
      pushRing(
        out,
        cx,
        cy,
        r * 1.18 - Math.max(0.8, r * 0.26),
        r * 1.18,
        rgb,
        alpha
      );
      pushDisk(out, cx, cy, r, rgb, alpha);
      break;
    case 'diamond':
      pushRoundedRect(
        out,
        cx,
        cy,
        r * 1.55,
        r * 1.55 * 0.18,
        rgb,
        alpha,
        45 + anim.rotDeg,
        1
      );
      break;
    case 'square':
      pushRoundedRect(
        out,
        cx,
        cy,
        r * 1.25,
        r * 1.25 * 0.28,
        rgb,
        alpha,
        anim.rotDeg,
        1
      );
      break;
    case 'outline':
      pushRing(
        out,
        cx,
        cy,
        r * 1.16 - Math.max(0.9, r * 0.32),
        r * 1.16,
        rgb,
        alpha
      );
      pushDisk(out, cx, cy, r, rgb, alpha);
      break;
    default:
      pushDisk(out, cx, cy, r, rgb, alpha);
      break;
  }
  return hit;
}

function pushPulse(
  out: number[],
  cx: number,
  cy: number,
  radius: number,
  rgb: [number, number, number],
  timeMs: number
): void {
  const period = 6000;
  const u = (timeMs % period) / period;
  const u2 = ((timeMs + period * 0.35) % period) / period;
  const ring = (t: number, base: number) => {
    const scale = 0.7 + 0.75 * t;
    const alpha = 0.65 * (1 - t);
    const r = Math.max(1.4, radius) * base * scale;
    const stroke = Math.max(0.55, radius * 0.12);
    pushRing(out, cx, cy, Math.max(0.2, r - stroke), r, rgb, alpha);
  };
  ring(u, 1.55);
  ring(u2, 2.05);
}

export type TreeCamera = {
  x: number;
  y: number;
  scale: number;
};

export type TreeRendererHandlers = {
  onHover: (id: string | null) => void;
  onNodeClick: (node: LayoutNode) => void;
  onBackdropClick: () => void;
};

type GrowthState = {
  seen: Set<string>;
  bornAt: Map<string, number>;
  birthDepth: Map<string, number>;
  seeded: boolean;
};

export class TreeRenderer {
  readonly canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private vbo: WebGLBuffer;
  private vao: WebGLVertexArrayObject;
  private uResolve: WebGLUniformLocation;
  private uCamera: WebGLUniformLocation;
  private uScale: WebGLUniformLocation;
  private uRootOffsetY: WebGLUniformLocation;
  private uCanopyDeg: WebGLUniformLocation;

  private layout: LayoutResult | null = null;
  private camera: TreeCamera = { x: 0, y: 0, scale: 1 };
  private rootOffsetY = 0;
  private expandingIds: ReadonlySet<string> = new Set();
  private focusIds: ReadonlySet<string> | null = null;
  private selectedId: string | null = null;
  private labelId: string | null = null;
  /** Hard pin (click/search) - wind + growth stay paused until cleared. */
  private pinnedId: string | null = null;
  private handlers: TreeRendererHandlers = {
    onHover: () => {},
    onNodeClick: () => {},
    onBackdropClick: () => {},
  };

  private growth: GrowthState = {
    seen: new Set(),
    bornAt: new Map(),
    birthDepth: new Map(),
    seeded: false,
  };

  private growthFreezeStartedAt: number | null = null;
  private growthFrozenMs = 0;

  private raf = 0;
  private running = false;
  private reducedMotion = false;

  // Wind state (mirrors former SVG useTreeWind).
  private strength = 0.15;
  private targetStrength = 0.22;
  private dir = Math.random() * Math.PI * 2;
  private targetDir = this.dir;
  private rate = 0.002;
  private nextGustAt = performance.now() + 1800;
  private lastWind = performance.now();
  private canopyDeg = 0;
  private targetCanopyDeg = 0;
  private gustKind: 'none' | 'ambient' | 'blow' = 'none';
  private gustStartedAt = 0;
  private gustDurationMs = 1;
  private gustAttackFrac = 0.14;
  private gustPeakStrength = 0;
  private gustBaseStrength = 0.18;
  private gustPeakCanopy = 0;
  private gustBaseCanopy = 0;
  private blowClickCount = 0;
  private ambientSide = 1;
  private blowingButton: HTMLButtonElement | null = null;
  /** When set, wind eases to rest so the focused node is readable. */
  private hoveredId: string | null = null;
  /** Growth clock frozen because of hover or pin (independent of blow freeze). */
  private growthFrozenByInteraction = false;

  /** Hit targets in tree space (updated each frame). */
  private hits: Array<{
    id: string;
    node: LayoutNode;
    x: number;
    y: number;
    r: number;
    /** Unit-ish growth direction in tree space (toward tip / along hang). */
    dirX: number;
    dirY: number;
    hasPedicel: boolean;
  }> = [];

  private drag: {
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null = null;

  private onCameraChange: ((camera: TreeCamera) => void) | null = null;
  private clampScale: (scale: number) => number = (s) => s;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!gl) {
      throw new Error('WebGL2 unavailable');
    }
    this.gl = gl;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    const program = gl.createProgram();
    if (!program) {
      throw new Error('WebGL program alloc failed');
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? 'link error');
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    this.program = program;

    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    if (!vao || !vbo) {
      throw new Error('WebGL buffer alloc failed');
    }
    this.vao = vao;
    this.vbo = vbo;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 24, 8);

    const uResolve = gl.getUniformLocation(program, 'u_resolve');
    const uCamera = gl.getUniformLocation(program, 'u_camera');
    const uScale = gl.getUniformLocation(program, 'u_scale');
    const uRootOffsetY = gl.getUniformLocation(program, 'u_rootOffsetY');
    const uCanopyDeg = gl.getUniformLocation(program, 'u_canopyDeg');
    if (!uResolve || !uCamera || !uScale || !uRootOffsetY || !uCanopyDeg) {
      throw new Error('WebGL uniforms missing');
    }
    this.uResolve = uResolve;
    this.uCamera = uCamera;
    this.uScale = uScale;
    this.uRootOffsetY = uRootOffsetY;
    this.uCanopyDeg = uCanopyDeg;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    this.reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', this.onPointerUp);
    canvas.addEventListener('pointerleave', this.onPointerLeave);
    canvas.addEventListener('wheel', this.onWheel, { passive: false });
  }

  setHandlers(handlers: TreeRendererHandlers): void {
    this.handlers = handlers;
  }

  setBlowingButton(button: HTMLButtonElement | null): void {
    this.blowingButton = button;
  }

  setCameraControls(opts: {
    onCameraChange: (camera: TreeCamera) => void;
    clampScale: (scale: number) => number;
  }): void {
    this.onCameraChange = opts.onCameraChange;
    this.clampScale = opts.clampScale;
  }

  setScene(opts: {
    layout: LayoutResult;
    camera: TreeCamera;
    rootOffsetY: number;
    expandingIds: ReadonlySet<string>;
    focusIds: ReadonlySet<string> | null;
    selectedId: string | null;
    pinnedId: string | null;
    labelId: string | null;
  }): void {
    this.layout = opts.layout;
    this.camera = opts.camera;
    this.rootOffsetY = opts.rootOffsetY;
    this.expandingIds = opts.expandingIds;
    this.focusIds = opts.focusIds;
    this.selectedId = opts.selectedId;
    this.pinnedId = opts.pinnedId;
    this.labelId = opts.labelId;
    this.syncGrowth(opts.layout);
    this.syncInteractionPause();
  }

  blowGust = (): void => {
    if (this.reducedMotion) {
      return;
    }
    this.applyGust('blow');
  };

  start(): void {
    if (this.running) {
      return;
    }
    this.running = true;
    const frame = (now: number) => {
      if (!this.running) {
        return;
      }
      this.tickWind(now);
      this.draw(now);
      this.raf = requestAnimationFrame(frame);
    };
    this.raf = requestAnimationFrame(frame);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.setGrowthFrozen(false);
    this.setBlowingUi(false);
  }

  dispose(): void {
    this.stop();
    const { canvas, gl } = this;
    canvas.removeEventListener('pointerdown', this.onPointerDown);
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('pointerup', this.onPointerUp);
    canvas.removeEventListener('pointercancel', this.onPointerUp);
    canvas.removeEventListener('pointerleave', this.onPointerLeave);
    canvas.removeEventListener('wheel', this.onWheel);
    gl.deleteBuffer(this.vbo);
    gl.deleteVertexArray(this.vao);
    gl.deleteProgram(this.program);
  }

  resize(cssWidth: number, cssHeight: number): void {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    // Prefer the live CSS box (absolute inset:0 → full stage). Never bake
    // width/height into inline styles - that locked the canvas to the initial
    // 960×640 viewport fallback and left empty space around the tree.
    const rect = this.canvas.getBoundingClientRect();
    const cssW = Math.max(1, rect.width || cssWidth);
    const cssH = Math.max(1, rect.height || cssHeight);
    const w = Math.max(1, Math.floor(cssW * dpr));
    const h = Math.max(1, Math.floor(cssH * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.canvas.style.removeProperty('width');
    this.canvas.style.removeProperty('height');
    this.gl.viewport(0, 0, w, h);
  }

  /** Map client coords → tree space (pre-canopy). */
  private clientToTree(clientX: number, clientY: number): Vec2 {
    const rect = this.canvas.getBoundingClientRect();
    const px = clientX - rect.left - rect.width / 2;
    const py = clientY - rect.top - rect.height / 2;
    const { x: camX, y: camY, scale } = this.camera;
    // Invert clip: screen = (tree + rootOffset) * scale + camera * scale
    let tx = px / scale - camX;
    let ty = py / scale - camY;
    ty -= this.rootOffsetY;
    // Invert canopy rotation about origin
    const rad = (-this.canopyDeg * Math.PI) / 180;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    return [c * tx - s * ty, s * tx + c * ty];
  }

  private hitTest(
    clientX: number,
    clientY: number
  ): (typeof this.hits)[number] | null {
    const [tx, ty] = this.clientToTree(clientX, clientY);
    let best: (typeof this.hits)[number] | null = null;
    let bestD = Number.POSITIVE_INFINITY;
    for (let i = 0; i < this.hits.length; i += 1) {
      const h = this.hits[i]!;
      const d = Math.hypot(tx - h.x, ty - h.y);
      if (d <= h.r && d < bestD) {
        best = h;
        bestD = d;
      }
    }
    return best;
  }

  private onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) {
      return;
    }
    this.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: this.camera.x,
      originY: this.camera.y,
      moved: false,
    };
    this.canvas.setPointerCapture(event.pointerId);
  };

  private interactionPaused(): boolean {
    return Boolean(this.hoveredId || this.pinnedId);
  }

  private syncInteractionPause(): void {
    const pause = this.interactionPaused();
    if (pause) {
      if (!this.growthFrozenByInteraction) {
        this.setGrowthFrozen(true);
        this.growthFrozenByInteraction = true;
      }
      return;
    }
    if (this.growthFrozenByInteraction) {
      this.growthFrozenByInteraction = false;
      // Blow may still own the freeze - leave the clock paused until it ends.
      if (this.gustKind !== 'blow') {
        this.setGrowthFrozen(false);
      }
    }
  }

  private setHovered(id: string | null): void {
    if (this.hoveredId === id) {
      return;
    }
    this.hoveredId = id;
    this.syncInteractionPause();
  }

  private onPointerMove = (event: PointerEvent) => {
    const drag = this.drag;
    if (drag && drag.pointerId === event.pointerId) {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (!drag.moved && dx * dx + dy * dy > 16) {
        drag.moved = true;
      }
      const next = {
        ...this.camera,
        x: drag.originX + dx / this.camera.scale,
        y: drag.originY + dy / this.camera.scale,
      };
      this.camera = next;
      this.onCameraChange?.(next);
      return;
    }
    const hit = this.hitTest(event.clientX, event.clientY);
    this.setHovered(hit?.id ?? null);
    this.handlers.onHover(this.hoveredId);
    this.canvas.style.cursor = hit ? 'pointer' : 'default';
  };

  private onPointerUp = (event: PointerEvent) => {
    const drag = this.drag;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    const wasClick = !drag.moved;
    this.drag = null;
    if (!wasClick) {
      return;
    }
    const hit = this.hitTest(event.clientX, event.clientY);
    if (hit) {
      this.handlers.onNodeClick(hit.node);
    } else {
      this.handlers.onBackdropClick();
    }
  };

  private onPointerLeave = () => {
    this.setHovered(null);
    this.handlers.onHover(null);
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();
    const delta = Math.exp(-event.deltaY * 0.0015);
    const next = {
      ...this.camera,
      scale: this.clampScale(this.camera.scale * delta),
    };
    this.camera = next;
    this.onCameraChange?.(next);
  };

  private growthNow(): number {
    const now = performance.now();
    if (this.growthFreezeStartedAt != null) {
      return this.growthFreezeStartedAt - this.growthFrozenMs;
    }
    return now - this.growthFrozenMs;
  }

  private setGrowthFrozen(frozen: boolean): void {
    const now = performance.now();
    if (frozen) {
      if (this.growthFreezeStartedAt == null) {
        this.growthFreezeStartedAt = now;
      }
      return;
    }
    if (this.growthFreezeStartedAt != null) {
      this.growthFrozenMs += now - this.growthFreezeStartedAt;
      this.growthFreezeStartedAt = null;
    }
  }

  private setBlowingUi(active: boolean): void {
    const button = this.blowingButton;
    if (!button) {
      return;
    }
    button.classList.toggle('kicl-color-green', active);
    button.classList.toggle('kicl-color-grey-dark', !active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  private syncGrowth(layout: LayoutResult): void {
    const now = this.growthNow();
    if (!this.growth.seeded) {
      if (layout.nodes.length === 0) {
        return;
      }
      layout.nodes.forEach((n) => {
        this.growth.bornAt.set(n.id, now);
        this.growth.birthDepth.set(n.id, Math.max(1, n.growthDepth || 1));
      });
      this.growth.seeded = true;
      return;
    }
    for (let i = 0; i < layout.nodes.length; i += 1) {
      const n = layout.nodes[i]!;
      if (this.growth.seen.has(n.id) || this.growth.bornAt.has(n.id)) {
        continue;
      }
      this.growth.bornAt.set(n.id, now);
      this.growth.birthDepth.set(n.id, Math.max(1, n.growthDepth || 1));
    }
    // Mark finished growth
    this.growth.bornAt.forEach((born, id) => {
      if (this.growth.seen.has(id)) {
        return;
      }
      const depth = this.growth.birthDepth.get(id) ?? 1;
      if (now - born >= growthDuration(depth)) {
        this.growth.seen.add(id);
      }
    });
  }

  private gustDecay(u: number): number {
    const x = Math.max(0, u);
    return 1 / (1 + 6.5 * x + 2.8 * x * x);
  }

  private gustEnvelope(u: number, attackFrac: number): number {
    if (u <= 0) {
      return 0;
    }
    const attack = Math.min(0.35, Math.max(0.06, attackFrac));
    if (u < attack) {
      const t = u / attack;
      return t * (2 - t);
    }
    const decayU = (u - attack) / Math.max(0.001, 1 - attack);
    return this.gustDecay(decayU);
  }

  private scheduleNextAmbient(now: number, soon = false): void {
    this.nextGustAt = soon
      ? now + 1800 + Math.random() * 500
      : now + 4200 + Math.random() * 900;
  }

  private startGustEnvelope(opts: {
    kind: 'ambient' | 'blow';
    now: number;
    durationMs: number;
    peakStrength: number;
    baseStrength: number;
    peakCanopy: number;
    baseCanopy: number;
    direction: number;
    attackFrac: number;
    keepTiming?: boolean;
  }): void {
    const {
      kind,
      now,
      durationMs,
      peakStrength,
      baseStrength,
      peakCanopy,
      baseCanopy,
      direction,
      attackFrac,
      keepTiming = false,
    } = opts;
    this.gustKind = kind;
    if (!keepTiming) {
      this.gustStartedAt = now;
      this.gustDurationMs = Math.max(400, durationMs);
    }
    this.gustAttackFrac = attackFrac;
    this.gustPeakStrength = peakStrength;
    this.gustBaseStrength = baseStrength;
    this.gustPeakCanopy = peakCanopy;
    this.gustBaseCanopy = baseCanopy;
    this.targetDir = direction;
    this.targetStrength = peakStrength;
    this.targetCanopyDeg = peakCanopy;
    this.rate = 0.018;
  }

  private applyGust(kind: 'auto' | 'blow'): void {
    const now = performance.now();
    const BLOW_STRENGTH_BASE = 2.8;
    const BLOW_STRENGTH_STEP = 0.55;
    const BLOW_STRENGTH_MAX = 8.5;
    const BLOW_CANOPY_BASE = 1.4;
    const BLOW_CANOPY_STEP = 0.35;
    const BLOW_DURATION_MS = 2200;
    const BLOW_ATTACK_FRAC = 0.16;
    const AMBIENT_ATTACK_FRAC = 0.12;

    if (kind === 'blow') {
      this.blowClickCount += 1;
      const peakStrength = Math.min(
        BLOW_STRENGTH_MAX,
        BLOW_STRENGTH_BASE + (this.blowClickCount - 1) * BLOW_STRENGTH_STEP
      );
      const peakCanopy =
        (Math.random() < 0.5 ? -1 : 1) *
        (BLOW_CANOPY_BASE + (this.blowClickCount - 1) * BLOW_CANOPY_STEP);
      if (this.gustKind !== 'blow') {
        this.setGrowthFrozen(true);
        this.setBlowingUi(true);
        this.startGustEnvelope({
          kind: 'blow',
          now,
          durationMs: BLOW_DURATION_MS,
          peakStrength,
          baseStrength: 0.22,
          peakCanopy,
          baseCanopy: 0,
          direction: Math.random() * Math.PI * 2,
          attackFrac: BLOW_ATTACK_FRAC,
        });
        this.scheduleNextAmbient(now);
      } else {
        this.startGustEnvelope({
          kind: 'blow',
          now,
          durationMs: BLOW_DURATION_MS,
          peakStrength,
          baseStrength: 0.22,
          peakCanopy,
          baseCanopy: 0,
          direction: this.targetDir,
          attackFrac: BLOW_ATTACK_FRAC,
          keepTiming: true,
        });
      }
      return;
    }

    if (this.gustKind === 'blow') {
      this.scheduleNextAmbient(now, true);
      return;
    }
    this.ambientSide *= -1;
    this.startGustEnvelope({
      kind: 'ambient',
      now,
      durationMs: 8200 + Math.random() * 1200,
      peakStrength: 0.72 + Math.random() * 0.16,
      baseStrength: 0.18,
      peakCanopy: this.ambientSide * (0.34 + Math.random() * 0.1),
      baseCanopy: 0,
      direction: this.dir + this.ambientSide * (0.35 + Math.random() * 0.15),
      attackFrac: AMBIENT_ATTACK_FRAC,
    });
    this.scheduleNextAmbient(now);
  }

  private tickWind(now: number): void {
    if (this.reducedMotion) {
      this.strength = 0;
      this.canopyDeg = 0;
      return;
    }

    const dt = Math.min(48, now - this.lastWind);
    this.lastWind = now;

    // Hover or pin: ease to rest and hold - no new gusts until cleared.
    if (this.interactionPaused()) {
      this.targetStrength = 0;
      this.targetCanopyDeg = 0;
      this.rate = 0.08;
      this.nextGustAt = now + 1200;
      if (this.gustKind === 'blow') {
        this.blowClickCount = 0;
        // Growth stays frozen - hover/pin still owns the pause.
        this.setBlowingUi(false);
      }
      this.gustKind = 'none';
      const k = 1 - Math.exp(-this.rate * dt);
      this.strength += (this.targetStrength - this.strength) * k;
      this.canopyDeg += (this.targetCanopyDeg - this.canopyDeg) * k;
      if (this.strength < 0.01) {
        this.strength = 0;
      }
      if (Math.abs(this.canopyDeg) < 0.02) {
        this.canopyDeg = 0;
      }
      return;
    }

    if (now >= this.nextGustAt) {
      this.applyGust('auto');
    }

    if (this.gustKind !== 'none') {
      const u = (now - this.gustStartedAt) / this.gustDurationMs;
      const env = this.gustEnvelope(u, this.gustAttackFrac);
      this.targetStrength =
        this.gustBaseStrength +
        (this.gustPeakStrength - this.gustBaseStrength) * env;
      this.targetCanopyDeg =
        this.gustBaseCanopy + (this.gustPeakCanopy - this.gustBaseCanopy) * env;
      this.rate = u < this.gustAttackFrac ? 0.018 : 0.01;
      if (u >= 1.05 || (u > this.gustAttackFrac && env < 0.045)) {
        if (this.gustKind === 'blow') {
          this.blowClickCount = 0;
          if (!this.growthFrozenByInteraction) {
            this.setGrowthFrozen(false);
          }
          this.setBlowingUi(false);
        }
        this.gustKind = 'none';
        this.targetStrength = this.gustBaseStrength;
        this.targetCanopyDeg = this.gustBaseCanopy;
        this.rate = 0.0012;
      }
    }

    const k = 1 - Math.exp(-this.rate * dt);
    this.strength += (this.targetStrength - this.strength) * k;
    this.canopyDeg += (this.targetCanopyDeg - this.canopyDeg) * k;
    let dDir = this.targetDir - this.dir;
    while (dDir > Math.PI) dDir -= Math.PI * 2;
    while (dDir < -Math.PI) dDir += Math.PI * 2;
    this.dir += dDir * Math.min(1, k * 0.85);
  }

  private draw(now: number): void {
    const layout = this.layout;
    const gl = this.gl;
    // Keep the backing store matched to the CSS-filled stage (full viewport).
    const cssW = Math.max(1, this.canvas.clientWidth || 1);
    const cssH = Math.max(1, this.canvas.clientHeight || 1);
    this.resize(cssW, cssH);

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (!layout) {
      return;
    }

    const verts: number[] = [];
    const hits: typeof this.hits = [];
    const tipWorld = new Map<string, Vec2>();
    const angleWorld = new Map<string, number>();
    const windedByChild = new Map<
      string,
      { curve: BranchCurve; growthT: number }
    >();

    // Origin rests at (0,0).
    const origin = layout.nodes.find((n) => n.isOrigin);
    if (origin) {
      tipWorld.set(origin.id, origin.position);
      angleWorld.set(origin.id, 0);
    }

    const gNow = this.growthNow();
    const branches = [...layout.branches].sort(
      (a, b) => a.depth - b.depth || a.childId.localeCompare(b.childId)
    );

    const focusIds = this.focusIds;
    const dimAlpha = 0.22;

    const branchAlpha = (childId: string) => {
      if (!focusIds) {
        return 1;
      }
      return focusIds.has(childId) ? 1 : dimAlpha;
    };

    for (let i = 0; i < branches.length; i += 1) {
      const branch = branches[i]!;
      const born = this.growth.bornAt.get(branch.childId) ?? gNow;
      const depth =
        this.growth.birthDepth.get(branch.childId) ??
        Math.max(1, branch.growthDepth || 1);
      const growing = !this.growth.seen.has(branch.childId);
      const elapsed = gNow - born;
      const start = branchDelay(Math.max(1, depth));
      const raw = growing ? clamp01((elapsed - start) / BRANCH_MS) : 1;
      const growthT = Math.max(0.02, growing ? easeOutCubic(raw) : 1);
      if (growing && elapsed < start) {
        continue;
      }

      const parentAngle = angleWorld.get(branch.parentId) ?? 0;
      const hinge = tipWorld.get(branch.parentId) ?? branch.curve.p0;
      // Local flutter only within WIND_MAX_DEPTH; deeper branches inherit.
      const windLocal = branch.depth <= WIND_MAX_DEPTH && !this.reducedMotion;
      const ampDeg = Math.min(5.5, 0.7 + branch.depth * 0.55);
      const phase = windPhase(branch.id);
      const respond = Math.sin(this.dir + phase * Math.PI * 2);
      const flutter = 0.85 + 0.15 * Math.sin(now * 0.00055 + phase * 9);
      const localDeg = windLocal
        ? this.strength * ampDeg * respond * flutter
        : 0;
      const worldDeg = parentAngle + localDeg;
      const worldCurve = hingeCurve(branch.curve, hinge, worldDeg);
      tipWorld.set(branch.childId, cubicAt(worldCurve, growthT));
      angleWorld.set(branch.childId, worldDeg);
      windedByChild.set(branch.childId, { curve: worldCurve, growthT });

      const alpha = branchAlpha(branch.childId);
      taperedRibbonMesh(
        worldCurve,
        branch.startWidth,
        branch.endWidth,
        rgb01(branch.startColor),
        rgb01(branch.endColor),
        alpha,
        growthT,
        24,
        verts
      );
    }

    // Nodes + pedicels (focus layer drawn after dim via alpha already applied)
    for (let i = 0; i < layout.nodes.length; i += 1) {
      const n = layout.nodes[i]!;
      const alpha = focusIds && !focusIds.has(n.id) ? dimAlpha : 1;
      const born = this.growth.bornAt.get(n.id) ?? gNow;
      const gDepth =
        this.growth.birthDepth.get(n.id) ?? Math.max(1, n.growthDepth || 1);
      const growing = !this.growth.seen.has(n.id) && !n.isOrigin;
      const elapsed = gNow - born;
      const hasPedicel = n.pedicelWidth > 0 && n.pedicelLength > 0;
      const pedicelAt = pedicelRevealDelay(gDepth);
      const revealAt = nodeRevealDelay(gDepth, n.isOrigin, hasPedicel);
      const pedicelActive = !growing || elapsed >= pedicelAt;
      const nodeVisible = n.isOrigin || !growing || elapsed >= revealAt;
      const pedicelRaw = growing
        ? clamp01((elapsed - pedicelAt) / PEDICEL_MS)
        : 1;
      const pedicelProgress = growing ? easeOutCubic(pedicelRaw) : 1;
      const nodeRaw = growing ? clamp01((elapsed - revealAt) / NODE_MS) : 1;
      const nodeProgress = growing ? easeOutCubic(nodeRaw) : 1;

      if (n.isOrigin) {
        const [jx, jy] = n.position;
        const expanding =
          this.expandingIds.has(n.id) || n.id === this.selectedId;
        if (expanding) {
          pushPulse(verts, jx, jy, n.markerRadius * 1.2, ORIGIN_GREEN, now);
        }
        pushDisk(
          verts,
          jx,
          jy,
          n.markerRadius * 2.2,
          ORIGIN_GREEN,
          0.22 * alpha,
          24
        );
        // ellipse approx: stretch via two disks - use wider ring
        pushDisk(verts, jx, jy, n.markerRadius * 1.15, ORIGIN_GREEN, alpha, 24);
        hits.push({
          id: n.id,
          node: n,
          x: jx,
          y: jy,
          r: Math.max(n.markerRadius * 2.2, 10),
          dirX: 0,
          dirY: -1,
          hasPedicel: false,
        });
        continue;
      }

      if (!pedicelActive && !nodeVisible) {
        continue;
      }

      const winded = windedByChild.get(n.id);
      const tip = tipWorld.get(n.id) ?? n.position;
      let markerX = n.markerPosition[0];
      let markerY = n.markerPosition[1];

      if (hasPedicel && pedicelActive && winded) {
        const attachT = pedicelAttachT(
          winded.curve,
          n.pedicelInset,
          winded.growthT
        );
        const attach = cubicAt(winded.curve, attachT);
        const hung = hangPedicelPoints(attach, n.angle, n.pedicelLength, n.id);
        const phase = windPhase(n.id);
        const respond = Math.sin(this.dir + phase * Math.PI * 2);
        const flutter = 0.85 + 0.15 * Math.sin(now * 0.00055 + phase * 9);
        // Light stalk sway - amp capped like SVG (only meaningful near winded tips).
        const windLocal =
          (n.depth <= WIND_MAX_DEPTH ||
            (n.parentId != null &&
              (layout.nodes.find((p) => p.id === n.parentId)?.depth ?? 99) <
                WIND_MAX_DEPTH)) &&
          !this.reducedMotion;
        const swayDeg = windLocal
          ? this.strength * Math.min(4, 4) * respond * flutter
          : 0;
        const swayedMarker = rotateVec(hung.markerSvg, attach, swayDeg);
        const swayedControl = rotateVec(hung.controlSvg, attach, swayDeg);
        const pedRgb = rgb01(darkenHex(n.color, 0.08));
        quadraticStrokeMesh(
          attach,
          swayedControl,
          swayedMarker,
          n.pedicelWidth,
          pedRgb,
          alpha,
          pedicelProgress,
          12,
          verts
        );
        markerX = swayedMarker[0];
        markerY = swayedMarker[1];
      } else if (!hasPedicel) {
        // Joint markers ride the winded tip.
        const dx = tip[0] - n.position[0];
        const dy = tip[1] - n.position[1];
        markerX = n.markerPosition[0] + dx;
        markerY = n.markerPosition[1] + dy;
      }

      if (!nodeVisible) {
        continue;
      }

      const expanding = this.expandingIds.has(n.id) || n.id === this.selectedId;
      if (expanding) {
        pushPulse(
          verts,
          markerX,
          markerY,
          n.markerRadius * rankVisual(n.node.rank).scale,
          rgb01(darkenHex(n.color)),
          now
        );
      }
      const hitR = pushRankMarker(
        verts,
        markerX,
        markerY,
        n.markerRadius,
        n.node.rank,
        n.color,
        expanding,
        alpha * nodeProgress,
        now,
        0.35 + 0.65 * nodeProgress
      );
      hits.push({
        id: n.id,
        node: n,
        x: markerX,
        y: markerY,
        r: hitR,
        // Growth / hang direction - label placement steers away from this.
        dirX: Math.sin(n.angle),
        dirY: -Math.cos(n.angle),
        hasPedicel,
      });
    }

    this.hits = hits;

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.uniform2f(this.uResolve, cssW / 2, cssH / 2);
    gl.uniform2f(this.uCamera, this.camera.x, this.camera.y);
    gl.uniform1f(this.uScale, this.camera.scale);
    gl.uniform1f(this.uRootOffsetY, this.rootOffsetY);
    gl.uniform1f(this.uCanopyDeg, this.canopyDeg);
    gl.drawArrays(gl.TRIANGLES, 0, verts.length / 6);

    // Label overlay - marker pose + branch direction for collision-aware placement.
    if (this.labelId) {
      const labeled = hits.find((h) => h.id === this.labelId);
      const node = layout.nodes.find((n) => n.id === this.labelId);
      if (labeled && node) {
        this.canvas.dataset.labelX = String(labeled.x);
        this.canvas.dataset.labelY = String(labeled.y);
        this.canvas.dataset.labelR = String(labeled.r);
        this.canvas.dataset.labelDirX = String(labeled.dirX);
        this.canvas.dataset.labelDirY = String(labeled.dirY);
        this.canvas.dataset.labelPedicel = labeled.hasPedicel ? '1' : '0';
        this.canvas.dataset.labelColor = node.color;
        this.canvas.dataset.canopyDeg = String(this.canopyDeg);
      }
    } else {
      delete this.canvas.dataset.labelX;
      delete this.canvas.dataset.labelY;
      delete this.canvas.dataset.labelR;
      delete this.canvas.dataset.labelDirX;
      delete this.canvas.dataset.labelDirY;
      delete this.canvas.dataset.labelPedicel;
      delete this.canvas.dataset.canopyDeg;
    }
  }
}
