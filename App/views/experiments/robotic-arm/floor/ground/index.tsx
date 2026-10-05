import React, { useMemo } from 'react';

// Libraries
import { BufferGeometry, DoubleSide, Float32BufferAttribute } from 'three';

// Grid
import { corners, members, range, toPoint, type Hex } from 'arm/grid';

// World
import type { World } from '@/views/experiments/robotic-arm/floor/world';

// Constants
import { COLOURS } from '@/views/experiments/robotic-arm/floor/constants';

const LIFT = 0.002;

/** Every hex's outline as one set of line segments. */
const outlines = (hexes: Hex[]) => {
  const points = hexes.flatMap((one) => {
    const ring = corners(one);

    return ring.flatMap((from, index) => {
      const to = ring[(index + 1) % ring.length];

      return [from.x, LIFT, from.z, to.x, LIFT, to.z];
    });
  });

  return new BufferGeometry().setAttribute(
    'position',
    new Float32BufferAttribute(points, 3)
  );
};

/** The arm cells' hexes filled, as triangle fans from each centre. */
const fills = (hexes: Hex[]) => {
  const points = hexes.flatMap((one) => {
    const ring = corners(one);
    const centre = ring.reduce(
      (sum, corner) => ({ x: sum.x + corner.x / 6, z: sum.z + corner.z / 6 }),
      { x: 0, z: 0 }
    );

    return ring.flatMap((from, index) => {
      const to = ring[(index + 1) % ring.length];

      return [
        centre.x,
        LIFT / 2,
        centre.z,
        to.x,
        LIFT / 2,
        to.z,
        from.x,
        LIFT / 2,
        from.z,
      ];
    });
  });

  const geometry = new BufferGeometry().setAttribute(
    'position',
    new Float32BufferAttribute(points, 3)
  );

  geometry.computeVertexNormals();

  return geometry;
};

/** The floor, its fine hex grid, and the arm cells picked out on it. */
const Ground: React.FunctionComponent<{
  cells: Hex[];
  ground: World['ground'];
}> = ({ cells, ground }) => {
  const lines = useMemo(
    () => outlines(range(ground.centre, ground.radius)),
    [ground]
  );
  const filled = useMemo(() => fills(cells.flatMap(members)), [cells]);
  const middle = toPoint(ground.centre);

  return (
    <group>
      <mesh
        position={[middle.x, 0, middle.z]}
        receiveShadow
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[ground.radius * 4, ground.radius * 4]} />
        <meshStandardMaterial color={COLOURS.ground} />
      </mesh>
      <mesh geometry={filled} receiveShadow>
        <meshStandardMaterial color={COLOURS.cell} side={DoubleSide} />
      </mesh>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={COLOURS.grid} />
      </lineSegments>
    </group>
  );
};

export { Ground };
