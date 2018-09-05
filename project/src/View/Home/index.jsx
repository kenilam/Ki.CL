import React from 'react';
import { Route } from 'react-router-dom';

import { Logo, Nav } from 'Component';
import Background, { Circle } from 'Component/Background';

import { Connector, resources } from './State';

import './style.scss';

const Home = ({ routes }) => (
    <React.Fragment>
        <Logo />
        <Nav {...{ routes }} />
        <Background>
            <Circle />
        </Background>
    </React.Fragment>
);

const Instance = Connector(Home);

const Component = props => (
    <Route
        path={resources.path}
        exact
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Component;
