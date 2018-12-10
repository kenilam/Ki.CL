// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { works as api, cache } from 'API';

import resources from 'content/resources';

import { Navigation } from './Component';

import View from './View';

import './style';

const { content, path } = resources.view.works;

const Works = props => (
  <main data-routes='works'>
    {
      Asynchronizer({
        Component: Navigation,
        awaitExpect: cache[props.match.url],
        awaitMessage: content.loader.text,
        awaitFor: api,
        ...props
      })
    }
    <View { ...props } />
  </main>
);

const Component = <Route { ...{ path, render: Works } } />;

export default Component;
