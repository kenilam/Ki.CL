import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/scene/arm/materials';

// Belt
import { useBelt } from './use-belt';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/scene/constants';

const QUARTER = Math.PI / 2;

const LENGTH = CONVEYOR.end - CONVEYOR.start;
const MIDDLE = (CONVEYOR.start + CONVEYOR.end) / 2;
const BELT = 0.04;

/** Deeper than the belt looks, so a case dropped onto it cannot pass through. */
const SOLID = 0.3;

/** A low lip, shown only: a case set down at an angle may overhang it. */
const RAIL = { height: 0.08, lip: 0.02, width: 0.03 };

const SIDES = [-1, 1].map((side) => (side * (CONVEYOR.width + RAIL.width)) / 2);
const LEGS = Array.from(
  { length: Math.floor(LENGTH) + 1 },
  (_, index) =>
    CONVEYOR.start + 0.1 + (index * (LENGTH - 0.2)) / Math.floor(LENGTH)
);

/** The outfeed: a belt that carries whatever lands on it off toward the viewer. */
const Conveyor: React.FunctionComponent = () => {
  useBelt();

  return (
    <RigidBody
      type='fixed'
      colliders={false}
      position={[CONVEYOR.x, 0, MIDDLE]}
    >
      <CuboidCollider
        args={[CONVEYOR.width / 2, SOLID / 2, LENGTH / 2]}
        friction={0}
        position={[0, CONVEYOR.height - SOLID / 2, 0]}
      />
      <mesh material={MATERIAL.housing} position-y={CONVEYOR.height - BELT / 2}>
        <boxGeometry args={[CONVEYOR.width, BELT, LENGTH]} />
      </mesh>

      {SIDES.map((x) => (
        <group key={x}>
          <mesh
            material={MATERIAL.metal}
            position={[x, CONVEYOR.height + RAIL.lip - RAIL.height / 2, 0]}
          >
            <boxGeometry args={[RAIL.width, RAIL.height, LENGTH]} />
          </mesh>
          {LEGS.map((z) => (
            <mesh
              key={z}
              material={MATERIAL.metal}
              position={[x, (CONVEYOR.height - BELT) / 2, z - MIDDLE]}
            >
              <boxGeometry args={[0.05, CONVEYOR.height - BELT, 0.05]} />
            </mesh>
          ))}
        </group>
      ))}

      {[-1, 1].map((end) => (
        <mesh
          key={end}
          material={MATERIAL.metal}
          position={[0, CONVEYOR.height - BELT / 2, (end * LENGTH) / 2]}
          rotation-z={QUARTER}
        >
          <cylinderGeometry
            args={[BELT * 0.75, BELT * 0.75, CONVEYOR.width, 20]}
          />
        </mesh>
      ))}
    </RigidBody>
  );
};

export { Conveyor };
