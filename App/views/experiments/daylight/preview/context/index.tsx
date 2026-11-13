import React, { PropsWithChildren, useState } from 'react';

import { Provider as Orb } from '@/views/experiments/daylight/orb';
import { toNearestHere } from '@/views/experiments/daylight/nearest';

import { useTurn } from './use-turn';

const NO_PLACES = [] as const;

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [date] = useState(() => {
    return new Date();
  });
  const [here] = useState(() => {
    return toNearestHere(date);
  });
  const centre = useTurn(here);

  return (
    <Orb active={-1} centre={centre} date={date} drop={0} places={NO_PLACES}>
      {children}
    </Orb>
  );
};

export { Provider };
