// @flow
import React from 'react';

import { Router } from 'Component';

import Work from './Work';

const View = () => (
  <Router { ...{ routeIndex: 2, transitionStyle: 'fade' } }>
    { Work }
  </Router>
);

export default View;
