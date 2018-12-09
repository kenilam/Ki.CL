// @flow
import React from 'react';

import { Router } from 'Component';
import { Route } from 'Component/Router';

import Work from './Work';

const View = () => (
  <Router routeIndex={ 2 }>
    <Route path='/works/:projectId' exact render={ Work }/>
  </Router>
);

export default View;
