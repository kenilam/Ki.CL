// Helpers
import { readColor } from 'design/helper';

import type { Palette } from './renderer';

/** How many inks the stylesheet may declare; reading stops at the first gap. */
const MAX_INKS = 6;

/**
 * Every colour comes from the stylesheet, as custom properties on the
 * canvas, so the theme decides them and this file only reads.
 */
function readPalette(canvas: HTMLCanvasElement, property: string): Palette {
  const parse = (name: string): number | null => {
    const color = readColor(canvas, `${property}--${name}`);

    if (!color?.alpha) {
      return null;
    }

    return (color.red << 16) | (color.green << 8) | color.blue;
  };

  const paper = parse('paper') ?? 0;
  const inks: number[] = [];

  for (let index = 1; index <= MAX_INKS; index++) {
    const ink = parse(`ink-${index}`);

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
