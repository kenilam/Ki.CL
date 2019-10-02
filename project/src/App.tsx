import {Asynchronizer} from '@/Component';
import {Provider, useLocation} from '@/Component/Router';
import React, {Fragment, FunctionComponent} from 'react';
import GlobalHeader from './Component/GlobalHeader';
import View, {AWAIT_FOR} from './View';

const appRoot = document.querySelector('[app-root]');

const App = () => (
  <Fragment>
    <GlobalHeader />
    <View />
  </Fragment>
);

const Instance: FunctionComponent = () => {
  const {pathname} = useLocation();
  const shouldWaitFor = AWAIT_FOR[pathname];
  
  return (
    shouldWaitFor ? (
      <Asynchronizer awaitFor={shouldWaitFor}>
        {App}
      </Asynchronizer>
    ) : <App />
  )
};

const Component = () => (
  <Provider>
    <Instance />
  </Provider>
);

export {appRoot};
export default Component;
