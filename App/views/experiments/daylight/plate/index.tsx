import React, { useState } from 'react';

// Partials
import { Orb } from '@/views/experiments/daylight/orb';

// Utilities
import { toNearestHere } from '@/views/experiments/daylight/nearest';

/** On a tall panel the words are at the foot, so the drawing sits above the middle. */
const DROP = -0.125;

/**
 * The home's plate reaches 12% past its panel above and below, to drift as
 * the page scrolls. Without this a panel a little wider than tall is taken
 * for a tall one, and the drawing is laid out for a phone.
 */
const STRETCH = 1.24;

/** The drawing with no places marked, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  const [date] = useState(() => new Date());
  const [centre] = useState(() => toNearestHere(date));

  return (
    <Orb
      active={-1}
      centre={centre}
      date={date}
      drop={DROP}
      places={[]}
      stretch={STRETCH}
    />
  );
};

export { Plate };
