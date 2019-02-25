// @flow
import React from 'react';
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { Transition } from 'Component';

import { view } from 'content/resources';

import path from './Utilities/path';

type Node = React.Node;

type Props = {
  children: Node,
  componentOnly?: Boolean,
  routeIndex: Number,

  transitionStyle: String,

  onEnter?: (node: Node) => void,
  onEntered?: (node: Node) => void,
  onEntering?: (node: Node) => void,
  onExit?: (node: Node) => void,
  onExited?: (node: Node) => void,
  onExiting?: (node: Node) => void
};

const body = document.querySelector('body');

const Router = ({
  children,
  componentOnly,
  routeIndex,

  transitionStyle,

  onEnter,
  onEntered,
  onEntering,
  onExit,
  onExited,
  onExiting
}: Props) => {
  const Transitions = ({ location, match }) => {
    const pathChains = location.pathname.split('/');
    const transitionKey = pathChains[routeIndex] || view.home.path;

    location.query = path.query(location);

    return (
      <Transition
        location={location}
        match={match}
        transitionKey={transitionKey}
        transitionStyle={transitionStyle}
        onEnter={node => {
          onEnter({ location, node });

          // To Prevent the same route attrs
          // when CSSTransition appear set to true
          let enteredRoutes = path.notationise(
            window.location.hash,
            routeIndex
          );

          const { exitedRoutes } = body.dataset;

          if (body.dataset.enteredRoutes === enteredRoutes) {
            return;
          }

          if (enteredRoutes === exitedRoutes) {
            enteredRoutes = path.notationise(location.pathname, routeIndex);
          }

          body.dataset.enteredRoutes = enteredRoutes;
        }}
        onEntered={node => {
          onEntered({ location, node });
        }}
        onEntering={node => {
          onEntering({ location, node });
        }}
        onExit={node => {
          onExit({ location, node });

          body.dataset.exitedRoutes = path.notationise(
            location.pathname,
            routeIndex
          );
        }}
        onExited={node => {
          onExited({ location, node });
        }}
        onExiting={node => {
          onExiting({ location, node });
        }}
      >
        <Switch location={location}>{children}</Switch>
      </Transition>
    );
  };

  const Instance = withRouter(Transitions);

  return componentOnly ? (
    <Instance />
  ) : (
    <HashRouter>
      <Instance />
    </HashRouter>
  );
};

body.dataset.enteredRoutes = path.notationise(window.location.hash);

Router.defaultProps = {
  componentOnly: false,
  onEnter() {},
  onEntered() {},
  onEntering() {},
  onExit() {},
  onExited() {},
  onExiting() {}
};

export { Redirect, Route, withRouter };
export default Router;
