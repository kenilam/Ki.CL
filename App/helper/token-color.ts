// Helpers
import { readColor } from 'design/helper';

/**
 * A colour token as a value WebGL and canvas code can take. Read once per
 * token, since none of the scenes change with the theme.
 */
const cache = new Map<string, [number, number, number]>();

const read = (name: string) => {
  const cached = cache.get(name);

  if (cached) {
    return cached;
  }

  const color = readColor(document.body, `--kicl-color-${name}`);
  const channels: [number, number, number] = color
    ? [color.red, color.green, color.blue]
    : [0, 0, 0];

  cache.set(name, channels);

  return channels;
};

const tokenColor = (name: string, alpha?: number) => {
  const [red, green, blue] = read(name);

  if (alpha !== undefined) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  return `#${[red, green, blue]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`;
};

export { tokenColor };
