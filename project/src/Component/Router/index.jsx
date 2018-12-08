// @flow
import React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';

import { Transition } from 'Component';

import { path } from './Utilities';

const { byIndex, notationise } = path;

const Router = ({ children, location, routeIndex }) => (
  <Transition { ...{
    keyValue: byIndex(location, routeIndex),
    onEnter () {
      document.body.dataset['enteredRoutes'] = notationise(location);
    },
    onExit () {
      document.body.dataset['exitedRoutes'] = notationise(location);
    }
  } }>
    <Switch location={ location }>
      { children }
    </Switch>
  </Transition>
);

const Instance = withRouter(Router);

const Component = ({ children, routeIndex }) => (
  <HashRouter>
    <Instance { ...{ children, routeIndex } } />
  </HashRouter>
)

export { Route };
export default Component;
