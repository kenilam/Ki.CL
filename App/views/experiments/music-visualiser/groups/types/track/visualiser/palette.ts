import type { Palette } from './renderer';

/** How many inks the stylesheet may declare; reading stops at the first gap. */
const MAX_INKS = 6;

/**
 * Every colour comes from the stylesheet, as custom properties on the
 * canvas, so the theme decides them and this file only reads. They come back
 * as computed colours, often `oklab()`, so a 2D context paints one pixel in
 * each and reads it back as sRGB.
 */
function readPalette(canvas: HTMLCanvasElement, property: string): Palette {
  const styles = window.getComputedStyle(canvas);
  const scratch = document
    .createElement('canvas')
    .getContext('2d', { willReadFrequently: true });

  const parse = (value: string): number | null => {
    const trimmed = value.trim();

    if (!trimmed || !scratch || !CSS.supports('color', trimmed)) {
      return null;
    }

    scratch.clearRect(0, 0, 1, 1);
    scratch.fillStyle = trimmed;
    scratch.fillRect(0, 0, 1, 1);

    const [red, green, blue, alpha] = scratch.getImageData(0, 0, 1, 1).data;

    if (!alpha) {
      return null;
    }

    return (red << 16) | (green << 8) | blue;
  };

  const paper = parse(styles.getPropertyValue(`${property}--paper`)) ?? 0;
  const inks: number[] = [];

  for (let index = 1; index <= MAX_INKS; index++) {
    const ink = parse(styles.getPropertyValue(`${property}--ink-${index}`));

    if (ink === null) {
      break;
    }

    inks.push(ink);
  }

  return { inks, paper };
}

function readNumber(
  canvas: HTMLCanvasElement,
  property: string,
  fallback: number
): number {
  const value = parseFloat(
    window.getComputedStyle(canvas).getPropertyValue(property)
  );

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export { readNumber, readPalette };
