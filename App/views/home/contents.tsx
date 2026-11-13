import React from 'react';

import { Explore } from './explore';
import { Hero } from './hero';
import { Resume } from './resume';
import { Workshop } from './workshop';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Hero />
      <Workshop />
      <Explore />
      <Resume />
    </>
  );
};

export { Home };
