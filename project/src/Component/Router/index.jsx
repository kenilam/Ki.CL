// @flow
import React from 'react';

import classnames from 'classnames';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { DOM, Transition } from 'Component';
import { pathnameToRoutes } from 'Helper';
import { Connector } from 'State';

type Location = {
  pathname: String
};

type Resources = {
  routes: Array
};

type Node = React.node;

type Props = {
  children: React.Node,
  className: String,
  location: Location,
  onEnter?: (node: Node) => void,
  onExit?: (node: Node) => void,
  resources: Resources,
  transitionStyle?: String,
  style: {}
};

const routeIndex = { current: -1, previous: -1 };

const enterHandler = pathname => {
  DOM.Title.set(pathname);
  DOM.Body.routesAttr.set('current', pathname);
};

const exitHandler = pathname => {
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
  onEnter,
  onExit,
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
        onEnter: node => {
          enterHandler(currentRoute);

          onEnter(node);
        },
        onExit: node => {
          exitHandler(currentRoute);

          onExit(node);
        }
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

Component.defaultProps = {
  transitionStyle: 'slide',
  onEnter: () => {},
  onExit: () => {}
}

export default View;
