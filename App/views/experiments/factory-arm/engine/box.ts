type Vector = [number, number, number];

/** A cardboard case. `size` is width, height and depth in metres. */
type Box = {
  id: string;
  mass: number;
  position: Vector;
  size: Vector;
  yaw: number;
};

export type { Box, Vector };
