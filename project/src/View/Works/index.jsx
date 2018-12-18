// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { works as api, cache } from 'API';

import resources from 'content/resources';

import { Navigation } from './Component';

import View from './View';

import './style.scss';

const { content, path } = resources.view.works;

const Works = props => {
  const { history, location, match, ...rest } = props;
  
  return (
    <main data-routes='works' { ...rest }>
      <Asynchronizer { ...{
        awaitExpect: cache[match.url],
        awaitMessage: content.loader.text,
        awaitFor: api
      } }>
        <Navigation { ...props }/>
      </Asynchronizer>
      <View { ...props }/>
    </main>
  );
}

const Component = Route({ path, render: Works });

export default Component;
