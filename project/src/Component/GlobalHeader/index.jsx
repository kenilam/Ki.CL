import React from 'react';

import { Link, Logo } from 'Component';

import { Connector } from './State';

const GlobalHeader = ({ routes }) => (
    <header rule="banner">
        <Logo />
        <nav>
            {routes.map(({ name, path }) => (
                <Link to={path} text={name} key={name} />
            ))}
        </nav>
    </header>
);

const Component = Connector(GlobalHeader);

export default Component;
