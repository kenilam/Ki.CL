// @flow
import React from 'react';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { DOM, Transition } from 'Component';
import { hashToRoutes } from 'Helper';
import { Connector } from 'State';

import About from './About';
import Home from './Home';
import Works from './Works';

import './style.scss';

const onEnter = location => {
    DOM.Title.set();
    DOM.Body.setRoutesAttr('current', location.pathname);
};

const onExit = location => {
    DOM.Body.setRoutesAttr('previous', location.pathname);
};

const Component = ({ location, ...rest }) => {
    const { pathname } = location;

    onEnter(location);

    return (
        <Transition
            className="view fade-in"
            components={{
                wrapper: 'main',
                element: 'section',
                elementAttrs: {
                    'data-routes': hashToRoutes
                }
            }}
            keyValue={pathname}
            onEnter={() => onEnter(location)}
            onExit={() => onExit(location)}
        >
            <Switch location={location}>
                {About(rest)}
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
