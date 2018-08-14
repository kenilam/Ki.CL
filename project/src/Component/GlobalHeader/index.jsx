// @flow
import React from 'react';

import ReactResizeDetector from 'react-resize-detector';

import { GraphicLayer, Logo, Nav } from 'Component';

import { Connector } from './State';

import './style.scss';

type routes = {
    name: string,
    path: string
};

type Props = {
    height: Number,
    routes: Array<routes>,
    width: Number
};

const Content = ({ height, routes, width }: Props) => (
    <React.Fragment>
        <Logo />
        <Nav {...{ routes }} />
        <GraphicLayer height={height} width={width} />
    </React.Fragment>
);

const GlobalHeader = props => (
    <header rule="banner">
        <ReactResizeDetector handleWidth handleHeight skipOnMount>
            <Content {...props} />
        </ReactResizeDetector>
    </header>
);

const Component = Connector(GlobalHeader);

export default Component;
