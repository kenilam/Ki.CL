import React from 'react';
import { HashRouter as Router, NavLink } from 'react-router-dom';

import { Connector } from './State';

const Logo = ({ path, siteName }) => (
    <Router>
        <h1>
            <NavLink to={path}>{siteName}</NavLink>
        </h1>
    </Router>
);

const Component = Connector(Logo);

export default Component;
