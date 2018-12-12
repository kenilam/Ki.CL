// @flow
import React from 'react';

import { Route } from 'Component/Router';

import resources from 'content/resources';

const { path } = resources.view.home;

const Home = ({match }) => ([
  <main key={ 123456 }>
    <h1>{ match.url }</h1>
  </main>,
  <main key={ 1234567 }>
    <h1>{ match.url }</h1>
  </main>
]);

const Component = <Route exact { ...{ path, render: Home } } />;

export default Component;
