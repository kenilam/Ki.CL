// @flow
import React from 'react';

import { randomId } from 'Helper';
import { Asynchronizer } from 'Component';

import { works as awaitFor, cache } from 'API';

import resources from 'content/resources';

import { Lists } from './Component';

import View from './View';

import './style.scss';

const { content, path } = resources.view.works;

const Works = ({ match }) => {
  return (
    <main>
      <Asynchronizer { ...{
        awaitExpect: cache[match.url],
        awaitMessage: content.loader.text,
        awaitFor
      } }>
        <Lists/>
      </Asynchronizer>
      <View/>
    </main>
  );
}

export default { path, render: Works, key: randomId() };
