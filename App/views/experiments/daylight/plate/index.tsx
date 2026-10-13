import React, { useState } from 'react';

// Partials
import { Glass } from '@/views/experiments/daylight/glass';

// Utilities
import { toHome } from '@/views/experiments/daylight/home';

/** The window with no places marked, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  const [date] = useState(() => new Date());
  const [centre] = useState(() => toHome(date));

  return <Glass active={-1} centre={centre} date={date} places={[]} />;
};

export { Plate };
