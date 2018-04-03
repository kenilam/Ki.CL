import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

const Home = ({ message }) => message;

const Instance = Connector(Home);

const Component = props => (
    <Route
        path={resources.path}
        exact
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Component;
