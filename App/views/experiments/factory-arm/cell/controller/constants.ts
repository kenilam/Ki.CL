/**
 * Top speeds: joints in radians per second, the vacuum in full draws per
 * second. The turret's is lowest: it swings the whole arm.
 */
const SPEED = {
  grip: 4,
  joint: 2,
  yaw: 1.2,
};

/** How fast a joint may pick up or shed speed, in radians per second squared. */
const ACCEL = {
  joint: 6,
  yaw: 4,
};

/**
 * Straight-line pad speeds in metres per second, and the distance from
 * contact over which the pad eases between them. `swing` is the speed between.
 */
const LINE = { fast: 1, near: 0.25, slow: 0.06, swing: 0.9 };

/** The servo loop's step, in seconds: a thousand a second, as a controller box runs. */
const TICK = 0.001;

/** How often the arm's sensors are read, in seconds. */
const SCAN = 0.01;

/** How often telemetry goes out, in seconds. */
const REPORT = 1 / 60;

/** How close every joint must be to its goal, in radians, to count as there. */
const SETTLED = 0.002;

/** How close the joints must be to pass a swing waypoint without stopping, in radians. */
const PASSING = 0.05;

export { ACCEL, LINE, PASSING, REPORT, SCAN, SETTLED, SPEED, TICK };
