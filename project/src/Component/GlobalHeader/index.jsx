import React from 'react';

import { Logo, Nav } from 'Component';

import { Connector } from './State';

const GlobalHeader = ({ routes }) => (
    <header rule="banner">
        <Logo />
        <Nav {...{ routes }} />
    </header>
);

const Component = Connector(GlobalHeader);

export default Component;
