import React from 'react';

// Grid
import { type Line as Spec, onLine } from 'arm/grid/layout';

// Materials
import { MATERIAL } from './arm/materials';

const QUARTER = Math.PI / 2;
const BELT = 0.04;
const RAIL = { height: 0.08, lip: 0.02, width: 0.03 };

type Props = { line: Spec };

/** A belt line on the floor, from where cases go on to where they come off. */
const Line: React.FunctionComponent<Props> = ({ line }) => {
  const length = line.end - line.start;
  const middle = onLine(line, (line.start + line.end) / 2);
  const legs = Array.from(
    { length: Math.floor(length) + 1 },
    (_, index) =>
      -length / 2 +
      0.1 +
      (index * (length - 0.2)) / Math.max(1, Math.floor(length))
  );
  const sides = [-1, 1].map((side) => (side * (line.width + RAIL.width)) / 2);

  return (
    <group position={[middle.x, 0, middle.z]} rotation-y={-line.heading}>
      <mesh
        castShadow
        receiveShadow
        material={MATERIAL.housing}
        position-y={line.height - BELT / 2}
      >
        <boxGeometry args={[length, BELT, line.width]} />
      </mesh>

      {sides.map((z) => (
        <group key={z}>
          <mesh
            castShadow
            receiveShadow
            material={MATERIAL.metal}
            position={[0, line.height + RAIL.lip - RAIL.height / 2, z]}
          >
            <boxGeometry args={[length, RAIL.height, RAIL.width]} />
          </mesh>
          {legs.map((x) => (
            <mesh
              castShadow
              receiveShadow
              key={x}
              material={MATERIAL.metal}
              position={[x, (line.height - BELT) / 2, z]}
            >
              <boxGeometry args={[0.05, line.height - BELT, 0.05]} />
            </mesh>
          ))}
        </group>
      ))}

      {[-1, 1].map((end) => (
        <mesh
          castShadow
          receiveShadow
          key={end}
          material={MATERIAL.metal}
          position={[(end * length) / 2, line.height - BELT / 2, 0]}
          rotation-x={QUARTER}
        >
          <cylinderGeometry args={[BELT * 0.75, BELT * 0.75, line.width, 20]} />
        </mesh>
      ))}
    </group>
  );
};

export { Line };
