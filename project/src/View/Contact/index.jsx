import React from 'react';
import { Route } from 'react-router-dom';

import { Connector, resources } from './State';

import './style.scss';

const Contact = () => 'Contact';

const Instance = Connector(Contact);

const Component = props => (
    <Route
        path={resources.path}
        component={match => <Instance {...{ match, ...props }} />}
    />
);

export default Component;
