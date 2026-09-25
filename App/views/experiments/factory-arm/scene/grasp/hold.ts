// Physics
import type { RapierRigidBody, useRapier } from '@react-three/rapier';

// Context
import type { Held } from '@/views/experiments/factory-arm/context';

// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Pad
import { heading, orient, turn } from './pad';

type Rapier = ReturnType<typeof useRapier>['rapier'];

/**
 * Takes a case off physics and onto the pad. Its offset and heading are kept
 * relative to the pad, so it stays where it was picked and turns with it.
 * `facing` is the pad's heading: the arm's turn plus the wrist roll.
 */
const pick = (
  rapier: Rapier,
  id: string,
  body: RapierRigidBody,
  pad: Point,
  facing: number
): Held => {
  const { x, y, z } = body.translation();

  body.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);

  return {
    id,
    offset: turn({ x: x - pad.x, y: y - pad.y, z: z - pad.z }, -facing),
    yaw: heading(body.rotation()) - facing,
  };
};

/** Hands the case back to physics, at rest where the pad set it down. */
const place = (rapier: Rapier, body: RapierRigidBody) => {
  body.setBodyType(rapier.RigidBodyType.Dynamic, true);
  body.setLinvel({ x: 0, y: 0, z: 0 }, true);
  body.setAngvel({ x: 0, y: 0, z: 0 }, true);
};

/** Moves a held case to follow the pad. */
const carry = (
  body: RapierRigidBody,
  held: Held,
  pad: Point,
  facing: number
) => {
  const offset = turn(held.offset, facing);

  body.setNextKinematicTranslation({
    x: pad.x + offset.x,
    y: pad.y + offset.y,
    z: pad.z + offset.z,
  });
  body.setNextKinematicRotation(orient(held.yaw + facing));
};

export { carry, pick, place };
