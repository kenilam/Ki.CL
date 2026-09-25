// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/boxes/spec';

// Pad
import { heading } from './pad';

/**
 * A case seen from above as a box square to the pallet, with the heights of
 * its underside and top, and its weight. Cases are only ever set down square,
 * so a heading is taken to the nearest quarter turn.
 */
type Slab = {
  x: [number, number];
  z: [number, number];
  bottom: number;
  top: number;
  mass: number;
};

/** A slab of the given half extents centred on a point, turned a quarter or not. */
const around = (
  x: number,
  z: number,
  [width, depth]: [number, number],
  turned: boolean,
  bottom = 0,
  top = 0,
  mass = 0
): Slab => {
  const [across, along] = turned ? [depth, width] : [width, depth];

  return {
    x: [x - across, x + across],
    z: [z - along, z + along],
    bottom,
    top,
    mass,
  };
};

const slab = (body: RapierRigidBody, box: Box): Slab => {
  const { x, y, z } = body.translation();
  const turned = Math.abs(Math.sin(heading(body.rotation()))) > Math.SQRT1_2;

  return around(
    x,
    z,
    [box.size[0] / 2, box.size[2] / 2],
    turned,
    y - box.size[1] / 2,
    y + box.size[1] / 2,
    box.mass
  );
};

/** The area two slabs share from above; negative gaps count as none. */
const shared = (a: Slab, b: Slab) =>
  Math.max(0, Math.min(a.x[1], b.x[1]) - Math.max(a.x[0], b.x[0])) *
  Math.max(0, Math.min(a.z[1], b.z[1]) - Math.max(a.z[0], b.z[0]));

/** Rounding allowed on a gap, so a case set exactly `gap` away still counts as clear. */
const ROUNDING = 1e-6;

/** Whether two slabs come closer than `gap` from above. */
const near = (a: Slab, b: Slab, gap: number) => {
  const reach = gap - ROUNDING;

  return (
    a.x[0] < b.x[1] + reach &&
    b.x[0] < a.x[1] + reach &&
    a.z[0] < b.z[1] + reach &&
    b.z[0] < a.z[1] + reach
  );
};

/** Whether a point from above falls inside a slab. */
const under = (slab: Slab, x: number, z: number) =>
  x >= slab.x[0] && x <= slab.x[1] && z >= slab.z[0] && z <= slab.z[1];

export { around, near, shared, slab, under };
export type { Slab };
