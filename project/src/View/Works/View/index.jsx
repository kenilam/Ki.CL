// @flow
import React from 'react';

import { Router } from 'Component';

import Work from './Work';

const View = () => (
  <Router
    component={ React.Fragment }
    routeIndex={ 2 }
    render={ ({ location, Switch, Route }) => (
      <Switch location={ location }>
        <Route path='/works/:projectId' exact render={ Work }/>
      </Switch>
    ) }
  />
);

export default View;
