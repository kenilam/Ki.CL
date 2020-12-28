import React from 'react';

import { Route } from '@/Component';

import { data } from '$/resources';

const {
  view: {
    works: {
      path
    }
  }
} = data;

const Works: React.FunctionComponent = () => {
  return (
    <>
      Works
    </>
  );
};

export default (
  <Route exact path={path}>
    <Works />
  </Route>
);
