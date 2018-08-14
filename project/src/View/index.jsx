// @flow
import React from 'react';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { DOM, Transition } from 'Component';

import { Connector } from 'State';

import About from './About';
import Home from './Home';
import Works from './Works';

import './style.scss';

const updateDOMElements = () => {
    DOM.Title.set();
    DOM.Body.setRoutesAttr();
};

const Component = ({ location, ...rest }) => {
    updateDOMElements();

    return (
        <Transition
            className="view fade-in"
            components={{
                wrapper: 'main',
                element: 'section'
            }}
            keyValue={location.pathname}
            onEnter={updateDOMElements}
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
