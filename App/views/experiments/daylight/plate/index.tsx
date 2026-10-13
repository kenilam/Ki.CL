import React, { useState } from 'react';

// Partials
import { Orb } from '@/views/experiments/daylight/orb';

// Utilities
import { toHome } from '@/views/experiments/daylight/home';

/** The drawing with no places marked, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  const [date] = useState(() => new Date());
  const [centre] = useState(() => toHome(date));

  return <Orb active={-1} centre={centre} date={date} places={[]} />;
};

export { Plate };
