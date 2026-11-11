// Kinematics
import type { Point } from '@/views/experiments/factory-arm/engine/kinematics';

const QUARTER = Math.PI / 2;

/**
 * Each way an obstacle can move, named by the axis and its sign, and the
 * turn that points its triangle that way. Those along the floor lie flat; up
 * and down stand upright, turned to face the viewer.
 */
const WAYS: {
  axis: string;
  way: Point;
  rotation: [number, number, number];
}[] = [
  { axis: '+x', way: { x: 1, y: 0, z: 0 }, rotation: [-QUARTER, 0, 0] },
  { axis: '-x', way: { x: -1, y: 0, z: 0 }, rotation: [-QUARTER, 0, Math.PI] },
  { axis: '+z', way: { x: 0, y: 0, z: 1 }, rotation: [-QUARTER, 0, -QUARTER] },
  { axis: '-z', way: { x: 0, y: 0, z: -1 }, rotation: [-QUARTER, 0, QUARTER] },
  { axis: '+y', way: { x: 0, y: 1, z: 0 }, rotation: [0, 0, QUARTER] },
  { axis: '-y', way: { x: 0, y: -1, z: 0 }, rotation: [0, 0, -QUARTER] },
];

export { WAYS };
