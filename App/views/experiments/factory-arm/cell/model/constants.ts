/**
 * The arm as the vendor describes it: link lengths in metres. `base` is the
 * shoulder's height off the floor, and `hand` runs from the wrist to the
 * face of the suction pad.
 */
const LINK = {
  base: 0.72,
  upper: 1.25,
  fore: 1.1,
  hand: 0.5,
};

/** The upper arm sits this far to the side of the turret, along the pitch axis. */
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

/** Where the pad waits between jobs. */
const REST = { x: 0.2, y: 1.6, z: 1 };

/** The gripper housing: a box under the wrist flange, wider than it is deep. */
const GRIPPER = {
  depth: 0.18,
  flange: 0.08,
  pad: 0.04,
  width: 0.26,
};

export { GRIPPER, LINK, REACH, REST, SIDE };
