import type { CaseKind, Size } from './types';

/*
 * The SKUs that come down the belts. Weight and friction are placeholders
 * for physics: the floor carries them and PhysX will use them.
 */
type Sku = { kind: CaseKind; size: Size; weight: number; friction: number };

const CATALOGUE: readonly Sku[] = [
  { kind: 'box', size: [0.4, 0.3, 0.3], weight: 8, friction: 0.5 },
  { kind: 'crate', size: [0.6, 0.35, 0.4], weight: 18, friction: 0.6 },
  { kind: 'box', size: [0.5, 0.25, 0.35], weight: 6, friction: 0.5 },
  { kind: 'tub', size: [0.55, 0.3, 0.38], weight: 12, friction: 0.4 },
  { kind: 'cylinder', size: [0.3, 0.45, 0.3], weight: 15, friction: 0.45 },
];

/** The `n`th SKU, so the order is the same on every run. */
const sku = (n: number) => CATALOGUE[n % CATALOGUE.length];

/** The most cases on the floor at once; the instanced meshes are this big. */
const MAX_CASES = 2048;

export { CATALOGUE, MAX_CASES, sku, type Sku };
