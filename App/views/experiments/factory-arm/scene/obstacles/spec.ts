// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

/** A fixed obstacle as a box square to the cell, by its lowest and highest corners. */
type Solid = { id: string; min: Point; max: Point };

export type { Solid };
