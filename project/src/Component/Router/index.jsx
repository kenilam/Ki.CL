// @flow
import React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';

import { Transition } from 'Component';

import { pathByIndex } from './Utilities';

type Location = {};

type RenderProps = { location: Location };

type Props = {
  component?: React.Node,
  location: Location,
  render: (props: RenderProps) => void,
  routeIndex: Number
};

const Router = ({ component, location, render, routeIndex }: Props) => (
  <Transition { ...{ component, transitionKey: pathByIndex(location, routeIndex) } }>
    { render({ location, Switch, Route }) }
  </Transition>
);

const Instance = withRouter(Router);

const Component = props => (
  <HashRouter>
    <Instance { ...props }/>
  </HashRouter>
);

Router.defaultProps = {
  component: 'div'
};

export default Component;
