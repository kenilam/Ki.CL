// Kinematics
import type { Point } from './kinematics';

/** A fixed obstacle as a box square to the cell, by its lowest and highest corners. */
type Solid = { id: string; min: Point; max: Point };

export type { Solid };
