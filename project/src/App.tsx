import { Provider } from '@/Component/Router';
import React from 'react';
import GlobalHeader from './Component/GlobalHeader';
import View from './View';

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Provider>
    <GlobalHeader />
    <View />
  </Provider>
);

export { appRoot };
export default App;
