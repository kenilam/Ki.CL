// @flow
import React from 'react';

import { Router } from 'Component';

import Work from './Work';

import './style';

const routeIndex = 2;

const View = () => (
  <Router routeIndex={routeIndex} transitionStyle="fade">
    {Work}
  </Router>
);

export default View;
