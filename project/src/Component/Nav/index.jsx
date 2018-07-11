import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { Link } from 'Component';

const Nav = ({ routes }) => (
    <Router>
        <nav className="navigation">
            {routes.map(({ name, path }) => (
                <Link to={path} text={name} key={name} />
            ))}
        </nav>
    </Router>
);

export default Nav;
