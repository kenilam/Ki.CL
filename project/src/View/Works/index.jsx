// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { works, caches } from 'API';

import resources from 'content/resources';

import { Lists } from './Component';

import State, { Connector } from './State';
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

const Works = ({ data, updateCurrentItem }) => (
  <React.Fragment>
    <Lists data={data} clickHandler={updateCurrentItem} />
    <View />
  </React.Fragment>
);

const Instance = Connector(Works);

const Component = () => (
  <main data-routes="works">
    <Asynchronizer
      awaitCache={caches[path]}
      awaitFor={works}
      awaitMessage={loader.text}
    >
      {({ data }) => (
        <State>
          <Instance data={data} />
        </State>
      )}
    </Asynchronizer>
  </main>
);

export default <Route path={path} render={Component} />;
