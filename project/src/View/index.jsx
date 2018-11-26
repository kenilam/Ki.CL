// @flow
import React from 'react';

import classnames from 'classnames';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { DOM, Transition } from 'Component';
import { pathnameToRoutes } from 'Helper';
import { Connector } from 'State';

import About from './About';
import Contact from './Contact';
import Home from './Home';
import Works from './Works';

import './style.scss';

const routeIndex = { current: -1, previous: -1 };

const onEnter = pathname => {
  DOM.Title.set(pathname);
  DOM.Body.routesAttr.set('current', pathname);
};

const onExit = pathname => {
  DOM.Body.routesAttr.set('previous', pathname);
};

const transitionDirectionByRoute = ({ allRoutes, currentRoute }) => {
  let direction = '';

  routeIndex.current = Object.keys(allRoutes)
    .map(route => `/${route.split('/')[0]}`)
    .indexOf(`/${currentRoute.split('/')[1]}`);

  if (routeIndex.previous >= 0) {
    if (routeIndex.current > routeIndex.previous) {
      direction = 'transition-forward';
    }

    if (routeIndex.current < routeIndex.previous) {
      direction = 'transition-backward';
    }
  }

  routeIndex.previous = routeIndex.current;

  return direction;
};

const Component = ({ location, resources, style, ...rest }) => {
  const { pathname : currentRoute } = location;
  const { routes : allRoutes } = resources;

  const direction = transitionDirectionByRoute({ allRoutes, currentRoute });

  const className = classnames(
    'view',
    'slide',
    direction
  );

  onEnter(currentRoute);

  return (
    <Transition
      {...{ className }}
      components={{
        wrapper: 'main',
        element: 'section',
        elementProps: {
          'data-routes': pathnameToRoutes(currentRoute),
          style
        }
      }}
      keyValue={currentRoute}
      onEnter={() => onEnter(currentRoute)}
      onExit={() => onExit(currentRoute)}
    >
      <Switch location={location}>
        {About(rest)}
        {Contact(rest)}
        {Home(rest)}
        {Works(rest)}
      </Switch>
    </Transition>
  );
};

const Instance = Connector(Component);

const InstanceWithRouter = withRouter(Instance);

const View = props => (
  <Router>
    <InstanceWithRouter {...props} />
  </Router>
);

export default View;
