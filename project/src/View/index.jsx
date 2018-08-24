// @flow
import React from 'react';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { DOM, Transition } from 'Component';
import { pathnameToRoutes } from 'Helper';
import { Connector } from 'State';

import About from './About';
import Home from './Home';
import Works from './Works';

import './style.scss';

const onEnter = pathname => {
    DOM.Title.set(pathname);
    DOM.Body.setRoutesAttr('current', pathname);
};

const onExit = pathname => {
    DOM.Body.setRoutesAttr('previous', pathname);
};

const Component = ({ location, ...rest }) => {
    const { pathname } = location;

    onEnter(pathname);

    return (
        <Transition
            className="view fade-in"
            components={{
                wrapper: 'main',
                element: 'section',
                elementAttrs: {
                    'data-routes': pathnameToRoutes(pathname)
                }
            }}
            keyValue={pathname}
            onEnter={() => onEnter(pathname)}
            onExit={() => onExit(pathname)}
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
