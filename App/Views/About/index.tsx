import React from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Heading } from '@/Components';

const PATH = 'about';

const About = () => {
  return (
    <>
      <Heading is='h1'>about</Heading>
    </>
  );
};

const Route = <Origin path={PATH} />;

export { PATH, Route };
export default <Origin path={PATH} element={<About />} />;
