// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { works, caches } from 'API';

import resources from 'content/resources';

import { List } from './Component';

import View from './View';

import './style';

const {
  view: {
    works: {
      content: { loader },
      path
    }
  }
} = resources;

const Works = ({ data }) => (
  <React.Fragment>
    <List data={data} />
    <View />
  </React.Fragment>
);

const Component = () => (
  <main data-routes="works">
    <Asynchronizer
      awaitCache={caches[path]}
      awaitFor={works}
      awaitMessage={loader.text}
    >
      {({ data }) => <Works data={data} />}
    </Asynchronizer>
  </main>
);

export default <Route path={path} render={Component} />;
