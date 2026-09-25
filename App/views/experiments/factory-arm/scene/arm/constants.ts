/**
 * Link lengths in scene units. `base` is the shoulder's height off the table,
 * and `hand` runs from the wrist to the face of the suction pad.
 */
const LINK = {
  base: 0.72,
  upper: 1.25,
  fore: 1.1,
  hand: 0.5,
};

/*
 * The upper arm sits this far to the side of the turret, as on a real arm,
 * with its gearbox on the outer face. The offset is along the pitch axis, so
 * the reach is unchanged.
 */
const SIDE = 0.17;

/**
 * Limits on where the pad can be sent: `min` keeps the gripper clear of the
 * turret, `floor` above the table, and `slack` stops the arm locking straight.
 */
const REACH = {
  floor: 0.02,
  min: 0.7,
  slack: 0.01,
};

/**
 * Top speeds: joints in radians per second, the vacuum in full draws per
 * second. The turret's is lowest: it swings the whole arm, and the pad at full
 * reach travels furthest for each radian it turns.
 */
const SPEED = {
  grip: 4,
  joint: 1.4,
  yaw: 0.8,
};
/** The gripper housing: a box under the wrist flange, wider than it is deep. */
const GRIPPER = {
  depth: 0.24,
  flange: 0.1,
  pad: 0.04,
  width: 0.34,
};

/** Holes in the perforated plate on the housing's outward face. */
const PLATE = {
  columns: 7,
  rows: 4,
};

/** Where the pad waits between jobs. */
const REST = { x: 0.2, y: 1.6, z: 1 };

export { GRIPPER, LINK, PLATE, REACH, REST, SIDE, SPEED };
