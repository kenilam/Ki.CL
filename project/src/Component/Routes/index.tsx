import React from 'react';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import { TransitionGroup, DEFAULT_TRANSITION_COMPONENT } from '@/Component';

import * as Spec from './spec';

const DEFAULT_LEVEL = 1;

const Routes: React.FunctionComponent<Spec.Props> = (
  {
    children,
    component: Component = DEFAULT_TRANSITION_COMPONENT,
    level = DEFAULT_LEVEL,
    onEnter,
    onExit,
    transition,
    ...props
  }
) => {
  const location = useLocation();

  const { pathname } = location;
  
  const routes = pathname.substr(1).replace(/\//g, '.') || 'home';

  const enterHandler: Spec.Props['onEnter'] = (node, isAppearing) => {
    const root = document.querySelector('[app-root]');

    root?.setAttribute('data-enter-routes', routes);

    if (!onEnter) {
      return;
    }

    onEnter(node, isAppearing);
  }

  const exitHandler: Spec.Props['onExit'] = (node) => {
    const root = document.querySelector('[app-root]');

    root?.setAttribute('data-exit-routes', routes);

    if (!onExit) {
      return;
    }

    onExit(node);
  }

  const transitionKey = location.pathname.split('/')[level];

  return (
    <TransitionGroup
      {...props}
      component={Component}
      transitionKey={transitionKey}
      onEnter={enterHandler}
      onExit={exitHandler}
      transition={transition}
    >
      <Switch location={location}>
        {children}
      </Switch>
    </TransitionGroup>
  );
}

export { Route, Router };
export default Routes;
