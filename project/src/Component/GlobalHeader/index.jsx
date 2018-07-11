// @flow
import React from 'react';

import { Logo, Nav } from 'Component';

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
        <Nav {...{ routes }} />
    </header>
);

const Component = Connector(GlobalHeader);

export default Component;
