import React from 'react';

import { Routes } from '@/Component';

import Contact from './Contact';
import Home from './Home';
import Works from './Works';

const View: React.FunctionComponent = () => {
  return (
    <Routes component='main' level={1} transition='fade'>
      {Contact}
      {Home}
      {Works}
    </Routes>
  );
}

export default View;
