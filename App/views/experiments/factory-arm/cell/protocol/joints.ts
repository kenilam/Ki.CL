/**
 * Joint angles in radians for this arm model. `shoulder` is pitch up from
 * level, `elbow` is the bend down from straight, `wrist` is relative to the
 * forearm, and `roll` turns the gripper about its own vertical axis. `grip`
 * is the vacuum, from 0 (off) to 1 (holding).
 *
 * The hub never reads these to plan; it plans in pad poses. They go out in
 * telemetry so a viewer can draw the arm.
 */
type Joints = {
  yaw: number;
  shoulder: number;
  elbow: number;
  wrist: number;
  roll: number;
  grip: number;
};

export type { Joints };
