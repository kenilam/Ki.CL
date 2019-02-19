// @flow
import React from 'react';

import { Router } from 'Component';

import Work from './Work';

import './style.scss';

const routeIndex = 2;

const View = () => (
  <Router routeIndex={ routeIndex }>
    { Work }
  </Router>
);

export default View;
