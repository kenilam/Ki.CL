const channelsOf = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const cmykOf = (hex: string): [number, number, number, number] => {
  const [r, g, b] = channelsOf(hex).map((channel) => channel / 255);
  const k = 1 - Math.max(r, g, b);

  if (k === 1) {
    return [0, 0, 0, 100];
  }

  const [c, m, y] = [r, g, b].map((channel) =>
    Math.round(((1 - channel - k) / (1 - k)) * 100)
  );

  return [c, m, y, Math.round(k * 100)];
};

// WCAG relative luminance: above this, dark text reads better than light.
const LIGHT = 0.4;

const isLight = (hex: string): boolean => {
  const [r, g, b] = channelsOf(hex).map((channel) => {
    const value = channel / 255;

    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b > LIGHT;
};

export { channelsOf, cmykOf, isLight };
