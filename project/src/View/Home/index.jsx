import React from 'react';
import { Route } from 'react-router-dom';
import Fittext from 'react-fittext';

import { Logo, Nav } from 'Component';

import { Connector, resources } from './State';

import './style.scss';

const Home = ({ routes }) => (
    <Fittext>
        <React.Fragment>
            <Logo />
            <Nav {...{ routes }} />
        </React.Fragment>
    </Fittext>
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
