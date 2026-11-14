import React from 'react';

import { Explore } from '@/views/explore';

import { About } from './about';
import { Hero } from './hero';
import { Workshop } from './workshop';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Hero />
      <Workshop />
      <Explore />
      <About />
    </>
  );
};

export { Home };
