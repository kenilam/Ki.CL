import React from 'react';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Partials
import { Case } from './case';

/** Every case in the cell, wherever it is: on the pallet, the pad or the belt. */
const Boxes: React.FunctionComponent = () => {
  const { boxes } = useFactoryArmContext();

  return (
    <>
      {boxes.map((box) => (
        <Case key={box.id} box={box} />
      ))}
    </>
  );
};

export { Boxes };
