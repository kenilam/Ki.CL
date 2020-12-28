import React from 'react';

import { Route } from '@/Component';

import { data } from '$/resources';

const {
  view: {
    contact: {
      path
    }
  }
} = data;

const Contact: React.FunctionComponent = () => {
  return (
    <>
      Contact
    </>
  );
};

export default (
  <Route exact path={path}>
    <Contact />
  </Route>
);
