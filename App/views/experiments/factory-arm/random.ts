/**
 * A small seeded generator (mulberry32). The cell's random parts - the stack
 * now, obstacles later - come from a seed, so a run can be repeated exactly
 * and the arm and its twin compared on the same layout.
 */
const random = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let value = state;

    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

export { random };
