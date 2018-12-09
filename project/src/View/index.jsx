// @flow
import React from 'react';

import { Router } from 'Component';
import { Route } from 'Component/Router';

import Works from './Works';

const Home = ({ match }) => (
  <main data-routes='home'>
    <h1>{ match.url }</h1>
  </main>
);

const View = () => (
  <Router { ...{ routeIndex: 1 } }>
    <Route path='/' exact render={ Home } />
    <Route path='/works' render={ Works } />
  </Router>
);

export default View;
