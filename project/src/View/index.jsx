// @flow
import React from 'react';

import { Router } from 'Component';

import Home from './Home';
import Works from './Works';

const View = () => (
  <Router { ...{ routeIndex: 1 } }>
    { Home }
    { Works }
  </Router>
);

export default View;
