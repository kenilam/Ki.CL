// Spec
import type { Solid } from './spec';

/*
 * The standard cell's obstacles, where they start; the operator can move
 * them. The pillar stands in the swing to the belt and the crate on the way
 * from the pallet to the buffer. The beam hangs low behind the pallet, where
 * it stops one case in the back row being lifted out.
 */
const OBSTACLES: Solid[] = [
  {
    id: 'pillar',
    min: { x: 0.78, y: 0, z: 0.88 },
    max: { x: 0.92, y: 2.3, z: 1.02 },
  },
  {
    id: 'crate',
    min: { x: -1.25, y: 0, z: 1.02 },
    max: { x: -0.8, y: 1.6, z: 1.45 },
  },
  {
    id: 'beam',
    min: { x: -1.9, y: 1.3, z: -0.35 },
    max: { x: -0.9, y: 1.45, z: -0.22 },
  },
];

/**
 * The shapes the operator can add from the panel: each one's size (width,
 * height, depth in metres) and how high its underside sits.
 */
const SHAPES = {
  pillar: { base: 0, size: [0.14, 2.3, 0.14] },
  crate: { base: 0, size: [0.45, 1.6, 0.43] },
  beam: { base: 1.3, size: [1, 0.15, 0.13] },
} as const;

type Shape = keyof typeof SHAPES;

/** The drag data type that carries a shape from the panel to the stage. */
const SHAPE_TYPE = 'application/x-kicl-factory-arm-shape';

/** How far one press of an arrow key moves an obstacle, in metres. */
const STEP = 0.05;

/** How high an obstacle's top may be raised, in metres. */
const CEILING = 3;

export { CEILING, OBSTACLES, SHAPES, SHAPE_TYPE, STEP, type Shape };
