// @flow
import React from 'react';

import { Router } from 'Component';

import Home from './Home';
import Works from './Works';

const View = () => (
  <Router
    component={ React.Fragment }
    routeIndex={ 1 }
    render={ ({ location, Switch, Route }) => (
      <Switch location={ location }>
        <Route path='/' exact render={ Home }/>
        <Route path='/works' render={ Works }/>
      </Switch>
    ) }
  />
);

export default View;
