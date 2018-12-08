// @flow
import React from 'react';

import { Link, Router } from 'Component';
import { Route } from 'Component/Router';

const Work = ({ match }) => (
  <section data-routes={ `works.${ match.params.projectId }` }>
    <h2>{ match.params.projectId }</h2>
  </section>
);

const Works = ({ match }) => (
  <main data-routes='works'>
    <h1>{ match.url }</h1>
    <nav>
      <Link to='/works/123'>123</Link>
      <Link to='/works/234'>234</Link>
      <Link to='/works/345'>345</Link>
      <Link to='/works/456'>456</Link>
    </nav>
    <Router { ...{ routeIndex: 2 } }>
      <Route path='/works/:projectId' exact render={ Work } />
    </Router>
  </main>
);

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
