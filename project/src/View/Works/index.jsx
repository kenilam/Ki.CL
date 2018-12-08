// @flow
import React from 'react';

import { works as api, cache } from 'API';
import { Asynchronizer } from 'Component';

import resources from 'content/resources';

import { Navigation } from './Component';

import View from './View';

const { content } = resources.view.works;

const Works = ({ data }) => (
  <main>
    <Navigation { ...{ data } }/>
    <View/>
  </main>
);

const Component = ({ match }) => Asynchronizer({
  Component: Works,
  awaitFor: api,
  awaitMessage: content.loader.text,
  expect: cache[match.url]
});

export default Component;
