// @flow
import React from 'react';

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
    height: number,
    routes: Array<routes>,
    width: number
};

const Component = ({ location, routes }: Props) => (
    <CSSTransition
        component="header"
        rule="banner"
        inValue={location.pathname !== '/'}
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
