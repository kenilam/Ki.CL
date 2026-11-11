import { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';

// Kinematics
import { solve, step } from '@/views/experiments/factory-arm/engine/kinematics';

/** Steps the joints toward the command each frame, and turns each link's group to match. */
const usePose = () => {
  const { command, joints, write } = useArmContext();

  const yaw = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wrist = useRef<THREE.Group>(null);

  Fiber.useFrame(
    (_, delta) => {
      // Capped so a frame after a hidden tab does not jump the arm.
      const { facing, grip, target } = command.current;
      const goal = solve(target, grip, facing);
      const next = step(joints.current, goal, Math.min(delta, 0.1));

      write.joints(next);

      if (
        !yaw.current ||
        !shoulder.current ||
        !elbow.current ||
        !wrist.current
      ) {
        return;
      }

      yaw.current.rotation.y = next.yaw;
      shoulder.current.rotation.x = -next.shoulder;
      elbow.current.rotation.x = next.elbow;
      wrist.current.rotation.x = -next.wrist;
    },
    // First each frame, so whatever hangs from the pad reads where it is now.
    -1
  );

  return { elbow, shoulder, wrist, yaw };
};

export { usePose };
