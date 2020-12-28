import React from 'react';

import { Logo, Route } from '@/Component';

import { data } from '$/resources';

const {
  view: {
    home: {
      path
    }
  }
} = data;

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Logo/>
    </>
  );
};

export default (
  <Route exact path={path}>
    <Home />
  </Route>
);
