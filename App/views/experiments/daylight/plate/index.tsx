import React, { useState } from 'react';

// Partials
import { Orb } from '@/views/experiments/daylight/orb';

// Utilities
import { toNearestHere } from '@/views/experiments/daylight/nearest';

/** On a tall panel the words are at the foot, so the drawing sits above the middle. */
const DROP = -0.16;

/** The drawing with no places marked, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  const [date] = useState(() => new Date());
  const [centre] = useState(() => toNearestHere(date));

  return (
    <Orb active={-1} centre={centre} date={date} drop={DROP} places={[]} />
  );
};

export { Plate };
