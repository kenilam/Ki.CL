import React, { useState } from 'react';

// Partials
import { Orb } from '@/views/experiments/daylight/orb';

// Utilities
import { toNearestHere } from '@/views/experiments/daylight/nearest';

/** The drawing with no places marked, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  const [date] = useState(() => new Date());
  const [centre] = useState(() => toNearestHere(date));

  return <Orb active={-1} centre={centre} date={date} places={[]} />;
};

export { Plate };
