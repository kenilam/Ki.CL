import React from 'react';

import { Footer } from '@/views/footer';

import { About } from './about';
import { Hero } from './hero';
import { Top } from './top';
import { Workshop } from './workshop';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Hero />
      <Workshop />
      <Footer>
        <About />
        <Top />
      </Footer>
    </>
  );
};

export { Home };
