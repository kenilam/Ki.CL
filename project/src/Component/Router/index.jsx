// @flow
import React from 'react';
import { HashRouter, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Transition } from 'Component';

import { directionByRoute, path } from './Utilities';

import { Route } from './Component';

const { byIndex, notationise } = path;

type ClassName = {} | Array | String;

type Props = {
  className?: ClassName,
  routeIndex: Number
};

const Router = ({
  children,
  className,
  location,
  routeIndex,
  ...rest
}: Props) => (
  <Transition { ...{
    onEnter () {
      document.body.dataset['enteredRoutes'] = notationise(location);
    },
    onExit () {
      document.body.dataset['exitedRoutes'] = notationise(location);
    },
    ...rest
  } }>
    <Switch location={ location } transitionKey={ byIndex(location, routeIndex) }>
      { React.Children.map(
        children,
        child => React.cloneElement(child, {
          className: classnames(
            className, directionByRoute({ currentRoute: location.pathname })
          ),
          ...rest
        })
      ) }
    </Switch>
  </Transition>
);

const Instance = withRouter(Router);

const Component = ({ children, routeIndex, transitionStyle }) => (
  <HashRouter>
    <Instance { ...{ children, routeIndex, transitionStyle } } />
  </HashRouter>
);

Router.defaultProps = {
  className: 'router'
}

export { Route };
export default Component;
