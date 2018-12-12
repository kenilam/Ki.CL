// @flow
import React from 'react';

import { Asynchronizer } from 'Component';
import { debounce } from 'Helper';

import View from './View';

import './style.scss';

const awaitFor = () => debounce(2000);

const App = () => (
  <React.Fragment>
    <View/>
  </React.Fragment>
);

const Component = () => Asynchronizer({
  Component: App,
  awaitMessage: 'initializing...',
  awaitFor,
  iconOnly: true
});

const appRoot = document.querySelector('[app-root]');

export { appRoot };
export default Component;
