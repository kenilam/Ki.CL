import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

const Works = () => 'Works';

const Instance = Connector(Works);

const Component = props => (
    <Route
        path={resources.path}
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Component;
