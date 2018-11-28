// @flow
import React from 'react';

import { HashRouter as Router, withRouter } from 'react-router-dom';

import { Logo, Nav, ResizeObserver } from 'Component';

import { CSSTransition } from 'Component/Transition';

import { Connector } from './State';

import './style.scss';

type routes = {
  name: string,
  path: string
};

type Props = {
  location: {},
  resizeHandler: (rect: {}) => void,
  routes: Array<routes>
};

const Component = ({ location, resizeHandler, routes }: Props) => (
  <CSSTransition
    component={ResizeObserver}
    componentClass='header'
    rule='banner'
    inValue={ location.pathname !== '/' }
    { ...{ resizeHandler: resizeHandler } }
    onExited={ () => resizeHandler() }
  >
    <React.Fragment>
      <Logo />
      <Nav {...{ routes }} />
    </React.Fragment>
  </CSSTransition>
);

const Instance = Connector(Component);

const InstanceWithRouter = withRouter(Instance);

const GlobalHeader = props => (
  <Router>
    <InstanceWithRouter {...props} />
  </Router>
);

export default GlobalHeader;
