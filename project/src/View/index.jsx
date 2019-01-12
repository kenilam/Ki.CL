// @flow
import React from 'react';

import { Router } from 'Component';

import PageNotFound from './PageNotFound';
import Home from './Home';
import Works from './Works';

const routeIndex = 1;
const transitionStyle = 'fade';

const View = () => (
  <Router { ...{ routeIndex, transitionStyle } }>
    { Home }
    { Works }
    { PageNotFound }
  </Router>
);

export default View;
