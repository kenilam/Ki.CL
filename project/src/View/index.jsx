// @flow
import React from 'react';

import { Router } from 'Component';

import Home from './Home';
import PageNotFound from './PageNotFound';
import Works from './Works';

const View = () => (
  <Router routeIndex={ 1 }>
    {[
      Home,
      Works,
      PageNotFound
    ]}
  </Router>
);

export default View;
