import React from 'react';

// Materials
import { MATERIAL } from './materials';

// Constants
import { LINK } from './constants';

const QUARTER = Math.PI / 2;

/** The part that turns on the pedestal and carries the shoulder. */
const Turret: React.FunctionComponent = () => (
  <group>
    <mesh material={MATERIAL.body} position-y={0.36}>
      <cylinderGeometry args={[0.28, 0.32, 0.2, 40]} />
    </mesh>

    {/* The saddle that rises to the shoulder, set back from the reach side. */}
    <mesh
      material={MATERIAL.body}
      position={[-0.02, (0.46 + LINK.base) / 2, -0.05]}
    >
      <boxGeometry args={[0.36, LINK.base - 0.46, 0.4]} />
    </mesh>

    {/* The base motor, hung off the back. */}
    <mesh
      material={MATERIAL.housing}
      position={[0, 0.4, -0.34]}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.09, 0.09, 0.2, 24]} />
    </mesh>
  </group>
);

export { Turret };
