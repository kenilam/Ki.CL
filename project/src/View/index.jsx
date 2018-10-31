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

let currentRouteIndex = -1;
let previousRouteIndex = false;

const onEnter = pathname => {
    DOM.Title.set(pathname);
    DOM.Body.routesAttr.set('current', pathname);
};

const onExit = pathname => {
    DOM.Body.routesAttr.set('previous', pathname);
};

const routeDirection = (routes, pathname) => {
    let direction = '';

    currentRouteIndex = Object.keys(routes)
        .map(route => `/${route.split('/')[0]}`)
        .indexOf(`/${pathname.split('/')[1]}`);

    if (previousRouteIndex !== true) {
        if (currentRouteIndex > previousRouteIndex) {
            direction = 'transition-forward';
        }

        if (currentRouteIndex < previousRouteIndex) {
            direction = 'transition-backward';
        }
    }

    previousRouteIndex = currentRouteIndex;

    return direction;
};

const Component = ({ location, resources, ...rest }) => {
    const { pathname } = location;
    const { routes } = resources;

    const className = classnames(
        'view',
        'slide',
        routeDirection(routes, pathname)
    );

    onEnter(pathname);

    return (
        <Transition
            {...{ className }}
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
