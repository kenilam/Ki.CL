// @flow
import React from 'react';

import { Link, Logo } from 'Component';

import { Connector } from './State';

type routes = {
    name: string,
    path: string
};

type Props = {
    routes: Array<routes>
};

const GlobalHeader = ({ routes }: Props) => (
    <header rule="banner">
        <Logo />
        <nav>
            {routes.map(({ name, path }) => (
                <Link to={path} key={name}>
                    {name}
                </Link>
            ))}
        </nav>
    </header>
);

const Component = Connector(GlobalHeader);

export default Component;
