// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/engine/layout';

const QUARTER = Math.PI / 2;

const LENGTH = CONVEYOR.end - CONVEYOR.start;
const MIDDLE = (CONVEYOR.start + CONVEYOR.end) / 2;
const BELT = 0.04;

/** Deeper than the belt looks, so a case dropped onto it cannot pass through. */
const SOLID = 0.3;

/** A low lip, shown only: a case set down at an angle may overhang it. */
const RAIL = { height: 0.08, lip: 0.02, width: 0.03 };

const SIDES = [-1, 1].map((side) => {
  return (side * (CONVEYOR.width + RAIL.width)) / 2;
});
const LEGS = Array.from({ length: Math.floor(LENGTH) + 1 }, (_, index) => {
  return CONVEYOR.start + 0.1 + (index * (LENGTH - 0.2)) / Math.floor(LENGTH);
});
const ENDS = [-1, 1];

export { BELT, ENDS, LEGS, LENGTH, MIDDLE, QUARTER, RAIL, SIDES, SOLID };
