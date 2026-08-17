/**
 * Deterministic randomness, seeded by `nodeId`.
 *
 * Everything a taxon derives for itself - where its tip lands, which way its
 * branch bows, its colour drift, the wobble on its body - comes from here, so
 * the same taxon looks identical across reloads and across sessions without
 * anything being stored.
 */

function hash(input: string): number {
  let value = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }

  return value >>> 0;
}

/** A stream of 0..1 values for one seed. */
export function random(seed: string): () => number {
  let state = hash(seed);

  return () => {
    state = (state + 0x6d2b79f5) | 0;

    let next = Math.imul(state ^ (state >>> 15), 1 | state);
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;

    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}
