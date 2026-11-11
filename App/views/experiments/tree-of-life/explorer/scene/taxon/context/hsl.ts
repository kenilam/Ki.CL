type Hsl = {
  h: number;
  s: number;
  l: number;
};

function hexToHsl(hex: string): Hsl {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
  }

  h = (h * 60 + 360) % 360;

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

function hslToHex({ h, s, l }: Hsl): string {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const second = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const base = lightness - chroma / 2;

  let rgb: readonly [number, number, number];

  if (h < 60) {
    rgb = [chroma, second, 0];
  } else if (h < 120) {
    rgb = [second, chroma, 0];
  } else if (h < 180) {
    rgb = [0, chroma, second];
  } else if (h < 240) {
    rgb = [0, second, chroma];
  } else if (h < 300) {
    rgb = [second, 0, chroma];
  } else {
    rgb = [chroma, 0, second];
  }

  const channel = (value: number) =>
    Math.round((value + base) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${channel(rgb[0])}${channel(rgb[1])}${channel(rgb[2])}`;
}

export { hexToHsl, hslToHex };
