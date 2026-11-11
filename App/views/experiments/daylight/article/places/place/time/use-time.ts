import { useMemo } from 'react';

// Context
import { useDaylightContext } from '@/views/experiments/daylight/context';

// Utilities
import { toLight, toSubsolar } from '@/views/experiments/daylight/sun';

// Constants
import { PLACES } from '@/views/experiments/daylight/constants';

const useTime = (context: (typeof PLACES)[number]['context']) => {
  const { now } = useDaylightContext();
  const subsolar = useMemo(() => toSubsolar(now), [now]);
  const place = PLACES.find((each) => {
    return each.context === context;
  });

  if (!place) {
    return null;
  }

  return { light: toLight(place, subsolar), now, place };
};

export { useTime };
