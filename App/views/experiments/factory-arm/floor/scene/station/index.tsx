import React from 'react';

// Grid
import { centre } from '@/views/experiments/factory-arm/cell/grid/hex';

// Context
import type { Station as Spec } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Arm } from '@/views/experiments/factory-arm/floor/scene/arm';
import { Handle } from '@/views/experiments/factory-arm/floor/scene/handle';
import { Hex } from '@/views/experiments/factory-arm/floor/scene/hex';
import { Pallet } from '@/views/experiments/factory-arm/floor/scene/pallet';
import { Working } from './working';

type Props = { station: Spec };

/**
 * One cell of the grid, in its own frame: its outline and slots, its arm,
 * which can be dragged to another cell, the buffer when it has one, and
 * the cases its station is working.
 */
const Station: React.FunctionComponent<Props> = ({ station }) => {
  const { arm, hex, layout } = station;
  const at = centre(hex);

  return (
    <group position={[at.x, 0, at.z]}>
      <Hex hex={{ q: 0, r: 0 }} />
      <Handle id={arm} kind='arm' radius={0.6}>
        <Arm arm={arm} />
      </Handle>
      {layout.buffer && <Pallet position={layout.buffer} />}
      <Working station={station} />
    </group>
  );
};

export { Station };
