// Helpers
import { channelsOf } from './color';

const linear = (channel: number) => {
  const value = channel / 255;

  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

// OKLab, from Björn Ottosson: https://bottosson.github.io/posts/oklab/
const oklabOf = (hex: string): [number, number, number] => {
  const [r, g, b] = channelsOf(hex).map(linear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

// How different two colors look: the distance between them in OKLab.
const distanceOf = (from: string, to: string): number => {
  const [l1, a1, b1] = oklabOf(from);
  const [l2, a2, b2] = oklabOf(to);

  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
};

export { distanceOf };
