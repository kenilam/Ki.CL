// @flow
import React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Transition } from 'Component';

import { directionByRoute, path } from './Utilities';

const { byIndex, notationise } = path;

type ClassName = {} | Array | String;

type Props = {
  className?: ClassName,
  routeIndex: Number
};

const Router = ({
  children,
  location,
  routeIndex
}: Props) => (
  <Transition { ...{
    className: classnames(
      directionByRoute({ currentRoute: location.pathname })
    ),
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

const Component = ({ children, routes, routeIndex }) => (
  <HashRouter>
    <Instance { ...{ children, routes, routeIndex } } />
  </HashRouter>
);

Router.defaultProps = {
  className: 'router'
}

export { Route };
export default Component;
