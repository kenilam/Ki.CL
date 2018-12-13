// @flow
import React from 'react';

import View from './View';

import './style.scss';

const App = () => (
  <React.Fragment>
    <View/>
  </React.Fragment>
);

const appRoot = document.querySelector('[app-root]');

export { appRoot };
export default App;
