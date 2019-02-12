// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { Route } from 'Component/Router';

import { works, caches } from 'API';

import resources from 'content/resources';

import { Lists } from './Component';

import View from './View';

import './style.scss';

const {
  view: {
    works: {
      content: {
        loader
      },
      path
    }
  }
} = resources;

const Works = () => (
  <main data-routes='works'>
    <Asynchronizer awaitCache={ caches[path] } awaitFor={ works } awaitMessage={ loader.text }>
      {
        ({ data }) => (
          <React.Fragment>
            <Lists data={ data }/>
          </React.Fragment>
        )
      }
    </Asynchronizer>
    <View/>
  </main>
);

export default (
  <Route path={ path } render={ Works } />
);
