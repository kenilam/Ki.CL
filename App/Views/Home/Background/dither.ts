import type { Light, Palette } from './Spec';

/*
 * Ordered dithering, the way early print and 1-bit displays faked tone: no
 * colour is ever mixed. Every cell is painted in exactly one of a handful of
 * solid inks, and the *proportion* of cells given to each ink is what the eye
 * reads as a gradient. The decision per cell is made against a fixed 8×8
 * threshold matrix (Bayer), which is why the grain has that regular, woven
 * texture rather than the mush of random noise.
 *
 * Two things follow from that and shape everything below. Blending is a
 * matter of *coverage*, so the field being rendered is not a colour ramp but
 * a set of weights - how much of each ink wants to be here - and the matrix
 * picks one. And the cells have to be big enough to see, so the canvas is
 * rendered at a fraction of its CSS size and scaled up with
 * `image-rendering: pixelated`; the blocks are the point.
 */

/** Bayer 8×8, as thresholds in `[0, 1)`. */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
].map((value) => (value + 0.5) / 64);

/**
 * How sharply a pool falls off from its centre. Above `1` the ink stays
 * concentrated and the fringe thins out early, which keeps the middle of the
 * page mostly paper.
 */
const FALLOFF = 1.6;

/**
 * The copy sits in the middle, and dither is a busy texture to read over. A
 * soft clearing around the centre scales every ink down to nothing there,
 * whatever the viewport, so the words always sit on plain paper. Radii are in
 * canvas heights, aspect-corrected, so the clearing is round on a wide screen
 * and becomes a band across a tall one.
 */
const CLEARING_INNER = 0.16;
const CLEARING_OUTER = 0.5;

/**
 * Domain warp. The pools are ellipses, and ellipses read as shapes; bending
 * the coordinate space they are drawn into with a couple of slow sines makes
 * their edges wander like spilled light instead.
 */
const WARP_LARGE = 0.06;
const WARP_SMALL = 0.03;

/** The drift is meant to be noticed only by someone who stays a while. */
const SPEED = 0.1;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0));

  return t * t * (3 - 2 * t);
};

/**
 * Three pools, one per ink, arranged so they overlap. Where two overlap the
 * matrix interleaves both inks, which is the only place a dither gradient
 * shows a third, shimmering colour - so the overlaps are the composition.
 *
 * A broad wash across the bottom, a lobe reaching in from the top right, and
 * an accent low on the right sitting on top of the wash. Each wanders a few
 * percent around its home on its own slow cycle.
 */
function lights(seconds: number): Light[] {
  const s = seconds * SPEED;

  return [
    {
      angle: -0.35 + 0.08 * Math.sin(s * 0.7),
      rx: 1.35,
      ry: 0.62,
      weight: 1.05,
      x: 0.25 + 0.06 * Math.sin(s * 1.1),
      y: 0.92 + 0.04 * Math.cos(s * 1.3),
    },
    {
      angle: 0.7 + 0.1 * Math.cos(s * 0.8),
      rx: 0.95,
      ry: 0.62,
      weight: 1,
      x: 0.9 + 0.05 * Math.cos(s * 0.9),
      y: 0.22 + 0.06 * Math.sin(s * 1.2),
    },
    {
      angle: 0.15 + 0.15 * Math.sin(s * 0.9),
      rx: 0.75,
      ry: 0.42,
      weight: 1,
      x: 0.86 + 0.06 * Math.sin(s * 0.8),
      y: 0.92 + 0.03 * Math.cos(s * 1),
    },
  ];
}

const LITTLE_ENDIAN = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;

/** Pack `0xRRGGBB` into one opaque pixel of an `ImageData` buffer. */
function pack(rgb: number): number {
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  return LITTLE_ENDIAN
    ? ((0xff << 24) | (b << 16) | (g << 8) | r) >>> 0
    : ((r << 24) | (g << 16) | (b << 8) | 0xff) >>> 0;
}

/**
 * Paint one frame into `image` and put it on `context`.
 *
 * `image` is reused across frames rather than allocated per call: at ten
 * frames a second, a fresh buffer every time is garbage worth avoiding.
 */
function paint(
  context: CanvasRenderingContext2D,
  image: ImageData,
  seconds: number,
  palette: Palette
): void {
  const { width, height } = image;
  const pixels = new Uint32Array(image.data.buffer);
  const pools = lights(seconds).slice(0, palette.inks.length);
  const paper = pack(palette.paper);
  const inks = palette.inks.map(pack);
  const aspect = width / height;
  const s = seconds * SPEED;
  const weights = new Float32Array(pools.length);

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const row = (y & 7) * 8;

    for (let x = 0; x < width; x++) {
      const nx = x / width;

      const wx =
        nx +
        WARP_LARGE * Math.sin(ny * 5 + s * 1.7) +
        WARP_SMALL * Math.sin(ny * 11 - s);
      const wy =
        ny +
        WARP_LARGE * Math.cos(nx * 4 - s * 1.3) +
        WARP_SMALL * Math.cos(nx * 9 + s * 0.6);

      const cx = (nx - 0.5) * aspect;
      const cy = ny - 0.5;
      const clearing = smoothstep(
        CLEARING_INNER,
        CLEARING_OUTER,
        Math.sqrt(cx * cx + cy * cy)
      );

      let total = 0;

      for (let i = 0; i < pools.length; i++) {
        const pool = pools[i];
        const dx = (wx - pool.x) * aspect;
        const dy = wy - pool.y;
        const cos = Math.cos(pool.angle);
        const sin = Math.sin(pool.angle);
        const ux = (dx * cos - dy * sin) / pool.rx;
        const uy = (dx * sin + dy * cos) / pool.ry;
        const distance = Math.sqrt(ux * ux + uy * uy);
        const coverage =
          pool.weight *
          Math.pow(1 - smoothstep(0, 1, distance), FALLOFF) *
          clearing;

        weights[i] = coverage;
        total += coverage;
      }

      /*
       * Where pools overlap the inks are asking for more than a whole cell
       * between them. Scale them back to share it; the paper only shows
       * through where they leave room.
       */
      const scale = total > 1 ? 1 / total : 1;
      const threshold = BAYER[row + (x & 7)];

      let cumulative = 0;
      let colour = paper;

      for (let i = 0; i < pools.length; i++) {
        cumulative += weights[i] * scale;

        if (threshold < cumulative) {
          colour = inks[i];
          break;
        }
      }

      pixels[y * width + x] = colour;
    }
  }

  context.putImageData(image, 0, 0);
}

export { paint };
