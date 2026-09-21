import type { Palette } from './renderer';

/** How many inks the stylesheet may declare; reading stops at the first gap. */
const MAX_INKS = 6;

/**
 * Every colour comes from the stylesheet, as custom properties on the
 * canvas, so the theme decides them and this file only reads. A 2D context
 * normalises whatever form the token was written in to `#rrggbb`.
 */
function readPalette(canvas: HTMLCanvasElement, property: string): Palette {
  const styles = window.getComputedStyle(canvas);
  const scratch = document.createElement('canvas').getContext('2d');

  const parse = (value: string): number | null => {
    const trimmed = value.trim();

    if (!trimmed || !scratch) {
      return null;
    }

    scratch.fillStyle = trimmed;

    const normalised = String(scratch.fillStyle);

    if (!/^#[\da-f]{6}$/i.test(normalised)) {
      return null;
    }

    return parseInt(normalised.slice(1), 16);
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
