import React, { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Model
import { forward } from 'arm/model/kinematics';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

/** The outline's colour: the green the floor uses for what may be. */
const COLOUR = '#2fd065';

type Props = { arm: string };

/**
 * Where the controller wants the pad, for an arm whose telemetry is a body's:
 * a small outlined box at the target, so the gap to the drawn pad is the
 * physics lagging or sagging behind the plan. Nothing for an arm that is its
 * own model, since the two would be one.
 */
const Target: React.FunctionComponent<Props> = ({ arm }) => {
  const { telemetry } = useHub();
  const mesh = useRef<THREE.Mesh>(null);

  Fiber.useFrame(() => {
    const target = telemetry.current.get(arm)?.target;

    if (!mesh.current) {
      return;
    }

    mesh.current.visible = !!target;

    if (target) {
      const { x, y, z } = forward(target);

      mesh.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={mesh} renderOrder={1} visible={false}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      {/* Drawn over the gripper: with the physics close behind, the box sits round the pad itself. */}
      <meshBasicMaterial color={COLOUR} depthTest={false} wireframe />
    </mesh>
  );
};

export { Target };
