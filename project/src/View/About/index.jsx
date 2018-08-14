import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

const Component = () => 'about';

const Instance = Connector(Component);

const About = props => (
    <Route
        path={resources.path}
        exact
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default About;
