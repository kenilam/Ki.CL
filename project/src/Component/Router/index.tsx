
import * as React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';

import { Transition } from '@Component';

import { IComponent, IRouter } from './spec';

const Component: React.FunctionComponent<IComponent> = ({
  children,
  location
}) => (
    <Transition transitionKey={location.pathname.split('/')[1] || '/'}>
      <Switch location={location}>{children}</Switch>
    </Transition>
  );
const Instance = withRouter(Component);

const Router: React.FunctionComponent<IRouter> = ({ children }) => (
  <HashRouter>
    <Instance>{children}</Instance>
  </HashRouter>
);

export { Route, Switch };

export default Router;
