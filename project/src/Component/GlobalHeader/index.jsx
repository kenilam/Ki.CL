import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import { Logo } from 'Component';

import { Connector } from './State';

const GlobalHeader = ({ routes }) => (
    <header rule="banner">
        <Logo />
        <Router>
            <nav>
                {routes.map(({ name, path }) => (
                    <NavLink to={path} key={name}>
                        {name}
                    </NavLink>
                ))}
            </nav>
        </Router>
    </header>
);

const Component = Connector(GlobalHeader);

export default Component;
