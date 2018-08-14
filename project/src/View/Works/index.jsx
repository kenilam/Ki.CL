import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

const Component = () => 'Works';

const Instance = Connector(Component);

const Works = props => (
    <Route
        path={resources.path}
        exact
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Works;
