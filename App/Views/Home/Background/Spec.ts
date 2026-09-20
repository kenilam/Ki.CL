import type { CanvasHTMLAttributes } from 'react';

export type Props = CanvasHTMLAttributes<HTMLCanvasElement>;

/**
 * Colours the renderer may put down. Each is a packed `0xRRGGBB` number, not
 * a CSS string, so the inner loop never touches the DOM.
 *
 * `paper` is the page behind everything; the canvas edge has to be invisible,
 * so it must match the body background. `inks` are the solid colours a light
 * is allowed to print in - one per light, in the same order.
 */
export type Palette = {
  inks: number[];
  paper: number;
};

/**
 * A soft elliptical pool of one ink.
 *
 * Positions and radii are fractions of the canvas: `x`/`y` of its width and
 * height, `rx`/`ry` of its height alone so the pool keeps its shape when the
 * viewport is wide. `angle` rotates the ellipse; `weight` is how much ink it
 * lays down at its centre, where `1` is solid.
 */
export type Light = {
  angle: number;
  rx: number;
  ry: number;
  weight: number;
  x: number;
  y: number;
};
