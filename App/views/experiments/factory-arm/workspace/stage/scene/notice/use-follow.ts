import { useCallback, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';
import { useNoticesContext } from '@/views/experiments/factory-arm/workspace/notices-context';

// Overlays
import { toAnchor } from '@/views/experiments/factory-arm/workspace/stage/overlays';

// Kinematics
import { forward } from '@/views/experiments/factory-arm/engine/kinematics';

/** The badge's anchor, kept on the gripper when the arm has stopped, or on the case given up. */
const useFollow = () => {
  const { joints } = useArmContext();
  const { bodies } = useCasesContext();
  const { skipped, stopped } = useNoticesContext();

  const anchor = useRef<THREE.Group>(null);

  // On the case itself: above it, a buried case's badge lands among the
  // cases on top. It's drawn over the scene, so it shows through them.
  Fiber.useFrame(() => {
    const entry = skipped ? bodies.current.get(skipped) : undefined;
    const at = stopped ? forward(joints.current) : entry?.body.translation();

    if (anchor.current && at) {
      anchor.current.position.set(at.x, at.y, at.z);
    }
  });

  const place = useCallback((node: THREE.Group | null) => {
    anchor.current = node;
    toAnchor('notice')(node);
  }, []);

  return place;
};

export { useFollow };
