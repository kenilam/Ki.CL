import React, { useState } from 'react';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Partials
import { Case } from './case';
import { Runner } from './runner';
import { EngineProvider } from './store';

/**
 * The engine: the cases, placed where it says, and the runner that plans
 * and plays each job. One case blinks as the cell loads, to show cases can be
 * picked: a case on top at the front, on the side the camera starts from.
 */
const Engine: React.FunctionComponent = () => {
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
    <EngineProvider>
      {boxes.map((box) => (
        <Case box={box} hint={box.id === hint} key={box.id} />
      ))}
      <Runner />
    </EngineProvider>
  );
};

export { Engine };
