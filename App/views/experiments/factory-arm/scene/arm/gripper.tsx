import React, { useMemo, useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Sensors
import { Mounts } from '@/views/experiments/factory-arm/scene/sensors';

// Materials
import { MATERIAL } from './materials';

// Constants
import { GRIPPER, LINK, PLATE } from './constants';

const QUARTER = Math.PI / 2;

// The housing runs from under the flange to just above the pad.
const TOP = 0.08 + GRIPPER.flange;
const HEIGHT = LINK.hand - GRIPPER.pad - TOP;
const MIDDLE = TOP + HEIGHT / 2;

// Its +y face points away from the base while the hand points down.
const FACE = GRIPPER.depth / 2;

const HOLES = Array.from({ length: PLATE.rows * PLATE.columns }, (_, index) => [
  ((index % PLATE.columns) / (PLATE.columns - 1) - 0.5) * GRIPPER.width * 0.78,
  FACE + 0.012,
  MIDDLE +
    (Math.floor(index / PLATE.columns) / (PLATE.rows - 1) - 0.5) * HEIGHT * 0.7,
]) as [number, number, number][];

const IDLE = new THREE.Color('#3a3a3a');
const HOLDING = new THREE.Color('#29d17a');
const STOPPED = new THREE.Color('#ff2d1f');

/** Vacuum box gripper, in the wrist's frame; its pad face is the arm's tip. */
const Gripper: React.FunctionComponent = () => {
  const { joints, stopped } = useFactoryArmContext();

  const light = useMemo(
    () => new THREE.MeshStandardMaterial({ color: IDLE, emissive: IDLE }),
    []
  );

  const roll = useRef<THREE.Group>(null);

  /*
   * The tool axis is the wrist's +z, pointing down. Turning about it by `a`
   * turns the pad's heading by `-a`, so the roll is applied negated.
   */
  Fiber.useFrame(() => {
    // Red when the arm has stopped with no way on or back; green while holding.
    if (stopped) {
      light.emissive.copy(STOPPED);
    } else {
      light.emissive.lerpColors(IDLE, HOLDING, joints.current.grip);
    }
    roll.current?.rotation.set(0, 0, -joints.current.roll);
  });

  return (
    <group>
      <mesh material={MATERIAL.body} rotation-z={QUARTER}>
        <cylinderGeometry args={[0.11, 0.11, 0.26, 32]} />
      </mesh>

      <Mounts link='wrist' />

      <group ref={roll}>
        <Mounts link='gripper' />

        <mesh
          material={MATERIAL.housing}
          position-z={0.08 + GRIPPER.flange / 2}
          rotation-x={QUARTER}
        >
          <cylinderGeometry args={[0.09, 0.1, GRIPPER.flange, 32]} />
        </mesh>

        <Drei.RoundedBox
          args={[GRIPPER.width, GRIPPER.depth, HEIGHT]}
          material={MATERIAL.housing}
          position-z={MIDDLE}
          radius={0.025}
        />
        <mesh material={MATERIAL.plate} position={[0, FACE + 0.005, MIDDLE]}>
          <boxGeometry args={[GRIPPER.width * 0.88, 0.01, HEIGHT * 0.86]} />
        </mesh>
        <Drei.Instances limit={HOLES.length} material={MATERIAL.housing}>
          <circleGeometry args={[0.011, 12]} />
          {HOLES.map((position) => (
            <Drei.Instance
              key={position.join()}
              position={position}
              rotation-x={-QUARTER}
            />
          ))}
        </Drei.Instances>

        <mesh
          material={light}
          position={[GRIPPER.width / 2 - 0.05, FACE + 0.02, TOP + 0.03]}
        >
          <sphereGeometry args={[0.028, 16, 16]} />
        </mesh>

        <mesh material={MATERIAL.hose} position-z={LINK.hand - GRIPPER.pad / 2}>
          <boxGeometry
            args={[GRIPPER.width + 0.02, GRIPPER.depth + 0.02, GRIPPER.pad]}
          />
        </mesh>
      </group>
    </group>
  );
};

export { Gripper };
