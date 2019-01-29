// @flow
import React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';

import { Transition } from 'Component';

import { view } from 'content/resources';

import { path } from './Utilities';

type Node = React.Node;

type Props = {
  children: Node;
  routeIndex: Number;
  transitionStyle: String;

  onEnter?: (node: Node) => void;
  onEntered?: (node: Node) => void;
  onExit?: (node: Node) => void;
  onExited?: (node: Node) => void;
};

const Router = ({
  children,
  routeIndex,
  transitionStyle,

  onEnter = CSSTransition.defaultProps.onEnter,
  onEntered = CSSTransition.defaultProps.onEntered,
  onExit = CSSTransition.defaultProps.onExit,
  onExited = CSSTransition.defaultProps.onExited
}: Props) => {
  const Transitions = ({ location, match }) => {
    const pathChains = location.pathname.split('/');
    const transitionKey = pathChains[routeIndex] || view.home.path;

    const routes = path.notationise(location.pathname, routeIndex);

    return (
      Transition({
          location,
          match,
          transitionKey,
          transitionStyle,
          children: (
            <Switch location={ location }>
              {
                [].concat(children).map(
                  ({ exact, key, path, render }) => (
                    <Route
                      exact={ exact }
                      path={ path }
                      render={ render }
                      key={ key }
                    />
                  )
                )
              }
            </Switch>
          ),
          onEnter(node) {
            onEnter(node);

            document.querySelector('body').dataset.enteredRoute = routes;

            if (!node) {
              return;
            }

            node.dataset.routes = routes;
          },
          onEntered,
          onExit(node) {
            onExit(node);

            document.querySelector('body').dataset.exitedRoute = routes;
          },
          onExited
        })
    );
  }

  const TransitionsWithRouter = withRouter(Transitions);

  return (
    <HashRouter>
      <TransitionsWithRouter/>
    </HashRouter>
  );
}

Router.defaultProps = {
  onEnter() {},
  onEntered() {},
  onExit() {},
  onExited() {}
}

export default Router;
