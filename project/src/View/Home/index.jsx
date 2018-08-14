import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

const Component = ({ message }) => message;

const Instance = Connector(Component);

const Home = props => (
    <Route
        path={resources.path}
        exact
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Home;
