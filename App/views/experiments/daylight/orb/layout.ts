/*
 * Where the drawing sits on the page. The shader reads these numbers too, so
 * a pointer on the page can be traced back to a point on the globe.
 */

/** The globe's radius, as a share of the drawing's height. */
const GLOBE = 0.2;

/** The share of the page's shorter side the drawing may take. */
const FIT = 0.92;

/** On a wide page, the share of the page's column the drawing may take. */
const COLUMN_SHARE = 0.66;

/** On a tall page the drawing is this much larger than the page is wide. */
const TALL_SCALE = 1.08;

/**
 * On a tall page, how far below the middle the drawing sits, as a share of
 * the page's height. The words are above it there.
 */
const TALL_DROP = 0.15;

type Page = {
  /** The page's column, in the same unit as the width and height. */
  column: number;
  /** Used in place of `TALL_DROP`. Less than nothing lifts the drawing above the middle. */
  drop?: number;
  height: number;
  width: number;
};

/** The drawing's height and its middle, measured from the page's top left. */
function toFrame({ column, drop = TALL_DROP, height, width }: Page) {
  const wide = width > height;
  const within = Math.min(width, column);
  const fit = Math.min(width, height) * FIT;
  const size = wide ? Math.min(fit, within * COLUMN_SHARE) : fit * TALL_SCALE;

  return {
    size,
    x: width / 2 + (wide ? (within - size) / 2 : 0),
    y: height / 2 + (wide ? 0 : height * drop),
  };
}

export { COLUMN_SHARE, FIT, GLOBE, TALL_DROP, TALL_SCALE, toFrame, type Page };
