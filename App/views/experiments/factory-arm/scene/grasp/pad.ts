// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Three
import { THREE } from '@/three';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/boxes/spec';

/** How close the pad must be to a case's top, in metres, to take hold of it. */
const REACH = 0.04;

const euler = new THREE.Euler();
const quaternion = new THREE.Quaternion();

/** Turns a point about the vertical axis the way `rotation.y` does. */
const turn = ({ x, y, z }: Point, angle: number): Point => ({
  x: x * Math.cos(angle) + z * Math.sin(angle),
  y,
  z: -x * Math.sin(angle) + z * Math.cos(angle),
});

/** The heading of a body's rotation. Cases only ever turn about the vertical. */
const heading = (rotation: THREE.QuaternionLike) =>
  euler.setFromQuaternion(quaternion.copy(rotation), 'YXZ').y;

/** A rotation that turns a case to `angle` about the vertical. */
const orient = (angle: number) =>
  quaternion.setFromEuler(euler.set(0, angle, 0, 'YXZ')).clone();

/** The centre of a case's top face, where the pad takes hold of it. */
const top = (body: RapierRigidBody, box: Box): Point => {
  const { x, y, z } = body.translation();

  return { x, y: y + box.size[1] / 2, z };
};

/** Whether the pad is on the case's top, close enough to hold it. */
const touching = (pad: Point, body: RapierRigidBody, box: Box) => {
  const { x, y, z } = top(body, box);

  return (
    Math.abs(y - pad.y) < REACH &&
    Math.hypot(x - pad.x, z - pad.z) < Math.min(box.size[0], box.size[2]) / 2
  );
};

export { heading, orient, top, touching, turn };
