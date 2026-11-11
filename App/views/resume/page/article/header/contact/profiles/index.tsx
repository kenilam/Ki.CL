import React from 'react';

// Partials
import { Profile } from './profile';

// Constants
import { PROFILES } from './constants';

const Profiles: React.FunctionComponent = () => {
  return PROFILES.map(({ context }) => {
    return <Profile context={context} key={context} />;
  });
};

export { Profiles };
