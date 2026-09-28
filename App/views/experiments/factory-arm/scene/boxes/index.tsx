import React, { useState } from 'react';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Partials
import { Case } from './case';

/**
 * Every case in the cell, wherever it is: on the pallet, the pad or the belt.
 *
 * One blinks as the cell loads, to show cases can be picked: a case on top
 * at the front, clear of the beam at the back, on the side the camera
 * starts from so the crate doesn't hide it.
 */
const Boxes: React.FunctionComponent = () => {
  const { boxes } = useFactoryArmContext();

  const [hint] = useState(() => {
    const top = ({ position, size }: (typeof boxes)[number]) =>
      position[1] + size[1] / 2;
    const highest = Math.max(...boxes.map(top));

    return boxes
      .filter((box) => top(box) > highest - 0.01)
      .toSorted(
        (a, b) => b.position[2] - a.position[2] || a.position[0] - b.position[0]
      )[0]?.id;
  });

  return (
    <>
      {boxes.map((box) => (
        <Case box={box} hint={box.id === hint} key={box.id} />
      ))}
    </>
  );
};

export { Boxes };
