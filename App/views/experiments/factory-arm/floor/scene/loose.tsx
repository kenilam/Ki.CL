import React from 'react';

// Grid
import { PALLET } from '@/views/experiments/factory-arm/cell/grid/layout';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Case } from './case';

/** Cases left on the floor where a pallet was taken away. They stand as they stood, minus the boards. */
const Loose: React.FunctionComponent = () => {
  const { active } = useHub();

  return (active.loose ?? []).map(({ at, cases }) =>
    cases.map((own) => (
      <Case
        glow={() => 'none'}
        key={own.id}
        own={own}
        pose={() => ({
          at: {
            x: at.x + own.at.x,
            y: own.at.y - PALLET.size[1],
            z: at.z + own.at.z,
          },
          yaw: own.yaw,
        })}
      />
    ))
  );
};

export { Loose };
