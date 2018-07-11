import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

const Projects = () => 'projects';

const Instance = Connector(Projects);

const Component = props => (
    <Route
        path={resources.path}
        exact
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Component;
