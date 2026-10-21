/**
 * A colour token as a value WebGL and canvas code can take. The probe's
 * computed `color` resolves `var()` and `color-mix()`, so the scene paints
 * what the stylesheet says rather than a copy of it. Read once per token,
 * since none of the scenes change with the theme.
 */
const cache = new Map<string, [number, number, number]>();

const read = (name: string) => {
  const cached = cache.get(name);

  if (cached) {
    return cached;
  }

  const probe = document.createElement('span');

  probe.style.color = `var(--kicl-color-${name})`;
  document.body.append(probe);

  const [red = 0, green = 0, blue = 0] = (
    getComputedStyle(probe).color.match(/[\d.]+/g) ?? []
  ).map(Number);

  probe.remove();

  const channels: [number, number, number] = [red, green, blue];

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
