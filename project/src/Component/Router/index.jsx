// @flow
import React from 'react';
import { HashRouter, Redirect, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Transition } from 'Component';

import { dataAttrs, directionByRoute, path } from './Utilities';

import { Route } from './Component';

const { byIndex } = path;

type ClassName = {} | Array | String;

type EventHandler = (node: Node) => void;

type Props = {
  className?: ClassName,
  routeIndex: Number,
  onEnter?: EventHandler,
  onExit?: EventHandler
};

const defaultProps =  {
  className: 'router',
  onEnter () {},
  onExit () {}
};

const Router = ({
  children,
  className,
  location,
  routeIndex,
  onEnter,
  onExit,
  ...rest
}: Props) => {
  dataAttrs('entered', location);

  const transitionKey = byIndex(location, routeIndex);

  return (
    <Transition { ...{
      onEnter (node) {
        dataAttrs('entered', location);

        onEnter(node);
      },
      onExit (node) {
        dataAttrs('exited', location);

        onExit(node);
      },
      ...rest
    } }>
      <Switch { ...{ location, transitionKey } }>
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
}

const Instance = withRouter(Router);

const Component = (props: Props) => (
  <HashRouter>
    <Instance { ...props } />
  </HashRouter>
);

Router.defaultProps = defaultProps;
Component.defaultProps = defaultProps;

export { Redirect, Route, dataAttrs, path };
export default Component;
