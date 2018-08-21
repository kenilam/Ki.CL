// @flow
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { Link } from 'Component';
import { randomId } from 'Helper';

import './style.scss';

type route = {
    name: String,
    path: String
};

type Props = {
    routes: Array<route>
};

const Nav = ({ routes }: Props) => (
    <Router>
        <nav className="navigation">
            {routes.map(({ name, path }) => (
                <Link to={path} text={name} key={randomId} />
            ))}
        </nav>
    </Router>
);

export default Nav;
