// @flow
import React from 'react';
import ResizeObserver from 'react-resize-observer';

import { HashRouter as Router, withRouter } from 'react-router-dom';

import { Logo, Nav } from 'Component';

import { CSSTransition } from 'Component/Transition';

import { Connector } from './State';

import './style.scss';

type routes = {
  name: string,
  path: string
};

type Props = {
  location: {},
  onResize: Function,
  routes: Array<routes>
};

const Component = ({ location, onResize, routes }: Props) => {
  return (
    <CSSTransition
      component="header"
      rule="banner"
      inValue={location.pathname !== '/'}
      onExited={onResize}
    >
      <React.Fragment>
        <Logo />
        <Nav {...{ routes }} />
        <ResizeObserver {...{ onReflow: onResize }} />
      </React.Fragment>
    </CSSTransition>
  )
};

const Instance = Connector(Component);

const InstanceWithRouter = withRouter(Instance);

const GlobalHeader = props => (
  <Router>
    <InstanceWithRouter {...props} />
  </Router>
);

export default GlobalHeader;
