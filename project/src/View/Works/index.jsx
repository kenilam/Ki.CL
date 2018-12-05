// @flow
import React from 'react';

import { works as api } from 'API';
import { Asynchronizer } from 'Component';

import { Navigation } from './Component';

import View from './View';

const Works = ({ data }) => (
  <main role='main'>
    <Navigation { ...{ data } }/>
    <View/>
  </main>
);

const Component = Asynchronizer({
  Component: Works,
  awaitFor: api
});

export default Component;
