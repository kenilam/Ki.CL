import React from 'react';

import { HashRouter as Router, Switch, withRouter } from 'react-router-dom';

import { Transition } from 'Component';

import About from './About';
import Home from './Home';

import './style.scss';

const Component = ({ location, ...rest }) => (
    <Transition
        className="view fade-in"
        component="main"
        childComponent="section"
        keyValue={location.pathname}
    >
        <Switch location={location}>
            {About(rest)}
            {Home(rest)}
        </Switch>
    </Transition>
);

const Instance = withRouter(Component);

const View = props => (
    <Router>
        <Instance {...props} />
    </Router>
);

export default View;
