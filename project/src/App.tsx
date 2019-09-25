import {Asynchronizer} from '@/Component';
import {Provider} from '@/Component/Router';
import IView from '@/View/spec';
import React from 'react';
import GlobalHeader from './GlobalHeader';
import View, {awaitFor} from './View';

const appRoot = document.querySelector('[app-root]');
const pathname = window.location.hash.substr(2) || 'home';
const shouldWaitFor = awaitFor[pathname as IView.View];

const App = () => (
  <Provider>
    <GlobalHeader />
    {View}
  </Provider>
);

const Component = () => (
  shouldWaitFor ? (
    <Asynchronizer awaitFor={shouldWaitFor}>
      {App}
    </Asynchronizer>
  ) : <App/>
);

export {appRoot};
export default Component;
