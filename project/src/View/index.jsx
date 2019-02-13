// @flow
import React from 'react';

import { Router } from 'Component';

import Home from './Home';
import PageNotFound from './PageNotFound';
import Works from './Works';

const routeIndex = 1;

const View = () => (
  <Router routeIndex={ routeIndex } transitionStyle='slide'>
    { Home }
    { Works }
    { PageNotFound }
  </Router>
);

export default View;
