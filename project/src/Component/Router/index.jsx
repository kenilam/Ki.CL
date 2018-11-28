// @flow
import React from 'react';

import classnames from 'classnames';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { DOM, Transition } from 'Component';
import { pathnameToRoutes } from 'Helper';
import { Connector } from 'State';

type location = {
  pathname: String
};

type resources = {
  routes: Array
};

type Props = {
  children: React.Node,
  className: String,
  location: location,
  resources: resources,
  transitionStyle: String,
  style: {}
};

const routeIndex = { current: -1, previous: -1 };

const onEnter = pathname => {
  DOM.Title.set(pathname);
  DOM.Body.routesAttr.set('current', pathname);
};

const onExit = pathname => {
  DOM.Body.routesAttr.set('previous', pathname);
};

const directionByRoute = ({ routes, currentRoute }) => {
  let direction = '';

  routeIndex.current = Object.keys(routes)
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

const Component = ({
  children,
  className,
  location,
  resources,
  transitionStyle,
  style,
  ...rest
}: Props) => {
  const { pathname: currentRoute } = location;
  const { routes } = resources;

  return (
    <Transition
      { ...{
        className: classnames(
          'router',
          className,
          transitionStyle,
          directionByRoute({ routes, currentRoute })
        ),
        components: {
          wrapper: 'main',
          element: 'section',
          elementProps: {
            'data-routes': pathnameToRoutes(currentRoute),
            style
          }
        },
        keyValue: currentRoute,
        onEnter: () => onEnter(currentRoute),
        onExit: () => onExit(currentRoute)
      } }
    >
      <Switch location={location}>
        { React.Children.map(children, child => React.cloneElement(child, { ...rest }) ) }
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



View.defaultProps = {
  transitionStyle: 'slide'
}

export default View;
