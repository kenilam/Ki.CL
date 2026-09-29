type Point = { x: number; y: number; z: number };

/** A box square to the cell, by its lowest and highest corners. */
type Box = { id: string; min: Point; max: Point };

/** Where the pad is sent: a position and the heading it faces, in the arm's own frame. */
type Pose = { at: Point; facing: number };

export type { Box, Point, Pose };
