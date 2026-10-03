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
  joint: 2,
  yaw: 1.2,
};
/** The gripper housing: a box under the wrist flange, wider than it is deep. */
const GRIPPER = {
  depth: 0.18,
  flange: 0.08,
  pad: 0.04,
  width: 0.26,
};

/** Holes in the perforated plate on the housing's outward face. */
const PLATE = {
  columns: 5,
  rows: 3,
};

/**
 * The pedestal and turret as one upright box, as wide as the base plate and as
 * high as the shoulder: what the turret sweeps as it turns.
 */
const BASE = {
  min: { x: -0.45, y: 0, z: -0.45 },
  max: { x: 0.45, y: LINK.base, z: 0.45 },
};

/** Where the pad waits between jobs. */
const REST = { x: 0.2, y: 1.6, z: 1 };

export { BASE, GRIPPER, LINK, PLATE, REACH, REST, SIDE, SPEED };
