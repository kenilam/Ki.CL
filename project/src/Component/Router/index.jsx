// @flow
import React from 'react';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { Transition } from 'Component';

import { view } from 'content/resources';

import { path } from './Utilities';

type Node = React.Node;

type Props = {
  children: Node;
  componentOnly?: Boolean;
  routeIndex: Number;

  transitionStyle: String;

  onEnter?: (node: Node) => void;
  onEntered?: (node: Node) => void;
  onExit?: (node: Node) => void;
  onExited?: (node: Node) => void;
};

const body = document.querySelector('body');

const Router = ({
  children,
  componentOnly,
  routeIndex,

  transitionStyle,

  onEnter,
  onEntered,
  onExit,
  onExited,
}: Props) => {
  const Transitions = ({ location, match }) => {
    const pathChains = location.pathname.split('/');
    const transitionKey = pathChains[routeIndex] || view.home.path;
    
    return (
      <Transition
        location={ location }
        match={ match }
        transitionKey={ transitionKey }
        transitionStyle={ transitionStyle }
        onEnter={ (node) => {
          const routes = path.notationise(location.pathname, routeIndex);

          body.dataset.enteredRoutes = routes;

          onEnter({ node, location, match });

          if (!node) {
            return;
          }

          node.dataset.routes = routes;
        } }
        onEntered={ (node) => {
          onEntered({ node, location, match });
        } }
        onExit={ (node) => {
          const routes = path.notationise(location.pathname, routeIndex);

          body.dataset.exitedRoutes = routes;

          onExit({ node, location, match });
        } }
        onExited={ (node) => {
          onExited({ node, location, match });
        } }
      >
        <Switch location={ location }>
          { children }
        </Switch>
      </Transition>
    );
  }

  const Instance = withRouter(Transitions);

  return componentOnly
    ? <Instance/>
    : <HashRouter>
        <Instance/>
      </HashRouter>;
}

body.dataset.enteredRoutes = window.location.hash.substr(2).replace(/\//g, '.') || 'home';

Router.defaultProps = {
  componentOnly: false,
  onEnter() {},
  onEntered() {},
  onExit() {},
  onExited() {}
}

export { Redirect, Route };
export default Router;
