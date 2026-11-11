import { useCallback, useRef } from 'react';

// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

// Kinematics
import {
  bearing,
  forward,
} from '@/views/experiments/factory-arm/engine/kinematics';

// Spec
import type { Box } from '@/views/experiments/factory-arm/engine/box';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/engine/layout';

/**
 * Places the case where the engine says each frame: on its pallet, on the
 * pad, or riding the belt.
 */
const usePlace = (box: Box) => {
  const { joints } = useArmContext();
  const { write } = useCasesContext();
  const {
    conductor: { state },
  } = useEngineContext();

  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<THREE.Group>(null);
  const [width, height] = box.size;

  Fiber.useFrame(() => {
    const target = body.current;

    if (!target) {
      return;
    }

    const held = state.holding;
    const rider = state.riders.get(box.id);
    const own = state.world.cases[box.id];
    let at = own?.at;
    // Square to the cell: turned a quarter when its width lies along z.
    let yaw = own && Math.abs(own.size[0] - width) > 1e-6 ? Math.PI / 2 : 0;

    if (held?.own.id === box.id) {
      const pad = forward(joints.current);

      at = { ...pad, y: pad.y - height / 2 };
      yaw = held.yaw + bearing(joints.current);
    } else if (rider) {
      at = { x: CONVEYOR.x, y: CONVEYOR.height + height / 2, z: rider.z };
      yaw = rider.yaw;
    }

    if (!at) {
      return;
    }

    // Drawn straight from the engine, so it moves with the pad this frame.
    visual.current?.position.set(at.x, at.y, at.z);
    visual.current?.rotation.set(0, yaw, 0);

    // Its body only carries the collider the obstacle checks use; a frame late there doesn't show.
    target.setNextKinematicTranslation(at);
    target.setNextKinematicRotation(
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw)
    );
  });

  const track = useCallback(
    (next: RapierRigidBody | null) => {
      body.current = next;

      return next ? write.track(box.id, { body: next, box }) : undefined;
    },
    [box, write]
  );

  return { track, visual };
};

export { usePlace };
