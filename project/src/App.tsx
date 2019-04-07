import {GlobalHeader} from '@Component';
import * as React from 'react';
import Core from './Core';
import View from './View';

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Core>
    <GlobalHeader />
    <View>view</View>
  </Core>
);

export {appRoot};
export default App;
