import React, { PropsWithChildren, useState } from 'react';

// Partials
import { Provider as Orb } from '@/views/experiments/daylight/orb';

// Utilities
import { toNearestHere } from '@/views/experiments/daylight/nearest';

/** On a tall panel the words are at the foot, so the drawing sits above the middle. */
const DROP = -0.125;

const NO_PLACES = [] as const;

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [date] = useState(() => new Date());
  const [centre] = useState(() => toNearestHere(date));

  return (
    <Orb active={-1} centre={centre} date={date} drop={DROP} places={NO_PLACES}>
      {children}
    </Orb>
  );
};

export { Provider };
