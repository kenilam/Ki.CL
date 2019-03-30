import * as React from 'react';

import Core from './Core';
import View from './View';

const appRoot = document.querySelector('[app-root]');

class App extends Core { }

export { appRoot };
export default () => (
  <App>
    <View>view</View>
  </App>
);
