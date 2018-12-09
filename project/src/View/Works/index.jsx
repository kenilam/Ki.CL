// @flow
import React from 'react';

import { works as api, cache } from 'API';
import { Asynchronizer } from 'Component';

import resources from 'content/resources';

import { Navigation } from './Component';

import View from './View';

import './style';

const { content } = resources.view.works;

const Insance = props => Asynchronizer({
  Component: Navigation,
  awaitFor: api,
  awaitMessage: content.loader.text,
  awaitExpect: cache[props.match.url],
  ...props
});

const Component = props => (
  <main data-routes='works'>
    <Insance { ...props } />
    <View { ...props } />
  </main>
);

export default Component;
