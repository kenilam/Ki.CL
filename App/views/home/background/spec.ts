import type { CanvasHTMLAttributes } from 'react';

export type Props = CanvasHTMLAttributes<HTMLCanvasElement>;

/**
 * Colours the renderer may put down. Each is a packed `0xRRGGBB` number, not
 * a CSS string, so it can go straight to the GPU.
 *
 * `paper` is the page behind everything; the canvas edge has to be invisible,
 * so it must match the body background. `inks` are the colours the pools of
 * light are painted in, one per pool, in the order they are laid down.
 */
export type Palette = {
  inks: number[];
  paper: number;
};

/**
 * A soft elliptical pool of one ink.
 *
 * Positions are fractions of the canvas: `x` of its width, `y` of its height.
 * Radii are fractions of the canvas height alone, so a pool keeps its shape
 * when the viewport is wide. `angle` rotates the ellipse; `weight` is how
 * much ink it lays down at its centre, where `1` is solid.
 */
export type Pool = {
  angle: number;
  rx: number;
  ry: number;
  weight: number;
  x: number;
  y: number;
};

export type Renderer = {
  dispose(): void;
  draw(seconds: number, palette: Palette, cell: number, levels: number): void;
  resize(width: number, height: number): void;
};
